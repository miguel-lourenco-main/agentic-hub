// Landing page — sections are ordered for narrative: hero → tape → model → browse → CTA.
import { Hero } from "@/components/home/hero";
import { MarketTape } from "@/components/home/market-tape";
import { TwoSided } from "@/components/home/two-sided";
import { CategoryIndex } from "@/components/home/category-index";
import { PopularAgents } from "@/components/home/popular-agents";
import { HowItWorks } from "@/components/home/how-it-works";
import { ListAgentCta } from "@/components/home/list-agent-cta";

export default function HomePage() {
  return (
    <main className="relative">
      <Hero />
      <MarketTape />
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
