"use client";

import * as Icons from "lucide-react";
import { LucideProps } from "lucide-react";

interface DynamicIconProps extends LucideProps {
  /** kebab-case lucide name from agent metadata, e.g. "bar-chart-3". */
  name: string;
}

/** Resolve a kebab-case icon name to a lucide-react component at runtime. */
export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  // "bar-chart-3" → "BarChart3"
  const iconName = name.split("-").map(part => 
    part.charAt(0).toUpperCase() + part.slice(1)
  ).join("");
  
  const Icon = (Icons as any)[iconName];

  if (!Icon) {
    return null;
  }

  return <Icon {...props} />;
}


