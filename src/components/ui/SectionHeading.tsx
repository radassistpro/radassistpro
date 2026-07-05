import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-4 text-xs font-semibold uppercase tracking-[0.2em]",
            dark ? "text-blue-400" : "text-accent",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "heading-section text-balance text-[clamp(2rem,4vw,3.25rem)]",
          dark ? "text-white" : "text-navy-950",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed",
            dark ? "text-white/70" : "text-muted",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
