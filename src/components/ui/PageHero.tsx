import Image from "next/image";
import { images } from "@/lib/images";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  image = images.hero,
  imageAlt = "Radiology operations at a U.S. imaging facility",
}: PageHeroProps) {
  return (
    <section className="relative min-h-[55vh] overflow-hidden bg-navy-950 pt-32 pb-20 grain lg:min-h-[60vh] lg:pt-40 lg:pb-28">
      <div className="hero-ken-burns absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>
      <div className="video-overlay absolute inset-0" />
      <div className="hero-grid-overlay pointer-events-none absolute inset-0 opacity-[0.06]" />

      <div className="container-wide relative px-5 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
          {eyebrow}
        </p>
        <h1 className="heading-display mt-6 max-w-4xl text-balance text-[clamp(2.5rem,5vw,4rem)] text-white">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
          {description}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream-50 to-transparent" />
    </section>
  );
}
