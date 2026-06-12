import { Agent, MetricsData, PricePoint } from "../lib/interfaces";
import { seededRandom } from "../lib/seeded";

// 30-day share price history as a seeded random walk that ends exactly at
// the agent's current pricePerShare, so the chart agrees with the data.
export function getPriceHistory(agent: Agent, days = 30): PricePoint[] {
  const rand = seededRandom(`price-${agent.id}`);
  const end = agent.investment.pricePerShare;
  const deltas: number[] = [];
  for (let i = 0; i < days - 1; i++) {
    deltas.push((rand() - 0.46) * 0.06); // slight upward drift
  }
  const points: PricePoint[] = [];
  let value = end;
  for (let i = days - 1; i >= 0; i--) {
    points[i] = { t: `D-${days - 1 - i}`, v: Math.max(value, end * 0.4) };
    if (i > 0) value = value / (1 + (deltas[i - 1] ?? 0));
  }
  points[days - 1] = { t: "D-0", v: end };
  return points;
}

export type MetricKey = "revenue" | "requests" | "activeUsers" | "avgResponseTime";

export function getMetricSeries(agent: Agent, metric: MetricKey): number[] {
  const rand = seededRandom(`series-${agent.id}-${metric}`);
  const metrics = getAgentMetrics(agent);
  const { total, change } = metrics[metric];
  const points = 12;
  // Walk backwards from the current total following the trend direction.
  const series: number[] = new Array(points);
  let value = total;
  series[points - 1] = value;
  const stepTrend = change / 100 / points;
  for (let i = points - 2; i >= 0; i--) {
    const noise = (rand() - 0.5) * 0.12;
    value = value / (1 + stepTrend + noise);
    series[i] = Math.max(value, total * 0.2);
  }
  return series;
}

// Per-agent plausible metrics derived from the agent's existing mock data.
export function getAgentMetrics(agent: Agent): MetricsData {
  const rand = seededRandom(`metrics-${agent.id}`);
  const scale = agent.investment.marketCap / 1_000_000; // 0.5–1.0 typical
  const revenue = Math.round((8000 + rand() * 24000) * scale * 100) / 100;
  const requests = Math.round((600 + rand() * 2400) * scale);
  const users = Math.round((150 + rand() * 1200) * scale);
  const responseTime = Math.round((90 + rand() * 600) * 10) / 10;
  const pct = (spread: number, bias = 0) =>
    Math.round((rand() * spread * 2 - spread + bias) * 10) / 10;
  return {
    revenue: { total: revenue, change: pct(15, 8) },
    requests: { total: requests, change: pct(12, 6) },
    activeUsers: { total: users, change: pct(10, 4) },
    avgResponseTime: { total: responseTime, change: pct(8, -2) },
  };
}
