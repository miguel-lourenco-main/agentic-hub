"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SearchUIProvider } from "@/components/search/search-context"
import dynamic from "next/dynamic"
const SiteHeader = dynamic(() => import("@/components/site-header").then(m => m.SiteHeader), { ssr: false })

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <SearchUIProvider>
        <div className=" flex flex-col relative h-full overflow-y-auto">
          <SiteHeader />
          {children}
        </div>
      </SearchUIProvider>
    </NextThemesProvider>
  )
}
