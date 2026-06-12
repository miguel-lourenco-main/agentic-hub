"use client";

import * as Icons from "lucide-react";
import { LucideProps } from "lucide-react";

interface DynamicIconProps extends LucideProps {
  name: string;
}

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  // Agent data stores kebab-case names; Lucide exports PascalCase components.
  const iconName = name.split("-").map(part => 
    part.charAt(0).toUpperCase() + part.slice(1)
  ).join("");
  
  const Icon = (Icons as any)[iconName];

  if (!Icon) {
    return null;
  }

  return <Icon {...props} />;
}


