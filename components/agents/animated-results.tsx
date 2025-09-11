"use client";

import { AnimatePresence, motion } from "framer-motion";
import { SearchResults } from "@/components/agents/search-results";
import { useSearchParams } from "next/navigation";
import { useSearchUI } from "@/components/search/search-context";

export function AnimatedResults({ query }: { query?: string }) {
  const searchParams = useSearchParams();
  const { query: ctxQuery } = useSearchUI();
  const urlQuery = (searchParams?.get("query") || "").trim();
  let q = (query || ctxQuery || urlQuery || "").trim();

  // Optional cookie fallback if URL/context are empty (e.g., static export refresh)
  if (!q && typeof document !== "undefined") {
    const m = document.cookie.match(/(?:^|; )search_query=([^;]*)/);
    if (m && m[1]) {
      try {
        q = decodeURIComponent(m[1]);
      } catch {
        q = m[1];
      }
      q = (q || "").trim();
    }
  }

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


