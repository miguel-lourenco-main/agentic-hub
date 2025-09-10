"use client";

import Link from "next/link";
import { AnimatedSection } from "@/components/agents/animated-section";
import { ScrollableList } from "@/components/ui/scrollable-list";
import { AgentCard } from "@/components/agents/agent-card";
import { categories } from "@/data/categories";
import { agents } from "@/data/agents";

export function FeaturedByCategorySection() {
  const getFeaturedAgentsForCategory = (categoryName: string) => {
    return agents.filter(agent => agent.category === categoryName);
  };

  return (
    <>
      {categories.slice(1).map((category, categoryIndex) => {
        const featuredAgents = getFeaturedAgentsForCategory(category.name);
        if (featuredAgents.length === 0) return null;

        return (
          <AnimatedSection as="section" key={category.name} className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">{category.name}</h2>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
              <Link
                href={`/agents/category/${category.name.toLowerCase().replace(" ", "-")}`}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                View all →
              </Link>
            </div>
            <ScrollableList className="mx-4">
              {featuredAgents.map((agent, index) => (
                <AgentCard key={agent.id} agent={agent} index={index} categoryIndex={categoryIndex} variant="row" />
              ))}
            </ScrollableList>
          </AnimatedSection>
        );
      })}
    </>
  );
}


