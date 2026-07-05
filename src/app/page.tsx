import { Hero } from "@/components/home/Hero";
import { StatsBar } from "@/components/home/StatsBar";
import { ProofMarquee } from "@/components/home/ProofMarquee";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { ModalityStrip } from "@/components/home/ModalityStrip";
import { AudienceSection } from "@/components/home/AudienceSection";
import { ProcessPreview } from "@/components/home/ProcessPreview";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { HomeContactCTA } from "@/components/home/HomeContactCTA";
import { CTABand } from "@/components/ui/CTABand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofMarquee />
      <StatsBar />
      <ServicesPreview />
      <ModalityStrip />
      <ProcessPreview />
      <AudienceSection />
      <TestimonialsSection />
      <CTABand />
      <HomeContactCTA />
    </>
  );
}
