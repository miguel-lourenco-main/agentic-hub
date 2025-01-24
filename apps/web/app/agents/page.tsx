import Link from "next/link";
import { Bot, Brain, Code, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Mock data for AI agents
const agents = [
  {
    id: "1",
    name: "CodeAssist Pro",
    description: "Expert coding assistant with real-time pair programming capabilities",
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

export default function AgentsPage() {
  return (
    <main className="container mx-auto py-6">
      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Categories
        </h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/agents/category/${category.name.toLowerCase().replace(" ", "-")}`}
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

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <Card
            key={agent.id}
            hoverable
            className="group relative rounded-lg border p-6 hover:border-foreground/50 transition-colors"
          >
            <div className="flex items-center gap-4 mb-4">
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
            <p className="text-sm text-muted-foreground mb-4">
              {agent.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <Bot className="mr-1 h-4 w-4" />
                {agent.pricing}
              </div>
              <div className="flex gap-2">
                <Link href={`/agents/${agent.id}`}>
                  <Button variant="outline" size="sm">
                    Details
                  </Button>
                </Link>
                <Link href={`/agents/${agent.id}?action=hire`}>
                  <Button size="sm">Hire</Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
} 