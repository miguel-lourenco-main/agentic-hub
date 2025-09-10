"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import { cn } from "@workspace/ui/lib/utils";
import { SearchInput } from "@/components/search-input";
import { useSearchUI } from "@/components/search/search-context";

export function GlobalSearchBar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { query, setQuery } = useSearchUI();
  const shouldBeVisible = pathname?.startsWith("/agents") ?? false;

  // Scroll-hide configuration: hide after X px down, show after X/4 px up
  const HIDE_THRESHOLD = 700;
  const SHOW_THRESHOLD = HIDE_THRESHOLD / 4;

  const [isHidden, setIsHidden] = useState(false);
  const lastScrollYRef = useRef(0);
  const downAccumRef = useRef(0);
  const upAccumRef = useRef(0);
  const containerElRef = useRef<HTMLElement | null>(null);
  const containerScrollY = useMotionValue(0);


  useEffect(() => {
    if (pathname?.startsWith("/agents")) {
      const currentQuery = searchParams?.get("query") || "";
      if (currentQuery && currentQuery !== query) {
        setQuery(currentQuery);
      }
    }
  }, [pathname, searchParams, setQuery]);

  // Find scroll container and reset state on route change to agents (or mount)
  useEffect(() => {
    if (!shouldBeVisible) return;
    // The actual scroll container is the one from Providers with "relative h-full overflow-y-auto"
    const el = document.querySelector('.relative.h-full.overflow-y-auto') as HTMLElement | null;
    containerElRef.current = el;
    const startY = el ? el.scrollTop : (typeof window !== "undefined" ? window.scrollY : 0);
    lastScrollYRef.current = startY;
    containerScrollY.set(startY);
    downAccumRef.current = 0;
    upAccumRef.current = 0;
    setIsHidden(false);
  }, [shouldBeVisible]);


  // Scroll listener using framer-motion MotionValue changes
  // Bridge container scrollTop to a MotionValue so we can use useMotionValueEvent
  useEffect(() => {
    const el = containerElRef.current;
    if (!shouldBeVisible || !el) return;
    const onScroll = () => {
      const newScrollTop = el.scrollTop;
      containerScrollY.set(newScrollTop);
    };
    // Prime with current value
    const initialScrollTop = el.scrollTop;
    containerScrollY.set(initialScrollTop);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [shouldBeVisible, containerScrollY]);

  useMotionValueEvent(containerScrollY, "change", (current) => {
    if (!shouldBeVisible) return;
    if (typeof current !== "number") return;

    const prev = lastScrollYRef.current;
    const delta = current - prev;
    lastScrollYRef.current = current;

    if (delta > 0) {
      // Scrolling down
      if (!isHidden) {
        downAccumRef.current += delta;
        if (downAccumRef.current >= HIDE_THRESHOLD) {
          setIsHidden(true);
          downAccumRef.current = 0;
          upAccumRef.current = 0;
        }
      } else {
        // When hidden and still going down, discard any prior upward progress
        upAccumRef.current = 0;
      }
    } else if (delta < 0) {
      // Scrolling up
      const upDelta = -delta;
      if (isHidden) {
        upAccumRef.current += upDelta;
        if (upAccumRef.current >= SHOW_THRESHOLD) {
          setIsHidden(false);
          downAccumRef.current = 0;
          upAccumRef.current = 0;
        }
      } else {
        // Reduce downward accumulation while visible
        downAccumRef.current = Math.max(0, downAccumRef.current - upDelta);
      }
    }
  });



  const handleSubmit = () => {
    const q = query.trim();
    if (!q) return;
    router.push(`/agents?query=${encodeURIComponent(q)}`);
  };

  if (!shouldBeVisible) return null;

  return (
    <motion.div
      className="sticky top-0 z-50 w-full bg-transparent"
      initial={false}
      animate={{ y: isHidden ? "-100%" : "0%", opacity: isHidden ? 0 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className={cn("max-w-3xl mx-auto px-4 py-3")}>        
        <motion.div layoutId="global-search">
          <SearchInput
            value={query}
            onChange={setQuery}
            onSubmit={handleSubmit}
            className="w-full"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}


