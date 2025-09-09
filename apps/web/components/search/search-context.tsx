"use client";

import { createContext, useContext, useMemo, useState } from "react";

type SearchUIContextValue = {
  query: string;
  setQuery: (q: string) => void;
};

const SearchUIContext = createContext<SearchUIContextValue | null>(null);

export function SearchUIProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");

  const value = useMemo(
    () => ({ query, setQuery }),
    [query]
  );

  return <SearchUIContext.Provider value={value}>{children}</SearchUIContext.Provider>;
}

export function useSearchUI() {
  const ctx = useContext(SearchUIContext);
  if (!ctx) throw new Error("useSearchUI must be used within SearchUIProvider");
  return ctx;
}


