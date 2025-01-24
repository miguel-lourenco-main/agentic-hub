import { notFound } from "next/navigation";
import { Bot, Wallet, Sparkles } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReviewsSection } from "@/components/reviews/reviews-section";
import { StarRating } from "@/components/ui/star-rating";
import { Button } from "@/components/ui/button";
import { AgentMetrics } from "@/components/agent-metrics";
import { HireDialog } from "@/components/hire-dialog";
import { InvestDialog } from "@/components/invest-dialog";

interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  billing: {
    model: string; // e.g., "per unit", "per request", "per minute"
    rate: number; // e.g., 0.01
    currency: string; // e.g., "SOL"
    unit?: string; // Optional human-readable unit description
  };
  investment: {
    marketCap: number;
    availableShares: number;
    pricePerShare: number;
  };
  embedUrl: string;
  apiDocs: {
    openapi: string;
    info: {
      title: string;
      version: string;
    };
  };
  reviews: Array<{
    id: string;
    userId: string;
    userName: string;
    userImage?: string;
    rating: number;
    comment: string;
    createdAt: Date;
    updatedAt?: Date;
  }>;
  averageRating: number;
}

type Agents = Record<string, Agent>;

// Mock data - in real app, this would come from your backend
const agents: Agents = {
  "1": {
    id: "1",
    name: "CodeAssist Pro",
    description:
      "Expert coding assistant with real-time pair programming capabilities",
    category: "Development",
    billing: {
      model: "per unit",
      rate: 0.00001,
      currency: "SOL",
      unit: "output tokens", // Optional clarification of what a unit means for this agent
    },
    investment: {
      marketCap: 100000,
      availableShares: 10000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/agent-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "CodeAssist Pro API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "1",
        userId: "user1",
        userName: "Alice",
        rating: 5,
        comment:
          "Incredible coding assistant! Helped me solve complex problems quickly.",
        createdAt: new Date("2024-01-01"),
      },
      {
        id: "2",
        userId: "user2",
        userName: "Bob",
        rating: 4,
        comment:
          "Very helpful for pair programming. Could use more language support.",
        createdAt: new Date("2024-01-02"),
      },
    ],
    averageRating: 4.5,
  },
  "2": {
    id: "2",
    name: "DataAnalyst AI",
    description: "Advanced data analysis and visualization specialist",
    category: "Analytics",
    billing: {
      model: "per query",
      rate: 0.0002,
      currency: "SOL",
      unit: "query",
    },
    investment: {
      marketCap: 250000,
      availableShares: 25000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/data-analyst-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "DataAnalyst AI API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "3",
        userId: "user3",
        userName: "Charlie",
        rating: 5,
        comment: "Transformed our raw data into actionable insights. Amazing!",
        createdAt: new Date("2024-01-03"),
      },
    ],
    averageRating: 5.0,
  },
  "3": {
    id: "3",
    name: "ContentGenius",
    description: "Creative content generation and optimization",
    category: "Content",
    billing: {
      model: "per unit",
      rate: 0.00005,
      currency: "SOL",
      unit: "1k words",
    },
    investment: {
      marketCap: 150000,
      availableShares: 15000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/content-genius-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "ContentGenius API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "4",
        userId: "user4",
        userName: "Diana",
        rating: 4,
        comment:
          "Great for blog posts and social media content. Very creative!",
        createdAt: new Date("2024-01-04"),
      },
    ],
    averageRating: 4.0,
  },
};

// Generate static params for all agent IDs
export function generateStaticParams() {
  return Object.keys(agents).map((id) => ({
    id,
  }));
}

// Sample data - replace with real data from your API
const metricsData = {
  revenue: {
    total: 12500,
    change: 12.5,
  },
  requests: {
    total: 45678,
    change: 8.2,
  },
  activeUsers: {
    total: 892,
    change: 15.3,
  },
  avgResponseTime: {
    total: 245,
    change: -5.8,
  },
};

export default function AgentPage({ params }: { params: { id: string } }) {
  const agent = agents[params.id];

  if (!agent) {
    notFound();
  }

  return (
    <main className="container mx-auto p-6">
      {/* Agent Header */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <Bot className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{agent.name}</CardTitle>
                  <CardDescription>{agent.description}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <StarRating rating={agent.averageRating} readOnly />
                    <span className="text-sm font-medium">
                      {agent.averageRating.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {agent.reviews.length} review
                    {agent.reviews.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Category: {agent.category}</span>
              <span>
                Rate: {agent.billing.rate} {agent.billing.currency}{" "}
                {agent.billing.model}
              </span>
            </div>
            <div className="flex gap-2">
              <HireDialog agentName={agent.name} billing={agent.billing}>
                <Button size="lg">
                  <Wallet className="mr-2 h-4 w-4" />
                  Hire
                </Button>
              </HireDialog>
              <InvestDialog
                agentName={agent.name}
                marketCap={agent.investment.marketCap}
                availableShares={agent.investment.availableShares}
                pricePerShare={agent.investment.pricePerShare}
              >
                <Button size="lg" variant="secondary">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Invest
                </Button>
              </InvestDialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
        <AgentMetrics data={metricsData} />
      </section>

      {/* Main Content Tabs */}
      <Tabs defaultValue="interface" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="interface">Agent Interface</TabsTrigger>
          <TabsTrigger value="docs">API Documentation</TabsTrigger>
          <TabsTrigger value="playground">API Playground</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        {/* Agent Interface Tab */}
        <TabsContent value="interface" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Agent Interface</CardTitle>
              <CardDescription>
                Interact with the agent through its custom interface
              </CardDescription>
            </CardHeader>
            <CardContent className="min-h-[500px]">
              {/* Third-party UI will be embedded here */}
              <div className="rounded-lg border h-full w-full flex items-center justify-center text-muted-foreground">
                <iframe
                  src={agent.embedUrl}
                  className="w-full h-full min-h-[500px]"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                  title={`${agent.name} Interface`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Documentation Tab */}
        <TabsContent value="docs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
              <CardDescription>
                Explore the agent&apos;s API endpoints and integration options
              </CardDescription>
            </CardHeader>
            <CardContent className="min-h-[500px]">
              {/* OpenAPI documentation will be rendered here */}
              <pre className="p-4 rounded-lg bg-muted overflow-auto">
                {JSON.stringify(agent.apiDocs, null, 2)}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Playground Tab */}
        <TabsContent value="playground" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Playground</CardTitle>
              <CardDescription>
                Test the agent&apos;s API endpoints directly in your browser
              </CardDescription>
            </CardHeader>
            <CardContent className="min-h-[500px]">
              <div className="grid grid-cols-2 gap-4 h-full">
                {/* Request Panel */}
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Request</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <textarea
                        className="w-full h-[200px] p-2 text-sm font-mono bg-muted rounded-md"
                        placeholder="Enter your API request here..."
                      />
                    </CardContent>
                  </Card>
                </div>

                {/* Response Panel */}
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Response</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="w-full h-[200px] p-2 text-sm font-mono bg-muted rounded-md overflow-auto">
                        Response will appear here...
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reviews & Ratings</CardTitle>
              <CardDescription>
                See what others are saying about this agent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReviewsSection
                reviews={agent.reviews}
                averageRating={agent.averageRating}
                totalReviews={agent.reviews.length}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
