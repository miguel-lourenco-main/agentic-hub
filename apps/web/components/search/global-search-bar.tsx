"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@workspace/ui/lib/utils";
import { SearchInput } from "@/components/search-input";
import { useSearchUI } from "@/components/search/search-context";

export function GlobalSearchBar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { query, setQuery } = useSearchUI();
  const shouldBeVisible = pathname?.startsWith("/agents") ?? false;

  useEffect(() => {
    if (pathname?.startsWith("/agents")) {
      const currentQuery = searchParams?.get("query") || "";
      if (currentQuery && currentQuery !== query) {
        setQuery(currentQuery);
      }
    }
  }, [pathname, searchParams, setQuery]);

  const handleSubmit = () => {
    const q = query.trim();
    if (!q) return;
    router.push(`/agents?query=${encodeURIComponent(q)}`);
  };

  if (!shouldBeVisible) return null;

  return (
    <div className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className={cn("container max-w-3xl mx-auto px-4 py-3")}>        
        <motion.div layoutId="global-search">
          <SearchInput
            value={query}
            onChange={setQuery}
            onSubmit={handleSubmit}
            className="w-full"
          />
        </motion.div>
      </div>
    </div>
  );
}


