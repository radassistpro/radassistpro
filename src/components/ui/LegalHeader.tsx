type LegalHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function LegalHeader({ eyebrow, title, description }: LegalHeaderProps) {
  return (
    <section className="border-b border-border bg-navy-950 pt-32 pb-14 grain lg:pt-40 lg:pb-16">
      <div className="container-wide px-5 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
          {eyebrow}
        </p>
        <h1 className="heading-display mt-4 text-4xl text-white md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-white/65">{description}</p>
      </div>
    </section>
  );
}
