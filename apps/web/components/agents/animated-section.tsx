"use client";

import { motion } from "framer-motion";

export function AnimatedSection({
  as: Tag = "div",
  children,
  className,
}: {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
}) {
  const M = motion[Tag as keyof typeof motion] as any;
  return (
    <M layout className={className} transition={{ duration: 0.25 }}>
      {children}
    </M>
  );
}


