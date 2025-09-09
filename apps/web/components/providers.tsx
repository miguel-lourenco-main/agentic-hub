"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SearchUIProvider } from "@/components/search/search-context"
import { GlobalSearchBar } from "@/components/search/global-search-bar"

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
        <GlobalSearchBar />
        {children}
      </SearchUIProvider>
    </NextThemesProvider>
  )
}
