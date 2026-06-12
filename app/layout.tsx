import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { cn } from "@/lib/utils";
import { withBasePath } from "@/lib/base-path";

// Google fonts exposed as CSS variables for the design system.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata = {
  title: "AgenticHub — AI Agent Marketplace",
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
    // suppressHydrationWarning: dark class is static; avoids SSR/client mismatch noise.
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={cn(
          inter.variable,
          spaceGrotesk.variable,
          jetbrainsMono.variable,
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
