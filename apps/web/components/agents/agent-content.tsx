"use client";

import { motion } from "framer-motion";
import { Bot, Wallet, Sparkles, ArrowLeft } from "lucide-react";

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
import { AgentMetrics } from "@/components/agents/agent-metrics";
import { HireDialog } from "@/components/agents/hire-dialog";
import { InvestDialog } from "@/components/agents/invest-dialog";
import type { Agent } from "@/lib/interfaces";
import { useRouter } from "next/navigation";

interface AgentContentProps {
  agent: Agent;
  metricsData: {
    revenue: { total: number; change: number };
    requests: { total: number; change: number };
    activeUsers: { total: number; change: number };
    avgResponseTime: { total: number; change: number };
  };
}

export function AgentContent({ agent, metricsData }: AgentContentProps) {
  const router = useRouter();
  return (
    <main className="container max-w-6xl mx-auto p-6 mb-48">
      <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => router.back()}>
        <ArrowLeft className="h-8 w-8" />
        <span className="text-sm font-medium">Back</span>
      </div>
      {/* Agent Header */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
      >
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
      </motion.div>

      {/* Metrics Section */}
      <motion.section 
        className="mb-8"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: 0.1,
        }}
      >
        <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
        <AgentMetrics data={metricsData} />
      </motion.section>

      {/* Main Content Tabs */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: 0.2,
        }}
      >
        <Tabs defaultValue="interface" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="interface">Agent Interface</TabsTrigger>
            <TabsTrigger value="docs">API Documentation</TabsTrigger>
            <TabsTrigger value="playground">API Playground</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* Agent Interface Tab */}
          <TabsContent value="interface" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
            >
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
            </motion.div>
          </TabsContent>

          {/* API Documentation Tab */}
          <TabsContent value="docs" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
            >
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
            </motion.div>
          </TabsContent>

          {/* API Playground Tab */}
          <TabsContent value="playground" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
            >
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
            </motion.div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
            >
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
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </main>
  );
} 