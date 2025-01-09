import Link from "next/link";
import { ArrowRight, Bot, Brain, Code, MessageSquare } from "lucide-react";
import { StarRating } from "@/components/ui/star-rating";

// Mock data for AI agents
const featuredAgents = [
  {
    id: "1",
    name: "CodeAssist Pro",
    description:
      "Expert coding assistant with real-time pair programming capabilities",
    category: "Development",
    icon: Code,
    pricing: "0.01 SOL/min",
    rating: 4.5,
    reviewCount: 128,
  },
  {
    id: "2",
    name: "DataAnalyst AI",
    description: "Advanced data analysis and visualization specialist",
    category: "Analytics",
    icon: Brain,
    pricing: "0.02 SOL/query",
    rating: 4.8,
    reviewCount: 89,
  },
  {
    id: "3",
    name: "ContentGenius",
    description: "Creative content generation and optimization",
    category: "Content",
    icon: MessageSquare,
    pricing: "0.005 SOL/1k words",
    rating: 4.2,
    reviewCount: 156,
  },
];

const categories = [
  { name: "All Agents", count: 150 },
  { name: "Development", count: 45 },
  { name: "Analytics", count: 32 },
  { name: "Content", count: 28 },
  { name: "Customer Support", count: 25 },
  { name: "Research", count: 20 },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="px-6 py-12 md:px-12 lg:px-24 space-y-6">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          AI Agent Marketplace
        </h1>
        <p className="text-lg text-muted-foreground max-w-[750px]">
          Discover and connect with AI agents for every task. From coding to
          content creation, our marketplace offers secure and verifiable AI
          services.
        </p>
      </section>

      {/* Main Content */}
      <div className="px-6 md:px-12 lg:px-24">
        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Categories
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/category/${category.name.toLowerCase().replace(" ", "-")}`}
                className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium hover:bg-muted/80"
              >
                {category.name}
                <span className="ml-2 text-muted-foreground">
                  ({category.count})
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Agents */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Featured Agents
              </h2>
              <p className="text-sm text-muted-foreground">
                Top-rated AI agents ready to assist you
              </p>
            </div>
            <Link
              href="/agents"
              className="inline-flex items-center text-sm font-medium hover:underline"
            >
              View all agents
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredAgents.map((agent) => (
              <Link
                key={agent.id}
                href={`/agent/${agent.id}`}
                className="group relative rounded-lg border p-6 hover:border-foreground/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <agent.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold leading-none tracking-tight">
                        {agent.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {agent.category}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <StarRating rating={agent.rating} readOnly size="sm" />
                      <span className="text-sm font-medium">
                        {agent.rating}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {agent.reviewCount} reviews
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {agent.description}
                </p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Bot className="mr-1 h-4 w-4" />
                  {agent.pricing}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-12 rounded-lg bg-muted p-6">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            How It Works
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <h3 className="font-medium">1. Browse Agents</h3>
              <p className="text-sm text-muted-foreground">
                Explore our curated collection of AI agents across various
                categories
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">2. Connect</h3>
              <p className="text-sm text-muted-foreground">
                Choose an agent and connect your wallet to start the interaction
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">3. Collaborate</h3>
              <p className="text-sm text-muted-foreground">
                Work with the agent through their specialized interface
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
