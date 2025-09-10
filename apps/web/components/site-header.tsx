"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { AppLogo } from "@/components/app-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { HeaderSearchInline } from "@/components/search/header-search-inline";
import { cn } from "@/lib/utils";
import { useSearchUI } from "@/components/search/search-context";
import { useEffect } from "react";

export function SiteHeader() {
  const pathname = usePathname();
  const showSearch = /^\/agents\/?$/.test(pathname ?? "");
  const { isTransitioning, setIsTransitioning } = useSearchUI();
  const hasSearchSlot = showSearch || isTransitioning;

  // When we arrive on /agents, keep the slot pinned until first paint, then clear transition
  useEffect(() => {
    if (!showSearch) {
      // If we're not on /agents, ensure header returns to normal
      setIsTransitioning(false);
      return;
    }
    // On /agents, clear transition flag on the first paint to return to normal header layout
    const id = requestAnimationFrame(() => setIsTransitioning(false));
    return () => cancelAnimationFrame(id);
  }, [showSearch, setIsTransitioning]);

  return (
    <motion.header
      className="sticky top-0 h-[4rem] z-50 w-full bg-transparent border-border/40 my-3"
      initial={false}
      layout
    >
      <motion.div layout className={cn("flex items-center size-full py-2 px-12") }>
        {hasSearchSlot ? (
          <div className="flex w-full items-center gap-3">
            <AppLogo className="shrink-0" size={42} />
            <div className="w-full max-w-3xl mx-auto">
              <HeaderSearchInline />
            </div>
            <motion.div layout>
              <ThemeToggle />
            </motion.div>
          </div>
        ) : (
          <div className={cn("flex w-full items-center justify-between", !pathname.startsWith("/agents") && "max-w-5xl mx-auto")}>
            <AppLogo size={42} />
            <motion.div layout>
              <ThemeToggle />
            </motion.div>
          </div>
        )}
      </motion.div>
      {/* No extra rendering; search is inline when showSearch */}
    </motion.header>
  );
}


