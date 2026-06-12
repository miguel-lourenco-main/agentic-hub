"use client"

import { useState } from "react"
import { Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LiveDot } from "@/components/ui/live-dot"

// Placeholder address shown after a mock connect — no real wallet integration.
const MOCK_ADDRESS = "7xKp…3Fa9"

export function ConnectWalletButton() {
  const [connected, setConnected] = useState(false)

  if (connected) {
    return (
      <Button
        variant="outline"
        onClick={() => setConnected(false)}
        className="gap-2 font-mono text-xs"
      >
        <LiveDot />
        {MOCK_ADDRESS}
      </Button>
    )
  }

  return (
    <Button variant="gradient" onClick={() => setConnected(true)} className="gap-2">
      <Wallet className="h-4 w-4" />
      <span className="hidden sm:inline">Connect Wallet</span>
      <span className="sm:hidden">Connect</span>
    </Button>
  )
}
