"use client";

import { motion } from "framer-motion";
import { Wallet, Sparkles, ArrowLeft, Star } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReviewsSection } from "@/components/reviews/reviews-section";
import { Button } from "@/components/ui/button";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { LiveDot } from "@/components/ui/live-dot";
import { AgentMetrics } from "@/components/agents/agent-metrics";
import { TokenPanel } from "@/components/agents/token-panel";
import { ActivityFeed } from "@/components/agents/activity-feed";
import { ApiDocsViewer } from "@/components/agents/api-docs-viewer";
import { ApiPlayground } from "@/components/agents/api-playground";
import { HireDialog } from "@/components/agents/hire-dialog";
import { InvestDialog } from "@/components/agents/invest-dialog";
import { AgentCore } from "@/components/webgl/agent-core";
import { getApiDocs } from "@/data/api-docs";
import { findNodeIndexById } from "@/lib/agent-graph";
import type { Agent, MetricsData } from "@/lib/interfaces";
import { useRouter } from "next/navigation";

interface AgentContentProps {
  agent: Agent;
  metricsData: MetricsData;
}

export function AgentContent({ agent, metricsData }: AgentContentProps) {
  const router = useRouter();
  const nodeIndex = findNodeIndexById(agent.id);
  return (
    <main className="relative mx-auto max-w-6xl px-4 pb-24 pt-24 sm:px-6">
      {/* Sleek back control: a compact pill that floats beside the header and
          reveals its label on hover, so it no longer reserves a full line of
          vertical space above the agent identity. */}
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="Back to floor"
        className="group/back absolute left-4 top-[5.5rem] z-20 inline-flex items-center gap-0 rounded-full border border-white/[0.08] bg-white/[0.03] py-1.5 pl-1.5 pr-1.5 font-mono text-xs text-muted-foreground backdrop-blur-sm transition-all hover:border-gold/30 hover:text-foreground sm:left-6"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover/back:-translate-x-0.5" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover/back:max-w-[8rem] group-hover/back:pl-1.5 group-hover/back:pr-1 group-hover/back:opacity-100">
          back to floor
        </span>
      </button>

      {/* Editorial header: identity + focused agent core */}
      <motion.div
        className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div>
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl border border-gold/20 bg-gold/10 p-2.5 text-gold">
              <DynamicIcon name={agent.iconName} className="h-6 w-6" />
            </div>
            <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              {agent.category}
            </span>
          </div>

          <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            {agent.name}
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">{agent.description}</p>

          {/* mono spec strip */}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-white/[0.07] py-4 font-mono text-sm">
            <span className="text-gold">
              {agent.billing.rate} {agent.billing.currency}
              <span className="text-muted-foreground/60"> · {agent.billing.model}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 fill-gold text-gold" />
              <span>{agent.averageRating.toFixed(1)}</span>
              <span className="text-muted-foreground/60">
                ({agent.reviews.length} review{agent.reviews.length !== 1 ? "s" : ""})
              </span>
            </span>
            <span className="text-violet">
              {(agent.investment.marketCap / 1_000_000).toFixed(1)}M
              <span className="text-muted-foreground/60"> mkt cap</span>
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <HireDialog agentName={agent.name} billing={agent.billing}>
              <Button size="lg" variant="gradient">
                <Wallet className="mr-2 h-4 w-4" />
                Hire agent
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

        {/* focused agent core */}
        <div className="relative mx-auto aspect-square w-full max-w-[26rem] overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-transparent">
          <div className="pointer-events-none absolute left-5 top-5 z-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70">
              Network position
            </p>
            <p className="mt-1 flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground/50">
              <LiveDot /> node {nodeIndex >= 0 ? nodeIndex + 1 : "—"} / 45
            </p>
          </div>
          <AgentCore
            className="absolute inset-0"
            focusIndex={nodeIndex >= 0 ? nodeIndex : undefined}
          />
        </div>
      </motion.div>

      <div className="mt-12" />

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
