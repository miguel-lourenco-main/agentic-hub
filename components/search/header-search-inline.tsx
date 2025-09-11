"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { SearchInput } from "@/components/search-input";
import { useSearchUI } from "@/components/search/search-context";
import { stripBasePath, withBasePath } from "@/lib/base-path";

export function HeaderSearchInline() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { query, setQuery, isTransitioning } = useSearchUI();

  // Keep input value in sync with /agents?query=...
  useEffect(() => {
    // Only care on the agents route
    if (!pathname || !/^\/agents\/?$/.test(stripBasePath(pathname))) return;
    const currentQuery = searchParams?.get("query") || "";
    if (currentQuery && currentQuery !== query) {
      setQuery(currentQuery);
    }
  }, [pathname, searchParams, setQuery]);

  // Hydrate from cookie if no URL query present (static export refresh cases)
  useEffect(() => {
    if (!pathname || !/^\/agents\/?$/.test(stripBasePath(pathname))) return;
    const hasUrl = !!(searchParams?.get("query") || "").trim();
    if (hasUrl || query.trim()) return;
    if (typeof document === "undefined") return;
    const m = document.cookie.match(/(?:^|; )search_query=([^;]*)/);
    if (m && m[1]) {
      try {
        setQuery(decodeURIComponent(m[1]));
      } catch {
        setQuery(m[1]);
      }
    }
  }, [pathname, searchParams, query, setQuery]);

  const handleSubmit = () => {
    const q = query.trim();
    if (!q) return;
    // Persist to cookie for static export navigation/refresh
    try {
      document.cookie = `search_query=${encodeURIComponent(q)}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days
    } catch {}
    router.push(withBasePath(`/agents?query=${encodeURIComponent(q)}`));
  };

  return (
    <motion.div layoutId="global-search" animate={{ scale: isTransitioning ? 1 : 1 }}>
      <SearchInput value={query} onChange={setQuery} onSubmit={handleSubmit} className="w-full max-w-5xl" />
    </motion.div>
  );
}


