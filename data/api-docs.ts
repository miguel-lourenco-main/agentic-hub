import { Agent, ApiEndpoint } from "../lib/interfaces";

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getApiDocs(agent: Agent): ApiEndpoint[] {
  const slug = slugify(agent.name);
  return [
    {
      method: "POST",
      path: `/v1/agents/${slug}/invoke`,
      description: `Run a task against ${agent.name}. Billed ${agent.billing.model} at ${agent.billing.rate} ${agent.billing.currency}.`,
      sampleRequest: JSON.stringify(
        {
          input: `Describe the task for ${agent.name} here`,
          context: { priority: "normal" },
          wallet: "7xKp…3Fa9",
        },
        null,
        2
      ),
      sampleResponse: JSON.stringify(
        {
          taskId: "tsk_8f3a2c91",
          status: "completed",
          output: "…structured task result…",
          billed: { amount: agent.billing.rate, currency: agent.billing.currency },
          signature: "5UfDu…vRq2w",
        },
        null,
        2
      ),
    },
    {
      method: "GET",
      path: `/v1/agents/${slug}/status`,
      description: "Current availability, queue depth and average latency.",
      sampleResponse: JSON.stringify(
        {
          status: "online",
          queueDepth: 3,
          avgLatencyMs: 420,
          uptime30d: 0.9989,
        },
        null,
        2
      ),
    },
    {
      method: "GET",
      path: `/v1/agents/${slug}/token`,
      description: "On-chain token data: market cap, share price and supply.",
      sampleResponse: JSON.stringify(
        {
          marketCap: agent.investment.marketCap,
          pricePerShare: agent.investment.pricePerShare,
          availableShares: agent.investment.availableShares,
          mint: "AgH7…k2Vx",
        },
        null,
        2
      ),
    },
    {
      method: "POST",
      path: `/v1/agents/${slug}/stream`,
      description: "Open a streaming session for interactive, per-minute work.",
      sampleRequest: JSON.stringify(
        { mode: "interactive", maxBudget: 0.5, currency: "SOL" },
        null,
        2
      ),
      sampleResponse: JSON.stringify(
        { sessionId: "ses_b71e0d44", wsUrl: `wss://api.agentichub.io/v1/sessions/ses_b71e0d44` },
        null,
        2
      ),
    },
  ];
}
