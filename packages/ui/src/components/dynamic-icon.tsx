"use client";

import * as Icons from "lucide-react";
import { LucideProps } from "lucide-react";

interface DynamicIconProps extends LucideProps {
  name: string;
}

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const iconName = name.split("-").map(part => 
    part.charAt(0).toUpperCase() + part.slice(1)
  ).join("");
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (Icons as any)[iconName];

  if (!Icon) {
    return null;
  }

  return <Icon {...props} />;
} 