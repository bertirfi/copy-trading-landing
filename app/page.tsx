import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { StatsBar } from "@/components/stats-bar";
import { HowItWorks } from "@/components/how-it-works";
import { Performance } from "@/components/performance";
import { TradesTable } from "@/components/trades-table";
import { CompoundCalculator } from "@/components/calculator";
import { TestimonialsSection } from "@/components/testimonials";
import { FinalCTA } from "@/components/final-cta";
import { SiteFooter, WhatsAppButton } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <StatsBar />
      <HowItWorks />
      <Performance />
      <TradesTable />
      <CompoundCalculator />
      <TestimonialsSection />
      <FinalCTA />
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
}
