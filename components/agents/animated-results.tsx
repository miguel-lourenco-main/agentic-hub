"use client";

import { AnimatePresence, motion } from "framer-motion";
import { SearchResults } from "@/components/agents/search-results";

export function AnimatedResults({ query }: { query?: string }) {
  const q = (query || "").trim();
  const hasQuery = q.length > 0;

  return (
    <AnimatePresence mode="wait" initial={false}>
      {hasQuery && (
        <motion.div
          key="search-results"
          layout
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <SearchResults query={q} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}


