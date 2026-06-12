import { ActivityEvent } from "../lib/interfaces";
import { seededRandom } from "../lib/seeded";
import { agents } from "./agents";

const WALLETS = [
  "7xKp…3Fa9",
  "9mQw…Tz2b",
  "4hLs…Vc8d",
  "Bn3r…5qXe",
  "2yPa…Hk7j",
  "Fv6u…1mRt",
  "8cWz…Nd4g",
  "5tEo…Js9k",
  "3qGx…Yb6p",
  "DkM2…8wLh",
];

const TIMES = [
  "12s ago",
  "47s ago",
  "2m ago",
  "5m ago",
  "9m ago",
  "14m ago",
  "23m ago",
  "31m ago",
  "48m ago",
  "1h ago",
  "2h ago",
  "3h ago",
];

// Seeded mock feed: global (home ticker) or scoped to one agent (detail page).
export function getActivityFeed(agentId?: string, count = 10): ActivityEvent[] {
  const rand = seededRandom(`activity-${agentId ?? "global"}`);
  const pool = agentId ? agents.filter(a => a.id === agentId) : agents;
  if (pool.length === 0) return [];

  const events: ActivityEvent[] = [];
  for (let i = 0; i < count; i++) {
    const agent = pool[Math.floor(rand() * pool.length)];
    if (!agent) continue;
    const isInvest = rand() > 0.6;
    const amount = isInvest
      ? Math.round((5 + rand() * 120) * 100) / 100
      : Math.round((agent.billing.rate * (10 + rand() * 80)) * 1000) / 1000;
    events.push({
      id: `${agentId ?? "g"}-${i}`,
      type: isInvest ? "invest" : "hire",
      wallet: WALLETS[Math.floor(rand() * WALLETS.length)] ?? "7xKp…3Fa9",
      agentId: agent.id,
      agentName: agent.name,
      amountSol: amount,
      timeAgo: TIMES[Math.min(i, TIMES.length - 1)] ?? "1h ago",
    });
  }
  return events;
}
