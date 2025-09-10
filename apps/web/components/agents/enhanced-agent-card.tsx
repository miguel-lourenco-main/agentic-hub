"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CircleDollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import type { Agent } from "@/lib/interfaces";
import { cn } from "@/lib/utils";

interface EnhancedAgentCardProps {
  agent: Agent;
  index: number;
  categoryIndex?: number;
  variant?: "grid" | "row";
}

export function EnhancedAgentCard({ agent, index, categoryIndex = 0, variant = "grid" }: EnhancedAgentCardProps) {
  const isRow = variant === "row";
  
  return (
    <motion.div
      className={cn(isRow ? "min-w-[400px] max-w-[400px]" : "w-full", "")}
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
        className="flex flex-col justify-between h-[12rem] group relative rounded-lg border p-6 hover:border-foreground/50 transition-colors"
      >
        <div className="flex flex-col">
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
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <CircleDollarSign className="mr-1 size-5" />
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