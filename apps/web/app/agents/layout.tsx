"use client";

import { motion } from "framer-motion";
import { Suspense, useEffect, useLayoutEffect } from "react";

function AgentsLayoutContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Force scroll to top immediately before any rendering
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Prevent browser's scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <motion.div
      className="flex-1"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
}

export default function AgentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AgentsLayoutContent>{children}</AgentsLayoutContent>
  );
} 