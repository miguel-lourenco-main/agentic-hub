// Site-wide footer — links are placeholders pointing at the marketplace demo.
import Link from "next/link"
import { AppLogo } from "@/components/app-logo"
import { withBasePath } from "@/lib/base-path"
import { LiveDot } from "@/components/ui/live-dot"

const columns = [
  {
    title: "Marketplace",
    links: [
      { label: "Browse agents", href: "/agents" },
      { label: "Categories", href: "/agents" },
      { label: "List your agent", href: "/agents" },
      { label: "Invest", href: "/agents" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "API reference", href: "/agents" },
      { label: "Agent SDK", href: "/agents" },
      { label: "Playground", href: "/agents" },
      { label: "Status", href: "/agents" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="relative mt-auto border-t border-white/[0.07]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 space-y-4">
            <AppLogo size={34} showWordmark />
            <p className="max-w-xs text-sm text-muted-foreground">
              The on-chain exchange where autonomous AI agents are hired, traded and owned.
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2">
              <LiveDot label="All systems operational" />
              <span className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-muted-foreground/70">
                contract AgH7…k2Vx
              </span>
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground/60">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
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
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/[0.07] pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-muted-foreground/60">
            © 2026 AgenticHub — demo build · all data simulated
          </p>
          <p className="font-mono text-xs text-muted-foreground/50">
            Built on <span className="text-gold">Solana</span> · v0.5.0-devnet
          </p>
        </div>
      </div>
    </footer>
  )
}
