import Link from "next/link";
import { agents } from "@/data/agents";
import { categories } from "@/data/categories";
import { AgentCard } from "@/components/agents/agent-card";
import { CategoryTag } from "@/components/agents/category-tag";
import { ScrollableList } from "@workspace/ui/components/scrollable-list";

export default function AgentsPage() {
  // Get featured agents for each category
  const getFeaturedAgentsForCategory = (categoryName: string) => {
    return agents
      .filter(agent => agent.category === categoryName)
  };

  return (
    <main className="container mx-auto py-6 px-4 pb-24">
      {/* Categories */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Categories
        </h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <CategoryTag key={category.name} category={category} index={index} />
          ))}
        </div>
      </div>

      {/* Featured Agents by Category */}
      {categories.slice(1).map((category, categoryIndex) => {
        const featuredAgents = getFeaturedAgentsForCategory(category.name);
        if (featuredAgents.length === 0) return null;

        return (
          <section key={category.name} className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  {category.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
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
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  index={index}
                  categoryIndex={categoryIndex}
                  variant="row"
                />
              ))}
            </ScrollableList>
          </section>
        );
      })}

      {/* All Agents Grid */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-6">
          All Agents
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent, index) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              index={index}
              variant="grid"
            />
          ))}
        </div>
      </section>
    </main>
  );
} 