"use server";

import { notFound } from "next/navigation";
import { AgentContent } from "@/components/agents/agent-content";
import { agents } from "@/data/agents";

// Mock metrics data
const metricsData = {
  revenue: { total: 125000, change: 12.5 },
  requests: { total: 45000, change: 8.2 },
  activeUsers: { total: 2800, change: 15.3 },
  avgResponseTime: { total: 0.8, change: -5.1 },
};

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

  return <AgentContent agent={agent} metricsData={metricsData} />;
}
