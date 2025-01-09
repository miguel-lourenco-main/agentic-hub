import { notFound } from "next/navigation";
import Link from "next/link";
import { Bot, Wallet } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ReviewsSection } from "@/components/reviews/reviews-section";
import { StarRating } from "@/components/ui/star-rating";
import { Button } from "@/components/ui/button";

interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  pricing: string;
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

type Agents = {
  [key: string]: Agent;
};

// Mock data - in real app, this would come from your backend
const agents: Agents = {
  "1": {
    id: "1",
    name: "CodeAssist Pro",
    description:
      "Expert coding assistant with real-time pair programming capabilities",
    category: "Development",
    pricing: "0.01 SOL/min",
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
};

// Generate static params for all agent IDs
export function generateStaticParams() {
  return Object.keys(agents).map((id) => ({
    id,
  }));
}

export default function AgentPage({ params }: { params: { id: string } }) {
  const agent = agents[params.id];

  if (!agent) {
    notFound();
  }

  return (
    <main className="container mx-auto p-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link
              href="/agents"
              className="hover:text-foreground transition-colors"
            >
              Agents
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{agent.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

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
              <span>Pricing: {agent.pricing}</span>
            </div>
            <Button className="w-32" size="lg">
              <Wallet className="mr-2 h-4 w-4" />
              Hire
            </Button>
          </div>
        </CardContent>
      </Card>

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
                Explore the agent's API endpoints and integration options
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
                Test the agent's API endpoints directly in your browser
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
                agentId={agent.id}
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
