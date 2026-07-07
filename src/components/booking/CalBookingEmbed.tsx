"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import Image from "next/image";
import { useEffect } from "react";
import { calcomConfig } from "@/lib/calcom";
import { siteConfig } from "@/lib/constants";

type CalBookingEmbedProps = {
  className?: string;
  showHeader?: boolean;
};

export function CalBookingEmbed({
  className,
  showHeader = true,
}: CalBookingEmbedProps) {
  useEffect(() => {
    void (async () => {
      const cal = await getCalApi({ namespace: calcomConfig.namespace });
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: {
            "cal-brand": calcomConfig.brandColor,
            "cal-text-emphasis": calcomConfig.textEmphasis,
            "cal-bg": "#fcfcfd",
            "cal-bg-emphasis": "#f4f6fb",
            "cal-border": "#e5e9f0",
          },
          dark: {
            "cal-brand": calcomConfig.brandColor,
            "cal-text-emphasis": "#f8fafc",
          },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-border bg-surface shadow-xl shadow-navy-950/[0.06] ${className ?? ""}`}
    >
      {showHeader && (
        <div className="flex flex-col gap-4 border-b border-border bg-gradient-to-r from-cream-50 to-surface px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-4">
            <Image
              src="/logo.png"
              alt={siteConfig.name}
              width={148}
              height={68}
              className="h-11 w-auto object-contain"
            />
            <div className="hidden h-10 w-px bg-border sm:block" aria-hidden />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                Schedule Online
              </p>
              <p className="mt-0.5 text-sm font-medium text-navy-950">
                {calcomConfig.durationMinutes}-minute discovery call
              </p>
            </div>
          </div>
          <p className="max-w-xs text-xs leading-relaxed text-muted sm:text-right">
            Pick a time below. Confirmation goes to your email and our team at{" "}
            {siteConfig.email}.
          </p>
        </div>
      )}

      <div className="cal-embed-frame bg-cream-50/50 p-1 sm:p-2">
        <Cal
          namespace={calcomConfig.namespace}
          calLink={calcomConfig.calLink}
          calOrigin={calcomConfig.calOrigin}
          style={{
            width: "100%",
            height: "100%",
            minHeight: "min(720px, 78vh)",
            overflow: "auto",
          }}
          config={{
            layout: "month_view",
            theme: "light",
            useSlotsViewOnSmallScreen: "true",
          }}
        />
      </div>
    </div>
  );
}
