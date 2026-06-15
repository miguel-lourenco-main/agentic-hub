"use client"

// Client-side app shell: motion config, search state, chrome, and scroll/cursor FX.
import * as React from "react"
import { MotionConfig } from "framer-motion"
import { SearchUIProvider } from "@/components/search/search-context"
import { SiteFooter } from "@/components/site-footer"
import { SiteBackground } from "@/components/site-background"
import { SmoothScroll } from "@/components/motion/smooth-scroll"
import { ScrollProgress } from "@/components/motion/scroll-progress"
import { CustomCursor } from "@/components/motion/custom-cursor"
import dynamic from "next/dynamic"

const SiteHeader = dynamic(() => import("@/components/site-header").then(m => m.SiteHeader), { ssr: false })

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SearchUIProvider>
        <SiteBackground />
        <SmoothScroll />
        <ScrollProgress />
        <CustomCursor />
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </SearchUIProvider>
    </MotionConfig>
  )
}
