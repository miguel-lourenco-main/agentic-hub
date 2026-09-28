import { Hero } from "@/components/home/hero";
import { MarketTape } from "@/components/home/market-tape";
import { TwoSided } from "@/components/home/two-sided";
import { CategoryIndex } from "@/components/home/category-index";
import { PopularAgents } from "@/components/home/popular-agents";
import { HowItWorks } from "@/components/home/how-it-works";
import { ListAgentCta } from "@/components/home/list-agent-cta";

/** Landing page: hero + tape sit above the paced marketing sections. */
export default function HomePage() {
  return (
    <main className="relative">
      <Hero />
      <MarketTape />
      {/* Vertical rhythm for below-the-fold sections */}
      <div className="space-y-28 py-28 sm:space-y-36 sm:py-36">
        <TwoSided />
        <CategoryIndex />
        <PopularAgents />
        <HowItWorks />
        <ListAgentCta />
      </div>
    </main>
  );
}
