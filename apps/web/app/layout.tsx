import { Inter } from "next/font/google";
import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";
import { cn } from "@/lib/utils";

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
        <Providers>
          <div className="flex-1">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
