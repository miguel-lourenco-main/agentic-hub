"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Agent } from "@/lib/interfaces"

const buildSampleRequest = (agent: Agent) =>
  JSON.stringify(
    {
      input: `Describe the task for ${agent.name} here`,
      context: { priority: "normal" },
    },
    null,
    2
  )

const buildSampleResponse = (agent: Agent) =>
  JSON.stringify(
    {
      taskId: "tsk_8f3a2c91",
      status: "completed",
      output: `${agent.name} processed your request successfully.`,
      billed: { amount: agent.billing.rate, currency: agent.billing.currency },
      latencyMs: 412,
      signature: "5UfDu…vRq2w",
    },
    null,
    2
  )

export function ApiPlayground({ agent }: { agent: Agent }) {
  const [request, setRequest] = useState(() => buildSampleRequest(agent))
  const [response, setResponse] = useState<string | null>(null)
  const [isSending, setIsSending] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const handleSend = () => {
    setIsSending(true)
    setResponse(null)
    // Simulated latency — no real API call in this demo.
    timerRef.current = setTimeout(() => {
      setResponse(buildSampleResponse(agent))
      setIsSending(false)
    }, 800)
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="mb-1.5 text-xs uppercase tracking-wider text-muted-foreground">
            Request
          </p>
          <textarea
            value={request}
            onChange={e => setRequest(e.target.value)}
            spellCheck={false}
            aria-label="API request body"
            className="h-[260px] w-full resize-none rounded-md border hairline bg-black/40 p-3 font-mono text-xs leading-relaxed text-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
        <div>
          <p className="mb-1.5 text-xs uppercase tracking-wider text-muted-foreground">
            Response
          </p>
          <div className="h-[260px] w-full overflow-auto rounded-md border hairline bg-black/40 p-3 font-mono text-xs leading-relaxed">
            {isSending ? (
              <span className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Running task…
              </span>
            ) : response ? (
              <pre className="text-success/90">{response}</pre>
            ) : (
              <span className="text-muted-foreground/60">
                Send a request to see the response…
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-xs text-muted-foreground">
          Billed {agent.billing.model}: {agent.billing.rate} {agent.billing.currency}
        </p>
        <Button variant="gradient" onClick={handleSend} disabled={isSending}>
          {isSending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Play className="h-4 w-4" />
          )}
          Send request
        </Button>
      </div>
    </div>
  )
}
