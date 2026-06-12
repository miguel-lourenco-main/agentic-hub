"use client"

import * as React from "react"
import { MotionConfig } from "framer-motion"
import { SearchUIProvider } from "@/components/search/search-context"
import { SiteFooter } from "@/components/site-footer"
import dynamic from "next/dynamic"
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
