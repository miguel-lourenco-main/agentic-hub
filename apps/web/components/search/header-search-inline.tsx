"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { SearchInput } from "@/components/search-input";
import { useSearchUI } from "@/components/search/search-context";

export function HeaderSearchInline() {
  const router = useRouter();
  const { query, setQuery, isTransitioning } = useSearchUI();

  const handleSubmit = () => {
    const q = query.trim();
    if (!q) return;
    router.push(`/agents?query=${encodeURIComponent(q)}`);
  };

  return (
    <motion.div layoutId="global-search" animate={{ scale: isTransitioning ? 1 : 1 }}>
      <SearchInput value={query} onChange={setQuery} onSubmit={handleSubmit} className="w-full max-w-5xl" />
    </motion.div>
  );
}


