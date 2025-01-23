import { Inter } from "next/font/google";
import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";
import { cn } from "@/lib/utils";
import { AppSidebar } from "@/components/app-sidebar";
import { Breadcrumbs } from "@/components/breadcrumbs";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar";

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
          "min-h-screen bg-background font-sans antialiased"
        )}
      >
        <Providers>
          <SidebarProvider>
            <div className="relative flex min-h-screen w-full">
              <AppSidebar />
              <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-4 border-b px-6">
                  <SidebarTrigger className="md:hidden" />
                  <Breadcrumbs />
                </header>
                <div className="flex-1">{children}</div>
              </SidebarInset>
            </div>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
