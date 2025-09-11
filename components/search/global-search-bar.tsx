"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import { log } from "@/lib/utils";
import { SearchInput } from "@/components/search-input";
import { useSearchUI } from "@/components/search/search-context";
import { withBasePath } from "@/lib/base-path";

export function GlobalSearchBar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { query, setQuery } = useSearchUI();
  const shouldBeVisible = (pathname ?? "").startsWith(withBasePath("/agents"));

  // Scroll-hide configuration: hide after X px down, show after X/4 px up
  const HIDE_THRESHOLD = 800;
  const SHOW_THRESHOLD = HIDE_THRESHOLD / 4;

  const [isHidden, setIsHidden] = useState(false);
  const lastScrollYRef = useRef(0);
  const downAccumRef = useRef(0);
  const upAccumRef = useRef(0);
  const containerElRef = useRef<HTMLElement | null>(null);
  const containerScrollY = useMotionValue(0);

  useEffect(() => {
    log("mount", { shouldBeVisible, pathname, HIDE_THRESHOLD, SHOW_THRESHOLD });
  }, []);

  useEffect(() => {
    log("pathname changed", { pathname, shouldBeVisible });
    if (shouldBeVisible) {
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
    log("reset state", {
      el,
      startY,
      lastScrollY: lastScrollYRef.current,
      downAccum: downAccumRef.current,
      upAccum: upAccumRef.current,
      isHidden: false,
    });
  }, [shouldBeVisible]);

  useEffect(() => {
    log("isHidden changed", { isHidden });
  }, [isHidden]);

  // Scroll listener using framer-motion MotionValue changes
  // Bridge container scrollTop to a MotionValue so we can use useMotionValueEvent
  useEffect(() => {
    const el = containerElRef.current;
    if (!shouldBeVisible || !el) return;
    const onScroll = () => {
      const newScrollTop = el.scrollTop;
      log("container scroll event", { scrollTop: newScrollTop, current: containerScrollY.get() });
      containerScrollY.set(newScrollTop);
    };
    // Prime with current value
    const initialScrollTop = el.scrollTop;
    containerScrollY.set(initialScrollTop);
    log("container scroll listener setup", { el, initialScrollTop });
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [shouldBeVisible, containerScrollY]);

  useMotionValueEvent(containerScrollY, "change", (current) => {
    log("containerScrollY", containerScrollY);
    log("current", current);

    if (!shouldBeVisible) return;
    if (typeof current !== "number") return;

    const prev = lastScrollYRef.current;
    const delta = current - prev;
    lastScrollYRef.current = current;
    log("scrollY change", {
      current,
      prev,
      delta,
      isHidden,
      downAccum: downAccumRef.current,
      upAccum: upAccumRef.current,
    });

    if (delta > 0) {
      // Scrolling down
      if (!isHidden) {
        downAccumRef.current += delta;
        log("down accumulate", { downAccum: downAccumRef.current });
        if (downAccumRef.current >= HIDE_THRESHOLD) {
          setIsHidden(true);
          downAccumRef.current = 0;
          upAccumRef.current = 0;
          log("HIDE triggered");
        }
      } else {
        // When hidden and still going down, discard any prior upward progress
        upAccumRef.current = 0;
        log("still hidden, scrolling down -> reset upAccum");
      }
    } else if (delta < 0) {
      // Scrolling up
      const upDelta = -delta;
      if (isHidden) {
        upAccumRef.current += upDelta;
        log("up accumulate", { upAccum: upAccumRef.current });
        if (upAccumRef.current >= SHOW_THRESHOLD) {
          setIsHidden(false);
          downAccumRef.current = 0;
          upAccumRef.current = 0;
          log("SHOW triggered");
        }
      } else {
        // Reduce downward accumulation while visible
        downAccumRef.current = Math.max(0, downAccumRef.current - upDelta);
        log("reduce downAccum while visible", { downAccum: downAccumRef.current });
      }
    }
  });

  // Fallback: direct scroll event listener if MotionValue approach fails
  useEffect(() => {
    const el = containerElRef.current;
    if (!shouldBeVisible || !el) return;
    
    const onScrollDirect = () => {
      const current = el.scrollTop;
      const prev = lastScrollYRef.current;
      const delta = current - prev;
      lastScrollYRef.current = current;
      
      log("DIRECT scroll event", {
        current,
        prev,
        delta,
        isHidden,
        downAccum: downAccumRef.current,
        upAccum: upAccumRef.current,
      });

      if (delta > 0) {
        // Scrolling down
        if (!isHidden) {
          downAccumRef.current += delta;
          log("DIRECT down accumulate", { downAccum: downAccumRef.current });
          if (downAccumRef.current >= HIDE_THRESHOLD) {
            setIsHidden(true);
            downAccumRef.current = 0;
            upAccumRef.current = 0;
            log("DIRECT HIDE triggered");
          }
        } else {
          upAccumRef.current = 0;
          log("DIRECT still hidden, scrolling down -> reset upAccum");
        }
      } else if (delta < 0) {
        // Scrolling up
        const upDelta = -delta;
        if (isHidden) {
          upAccumRef.current += upDelta;
          log("DIRECT up accumulate", { upAccum: upAccumRef.current });
          if (upAccumRef.current >= SHOW_THRESHOLD) {
            setIsHidden(false);
            downAccumRef.current = 0;
            upAccumRef.current = 0;
            log("DIRECT SHOW triggered");
          }
        } else {
          downAccumRef.current = Math.max(0, downAccumRef.current - upDelta);
          log("DIRECT reduce downAccum while visible", { downAccum: downAccumRef.current });
        }
      }
    };

    el.addEventListener("scroll", onScrollDirect, { passive: true });
    return () => el.removeEventListener("scroll", onScrollDirect);
  }, [shouldBeVisible, isHidden]);

  // Debug: log all scroll containers and their properties
  useEffect(() => {
    if (!shouldBeVisible) return;
    const containers = document.querySelectorAll('[data-scroll-container], .overflow-auto, .overflow-y-auto');
    log("found scroll containers", Array.from(containers).map(el => ({
      tagName: el.tagName,
      className: el.className,
      scrollHeight: el.scrollHeight,
      clientHeight: el.clientHeight,
      scrollTop: el.scrollTop,
      hasOverflow: el.scrollHeight > el.clientHeight
    })));
  }, [shouldBeVisible]);

  // Fallback: also listen to window scroll
  useEffect(() => {
    if (!shouldBeVisible) return;
    const onWindowScroll = () => {
      log("window scroll", { 
        y: window.scrollY,
        documentHeight: document.documentElement.scrollHeight,
        windowHeight: window.innerHeight,
        hasOverflow: document.documentElement.scrollHeight > window.innerHeight
      });
    };
    window.addEventListener("scroll", onWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", onWindowScroll);
  }, [shouldBeVisible]);

  const handleSubmit = () => {
    const q = query.trim();
    if (!q) return;
    router.push(withBasePath(`/agents?query=${encodeURIComponent(q)}`));
  };

  if (!shouldBeVisible) return null;

  return (
    <motion.div className="w-full" initial={false} animate={{ opacity: isHidden ? 0 : 1 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
      <motion.div layoutId="global-search">
        <SearchInput value={query} onChange={setQuery} onSubmit={handleSubmit} className="w-full max-w-7xl" />
      </motion.div>
    </motion.div>
  );
}


