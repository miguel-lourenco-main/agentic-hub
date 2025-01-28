import { Inter } from "next/font/google";
import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";
import { cn } from "@/lib/utils";
import { AppSidebar } from "@/components/app-sidebar";
import { Breadcrumbs } from "@workspace/ui/components/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar";
import { ArrowRight, Megaphone } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "AI Agent Marketplace",
  description: "A decentralized marketplace for AI agents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.variable,
          "flex flex-col h-screen bg-background font-sans antialiased overflow-hidden"
        )}
      >
        <div className="w-full bg-foreground text-background text-sm py-3 shrink-0">
          <div className="container flex items-center justify-center gap-2 mx-auto">
            <Megaphone className="stroke-yellow-400 h-5 w-5" />
            <a 
              href="https://www.linkedin.com/in/francisco-de-melo/"
              className="cursor-pointer"
            >
              We&apos;re fundraising and looking for a CMO guru.
            </a>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
        <Providers>
          <div className="flex flex-1 overflow-hidden">
            <SidebarProvider className="flex-1">
              <div className="relative flex w-full h-full">
                <AppSidebar />
                <SidebarInset>
                  <header className="flex h-16 shrink-0 items-center gap-4 border-b px-6">
                    <SidebarTrigger className="md:hidden" />
                    <Breadcrumbs />
                  </header>
                  <div className="flex-1 overflow-auto">{children}</div>
                </SidebarInset>
              </div>
            </SidebarProvider>
          </div>
        </Providers>
      </body>
    </html>
  );
}
