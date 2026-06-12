"use client";

import { BarChart3, Brain, DollarSign, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SparklineChart } from "@/components/ui/sparkline-chart";
import { Agent, MetricsData } from "@/lib/interfaces";
import { getMetricSeries, MetricKey } from "@/data/mock-series";
import { cn } from "@/lib/utils";

interface MetricConfig {
  key: MetricKey;
  title: string;
  icon: typeof DollarSign;
  color: "gold" | "violet" | "success";
  format: (n: number) => string;
  // response time improves when it goes down
  invertTrend?: boolean;
}

const metricConfigs: MetricConfig[] = [
  {
    key: "revenue",
    title: "Revenue Last Month",
    icon: DollarSign,
    color: "gold",
    format: n => `${n.toLocaleString()} SOL`,
  },
  {
    key: "requests",
    title: "Requests Last Month",
    icon: BarChart3,
    color: "violet",
    format: n => n.toLocaleString(),
  },
  {
    key: "activeUsers",
    title: "Active Users",
    icon: Users,
    color: "success",
    format: n => n.toLocaleString(),
  },
  {
    key: "avgResponseTime",
    title: "Avg Response Time",
    icon: Brain,
    color: "gold",
    format: n => `${n}ms`,
    invertTrend: true,
  },
];

export function AgentMetrics({ data, agent }: { data: MetricsData; agent?: Agent }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metricConfigs.map(config => {
        const metric = data[config.key];
        const isPositive = config.invertTrend
          ? metric.change <= 0
          : metric.change >= 0;
        return (
          <Card key={config.key} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{config.title}</CardTitle>
              <config.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="pb-0">
              <div className="font-mono text-2xl font-bold tabular-nums">
                {config.format(metric.total)}
              </div>
              <span
                className={cn(
                  "mt-1 inline-flex items-center rounded-full px-2 py-0.5 font-mono text-xs",
                  isPositive
                    ? "bg-success/10 text-success"
                    : "bg-destructive/10 text-destructive"
                )}
              >
                {metric.change >= 0 ? "+" : ""}
                {metric.change}%
              </span>
              {agent && (
                <SparklineChart
                  data={getMetricSeries(agent, config.key)}
                  color={config.color}
                  height={36}
                  className="mt-2 -mx-6 w-[calc(100%+3rem)]"
                />
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
