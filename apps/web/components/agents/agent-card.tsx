"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import type { Agent } from "@/data/agents";

interface AgentCardProps {
  agent: Agent;
  index: number;
  categoryIndex?: number;
  variant?: "grid" | "row";
}

export function AgentCard({ agent, index, categoryIndex = 0, variant = "grid" }: AgentCardProps) {
  const isRow = variant === "row";
  
  return (
    <motion.div
      className={isRow ? "min-w-[300px] max-w-[300px]" : "w-full"}
      initial={{ opacity: 0, [isRow ? "x" : "y"]: isRow ? 100 : 20 }}
      animate={{ opacity: 1, [isRow ? "x" : "y"]: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: isRow ? categoryIndex * 0.2 + index * 0.1 : index * 0.1,
      }}
    >
      <Card
        hoverable
        className="h-full group relative rounded-lg border p-6 hover:border-foreground/50 transition-colors"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="rounded-full bg-primary/10 p-2">
            <DynamicIcon name={agent.iconName} className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold leading-none tracking-tight">
              {agent.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {agent.category}
            </p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          {agent.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <Bot className="mr-1 h-4 w-4" />
            {agent.pricing}
          </div>
          <div className="flex gap-2">
            <Link href={`/agents/${agent.id}`}>
              <Button variant="outline" size="sm">
                Details
              </Button>
            </Link>
            <Link href={`/agents/${agent.id}?action=hire`}>
              <Button size="sm">Hire</Button>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
} 