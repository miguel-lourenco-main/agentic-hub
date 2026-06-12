// Static export compatible page

import { notFound } from "next/navigation";
import { AgentContent } from "@/components/agents/agent-content";
import { agents } from "@/data/agents";
import { getAgentMetrics } from "@/data/mock-series";

export async function generateStaticParams() {
  return agents.map((agent) => ({
    id: agent.id,
  }));
}

export default async function AgentPage({ params }: { params: { id: string } }) {
  const agent = agents.find(a => a.id === params.id);

  if (!agent) {
    notFound();
  }

  return <AgentContent agent={agent} metricsData={getAgentMetrics(agent)} />;
}
