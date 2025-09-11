import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { cn } from "@/lib/utils";
import { withBasePath } from "@/lib/base-path";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "AI Agent Marketplace",
  description: "A decentralized marketplace for AI agents",
  manifest: withBasePath("/site.webmanifest"),
  icons: {
    icon: [
      { url: withBasePath('/favicon.ico'), sizes: 'any' },
      { url: withBasePath('/favicon-32x32.png'), type: 'image/png', sizes: '32x32' },
      { url: withBasePath('/favicon-16x16.png'), type: 'image/png', sizes: '16x16' },
    ],
    apple: [
      { url: withBasePath('/apple-touch-icon.png'), sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        url: withBasePath('/android-chrome-192x192.png'),
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        url: withBasePath('/android-chrome-512x512.png'),
      },
    ],
  },
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
