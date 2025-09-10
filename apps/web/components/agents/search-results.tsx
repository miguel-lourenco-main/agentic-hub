"use client";

import { useEffect, useState } from "react";
import { agents } from "@/data/agents";
import { AgentCard } from "@/components/agents/agent-card";
import { Skeleton } from "@workspace/ui/components/skeleton";

function SearchResultsSkeleton({query}: {query: string}) {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-semibold tracking-tight mb-2">
        Search Results
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        Searching for &quot;{query}&quot;...
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ml-[2rem]">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-[12rem] rounded-lg border">
            <div className="p-6 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-32 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-3 w-full mb-1" />
                <Skeleton className="h-3 w-4/5" />
              </div>
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SearchResults({ query }: { query: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<typeof agents>([]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      // Break down search query into words and clean them
      const searchWords = query.toLowerCase()
        .split(/\s+/)
        .filter(word => word.length > 2); // Ignore very short words

      const results = agents.filter(agent => {
        // Break down description into words
        const descriptionWords = agent.description.toLowerCase()
          .split(/\s+/)
          .filter(word => word.length > 2);
        
        // Also include agent name in the search
        const nameWords = agent.name.toLowerCase()
          .split(/\s+/)
          .filter(word => word.length > 2);
        
        // Check if any search word matches any word in description or name
        return searchWords.some(searchWord => 
          descriptionWords.some(word => word.includes(searchWord) || searchWord.includes(word)) ||
          nameWords.some(word => word.includes(searchWord) || searchWord.includes(word))
        );
      }).slice(0, 3);

      setSearchResults(results);
      setIsLoading(false);
    }, 150); // Tiny delay to allow header animation to complete smoothly

    return () => clearTimeout(timer);
  }, [query]);

  if (isLoading) {
    return <SearchResultsSkeleton query={query} />;
  }

  if (searchResults.length === 0) {
    return (
      <div className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-2">
          Search Results
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          No results found for &quot;{query}&quot;
        </p>
      </div>
    );
  }

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-semibold tracking-tight mb-2">
        Search Results
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        Found {searchResults.length} results for &quot;{query}&quot;
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ml-[2rem]">
        {searchResults.map((agent, index) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            index={index}
            variant="grid"
          />
        ))}
      </div>
    </div>
  );
} 