"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SearchUIProvider } from "@/components/search/search-context"
import { SiteHeader } from "@/components/site-header"

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
