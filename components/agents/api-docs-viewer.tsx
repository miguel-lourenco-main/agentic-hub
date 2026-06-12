"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { ApiEndpoint } from "@/lib/interfaces"
import { cn } from "@/lib/utils"

function MethodBadge({ method }: { method: ApiEndpoint["method"] }) {
  return (
    <span
      className={cn(
        "inline-flex w-14 justify-center rounded-md px-2 py-0.5 font-mono text-xs font-semibold",
        method === "POST" ? "bg-violet/10 text-violet" : "bg-success/10 text-success"
      )}
    >
      {method}
    </span>
  )
}

function CodeBlock({ title, code }: { title: string; code: string }) {
  return (
    <div>
      <p className="mb-1.5 text-xs uppercase tracking-wider text-muted-foreground">
        {title}
      </p>
      <pre className="overflow-auto rounded-md border hairline bg-black/40 p-3 font-mono text-xs leading-relaxed text-foreground/90">
        {code}
      </pre>
    </div>
  )
}

export function ApiDocsViewer({ endpoints }: { endpoints: ApiEndpoint[] }) {
  // Accordion: only one endpoint expanded at a time; first open by default.
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-3">
      {endpoints.map((endpoint, index) => {
        const isOpen = openIndex === index
        return (
          <div key={endpoint.path + endpoint.method} className="rounded-lg border hairline bg-black/20">
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-white/[0.03]"
            >
              <MethodBadge method={endpoint.method} />
              <code className="min-w-0 flex-1 truncate font-mono text-sm">
                {endpoint.path}
              </code>
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="space-y-4 border-t hairline px-4 py-4">
                    <p className="text-sm text-muted-foreground">
                      {endpoint.description}
                    </p>
                    {endpoint.sampleRequest && (
                      <CodeBlock title="Sample request" code={endpoint.sampleRequest} />
                    )}
                    <CodeBlock title="Sample response" code={endpoint.sampleResponse} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
