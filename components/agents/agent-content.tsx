"use client";

import { motion } from "framer-motion";
import { Wallet, Sparkles, ArrowLeft } from "lucide-react";

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
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { AgentMetrics } from "@/components/agents/agent-metrics";
import { TokenPanel } from "@/components/agents/token-panel";
import { ActivityFeed } from "@/components/agents/activity-feed";
import { ApiDocsViewer } from "@/components/agents/api-docs-viewer";
import { ApiPlayground } from "@/components/agents/api-playground";
import { HireDialog } from "@/components/agents/hire-dialog";
import { InvestDialog } from "@/components/agents/invest-dialog";
import { getApiDocs } from "@/data/api-docs";
import type { Agent, MetricsData } from "@/lib/interfaces";
import { useRouter } from "next/navigation";

interface AgentContentProps {
  agent: Agent;
  metricsData: MetricsData;
}

// Agent detail page: hire/invest actions, metrics, token panel, and tabbed interface.
export function AgentContent({ agent, metricsData }: AgentContentProps) {
  const router = useRouter();
  return (
    <main className="container max-w-6xl mx-auto p-6">
      <button
        className="mb-6 flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="text-sm font-medium">Back</span>
      </button>
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
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="w-fit rounded-lg bg-gold/10 p-3 text-gold">
                <DynamicIcon name={agent.iconName} className="h-8 w-8" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <CardTitle className="font-heading text-2xl">{agent.name}</CardTitle>
                    <CardDescription>{agent.description}</CardDescription>
                  </div>
                  <div className="sm:text-right">
                    <div className="flex items-center gap-2">
                      <StarRating rating={agent.averageRating} readOnly />
                      <span className="font-mono text-sm font-medium">
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
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <span className="rounded-full border hairline bg-white/[0.04] px-3 py-1">
                  {agent.category}
                </span>
                <span className="font-mono text-gold">
                  {agent.billing.rate} {agent.billing.currency} {agent.billing.model}
                </span>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <HireDialog agentName={agent.name} billing={agent.billing}>
                  <Button size="lg" variant="gradient">
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
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-violet/40 text-violet transition-shadow hover:bg-violet/10 hover:text-violet hover:shadow-glow-violet"
                  >
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
        <h2 className="font-heading text-xl font-semibold mb-4">Performance Metrics</h2>
        <AgentMetrics data={metricsData} agent={agent} />
      </motion.section>

      {/* Token + Activity Section */}
      <motion.section
        className="mb-8 grid gap-6 lg:grid-cols-[3fr,2fr]"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: 0.15,
        }}
      >
        <TokenPanel agent={agent} />
        <ActivityFeed agentId={agent.id} />
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
          <TabsList className="grid w-full grid-cols-2 h-auto sm:grid-cols-4">
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
                  <CardTitle className="font-heading">Agent Interface</CardTitle>
                  <CardDescription>
                    Interact with the agent through its custom interface
                  </CardDescription>
                </CardHeader>
                <CardContent className="min-h-[500px]">
                  {/* Third-party UI will be embedded here */}
                  <div className="rounded-lg border hairline h-full w-full flex items-center justify-center text-muted-foreground">
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
                  <CardTitle className="font-heading">API Documentation</CardTitle>
                  <CardDescription>
                    Explore the agent&apos;s API endpoints and integration options
                  </CardDescription>
                </CardHeader>
                <CardContent className="min-h-[500px]">
                  <ApiDocsViewer endpoints={getApiDocs(agent)} />
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
                  <CardTitle className="font-heading">API Playground</CardTitle>
                  <CardDescription>
                    Test the agent&apos;s API endpoints directly in your browser
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ApiPlayground agent={agent} />
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
                  <CardTitle className="font-heading">Reviews & Ratings</CardTitle>
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
