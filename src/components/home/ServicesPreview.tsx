import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { images } from "@/lib/images";
import { services } from "@/lib/constants";

const adminTasks = [
  "Relay and log critical results per your protocol",
  "Inbound and outbound call handling",
  "PACS updates",
  "Overreads and peer-review administration",
  "Prelim teleradiologist coverage",
];

const cardImages = [images.homePacsCard, images.homePrelimCard];

export function ServicesPreview() {
  return (
    <section className="section-padding-tight bg-cream-50">
      <div className="container-wide">
        <div className="grid items-end gap-8 lg:grid-cols-2">
          <FadeIn>
            <SectionHeading
              eyebrow="What We Do"
              title="Operational work that keeps radiologists off the worklist"
              description="Our team handles relays, calls, study notes, and addendums inside your PACS. Your physicians stay focused on interpretation."
            />
          </FadeIn>
          <FadeIn delay={0.1} className="lg:text-right">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover cursor-pointer"
            >
              Explore all services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          <FadeIn className="lg:col-span-7">
            <div className="group relative aspect-[16/11] overflow-hidden rounded-2xl">
              <Image
                src={images.homeOps}
                alt="Radiologist navigating PACS worklist on diagnostic monitors"
                fill
                className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-navy-950/75 via-navy-950/25 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <p className="max-w-md text-sm leading-relaxed text-white/80">
                  Relays logged to protocol. Calls answered and documented.
                  Addendums tracked through completion. All inside your existing
                  PACS environment.
                </p>
                <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/15 pt-5">
                  {[
                    { v: "35,000+", l: "Calls" },
                    { v: "5,000+", l: "Addendums" },
                    { v: "100%", l: "Compliance" },
                  ].map((s) => (
                    <div key={s.l}>
                      <p className="heading-display text-xl text-white lg:text-2xl">{s.v}</p>
                      <p className="text-[11px] text-white/55">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="lg:col-span-5">
            <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 lg:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                Core Capabilities
              </p>
              <ul className="mt-5 flex-1 space-y-4">
                {adminTasks.map((task, i) => (
                  <li key={task} className="flex items-start gap-3 border-b border-border/60 pb-4 last:border-0">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-navy-950 text-[10px] font-bold text-white">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm leading-snug text-navy-800">{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {services.map((service, index) => (
            <FadeIn key={service.id} delay={index * 0.08}>
              <Link
                href={service.id === "pacs-admins" ? "/services/virtual-pacs-admin" : "/services/prelim-teleradiology"}
                className="group card-lift relative flex min-h-[360px] flex-col overflow-hidden rounded-2xl cursor-pointer"
              >
                <Image
                  src={cardImages[index]}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/45 to-navy-950/10" />
                <div className="relative mt-auto p-7">
                  <h3 className="heading-section text-xl text-white lg:text-2xl">{service.title}</h3>
                  <p className="mt-2 text-sm text-white/70">{service.subtitle}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-400">
                    Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
