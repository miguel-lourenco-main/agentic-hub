"use client"

// Client-only app shell: motion config, shared search state, header/footer chrome.
import * as React from "react"
import { MotionConfig } from "framer-motion"
import { SearchUIProvider } from "@/components/search/search-context"
import { SiteFooter } from "@/components/site-footer"
import dynamic from "next/dynamic"
// Header is client-only so layoutId can morph the search bar from home → /agents.
const SiteHeader = dynamic(() => import("@/components/site-header").then(m => m.SiteHeader), { ssr: false })

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SearchUIProvider>
        <div className=" flex flex-col relative h-full overflow-y-auto">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </SearchUIProvider>
    </MotionConfig>
  )
}
