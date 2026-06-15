"use client";

// Sticky header with two layouts: marketing nav on home, inline search on /agents.
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { AppLogo } from "@/components/app-logo";
import { ConnectWalletButton } from "@/components/connect-wallet-button";
import { HeaderSearchInline } from "@/components/search/header-search-inline";
import { LiveDot } from "@/components/ui/live-dot";
import { cn, formatInt } from "@/lib/utils";
import { useSearchUI } from "@/components/search/search-context";
import { useEffect, useState } from "react";
import { stripBasePath, withBasePath } from "@/lib/base-path";
import { marketplaceStats } from "@/data/stats";

const NAV = [
  { label: "Marketplace", href: "/agents", hash: false },
  { label: "How it works", href: "/#how-it-works", hash: true },
  { label: "For builders", href: "/#list-agent", hash: true },
];

export function SiteHeader() {
  const pathname = usePathname();
  const showSearch = /^\/agents\/?$/.test(stripBasePath(pathname ?? ""));
  const { isTransitioning, setIsTransitioning } = useSearchUI();
  const hasSearchSlot = showSearch || isTransitioning;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!showSearch) {
      setIsTransitioning(false);
      return;
    }
    const id = requestAnimationFrame(() => setIsTransitioning(false));
    return () => cancelAnimationFrame(id);
  }, [showSearch, setIsTransitioning]);

  const onHashNav = (e: React.MouseEvent, href: string) => {
    const isHome = stripBasePath(pathname ?? "") === "/";
    if (!isHome) return; // let the link navigate to home first
    const id = href.split("#")[1];
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o?: object) => void } }).__lenis;
    if (lenis) lenis.scrollTo(target, { offset: -80 });
    else target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-white/[0.07] bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
      initial={false}
      layout
    >
      <motion.div
        layout
        className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6"
      >
        {hasSearchSlot ? (
          <div className="flex w-full items-center gap-3">
            <AppLogo className="shrink-0" size={34} />
            <div className="mx-auto w-full max-w-2xl">
              <HeaderSearchInline />
            </div>
            <motion.div layout>
              <ConnectWalletButton />
            </motion.div>
          </div>
        ) : (
          <div className="flex w-full items-center justify-between gap-4">
            <AppLogo size={34} showWordmark />

            <nav className="hidden items-center gap-1 md:flex">
              {NAV.map((item) => (
                <Link
                  key={item.label}
                  href={withBasePath(item.href)}
                  onClick={item.hash ? (e) => onHashNav(e, item.href) : undefined}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "hidden items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1 transition-all duration-300 lg:flex",
                  scrolled ? "opacity-100" : "pointer-events-none translate-y-1 opacity-0"
                )}
              >
                <LiveDot />
                <span className="font-mono text-xs text-muted-foreground">
                  <span className="text-gold">{formatInt(marketplaceStats.solVolume)}</span> SOL
                </span>
              </div>
              <ConnectWalletButton />
            </div>
          </div>
        )}
      </motion.div>
    </motion.header>
  );
}
