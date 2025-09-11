"use client";

import { BarChart3, Brain, DollarSign, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MetricsData } from "@/lib/interfaces";

export function AgentMetrics({ data }: { data: MetricsData }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Revenue Last Month
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${data.revenue.total.toLocaleString()}
          </div>
          <p
            className={`text-xs ${data.revenue.change >= 0 ? "text-green-500" : "text-red-500"}`}
          >
            {data.revenue.change >= 0 ? "+" : ""}
            {data.revenue.change}% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Requests Last Month
          </CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data.requests.total.toLocaleString()}
          </div>
          <p
            className={`text-xs ${data.requests.change >= 0 ? "text-green-500" : "text-red-500"}`}
          >
            {data.requests.change >= 0 ? "+" : ""}
            {data.requests.change}% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data.activeUsers.total.toLocaleString()}
          </div>
          <p
            className={`text-xs ${data.activeUsers.change >= 0 ? "text-green-500" : "text-red-500"}`}
          >
            {data.activeUsers.change >= 0 ? "+" : ""}
            {data.activeUsers.change}% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Avg Response Time
          </CardTitle>
          <Brain className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data.avgResponseTime.total}ms
          </div>
          <p
            className={`text-xs ${data.avgResponseTime.change <= 0 ? "text-green-500" : "text-red-500"}`}
          >
            {data.avgResponseTime.change >= 0 ? "+" : ""}
            {data.avgResponseTime.change}% from last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
