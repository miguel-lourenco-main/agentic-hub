"use client";

import { createContext, useContext, useMemo, useState } from "react";

// Shared search query + transition flag so the header input and /agents
// results stay in sync across client navigations (static-export friendly).

type SearchUIContextValue = {
  query: string;
  setQuery: (q: string) => void;
  /** True while the shared search morphs from hero → header. */
  isTransitioning: boolean;
  setIsTransitioning: (v: boolean) => void;
};

const SearchUIContext = createContext<SearchUIContextValue | null>(null);

export function SearchUIProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const value = useMemo(
    () => ({ query, setQuery, isTransitioning, setIsTransitioning }),
    [query, isTransitioning]
  );

  return <SearchUIContext.Provider value={value}>{children}</SearchUIContext.Provider>;
}

export function useSearchUI() {
  const ctx = useContext(SearchUIContext);
  if (!ctx) throw new Error("useSearchUI must be used within SearchUIProvider");
  return ctx;
}


