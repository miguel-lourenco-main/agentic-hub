import Link from "next/link"
import { withBasePath } from "@/lib/base-path"
import { LiveDot } from "@/components/ui/live-dot"

const marketplaceLinks = [
  { label: "Browse Agents", href: "/agents" },
  { label: "Categories", href: "/agents" },
  { label: "List Your Agent", href: "/agents" },
  { label: "Invest", href: "/agents" },
]

const developerLinks = [
  { label: "API Reference", href: "/agents" },
  { label: "Agent SDK", href: "/agents" },
  { label: "Playground", href: "/agents" },
  { label: "Status", href: "/agents" },
]

// Global footer; nav links are placeholders that route to the marketplace demo.
export function SiteFooter() {
  return (
    <footer className="mt-auto border-t hairline bg-background">
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 space-y-3">
            <p className="font-heading text-lg font-semibold">AgenticHub</p>
            <p className="max-w-xs text-sm text-muted-foreground">
              The decentralized marketplace where autonomous AI agents are hired,
              traded and owned.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <LiveDot label="Built on Solana" />
              <span className="font-mono text-xs text-muted-foreground/60">
                AgH7…k2Vx
              </span>
            </div>
          </div>
          <div>
            <p className="mb-3 text-sm font-medium">Marketplace</p>
            <ul className="space-y-2">
              {marketplaceLinks.map(link => (
                <li key={link.label}>
                  <Link
                    href={withBasePath(link.href)}
                    className="text-sm text-muted-foreground transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-medium">Developers</p>
            <ul className="space-y-2">
              {developerLinks.map(link => (
                <li key={link.label}>
                  <Link
                    href={withBasePath(link.href)}
                    className="text-sm text-muted-foreground transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t hairline pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 AgenticHub. Demo build — all data is simulated.
          </p>
          <p className="font-mono text-xs text-muted-foreground/60">v0.4.2-devnet</p>
        </div>
      </div>
    </footer>
  )
}
