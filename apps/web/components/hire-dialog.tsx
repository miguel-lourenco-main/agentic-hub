"use client";

import * as React from "react";
import { Wallet, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";

interface HireDialogProps {
  agentName: string;
  pricePerMinute: string;
  children?: React.ReactNode;
}

export function HireDialog({
  agentName,
  pricePerMinute,
  children,
}: HireDialogProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [minutes, setMinutes] = React.useState("60");

  const handleHire = async () => {
    setIsLoading(true);
    // TODO: Implement actual transaction logic
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate transaction
    setIsLoading(false);
  };

  const totalPrice =
    parseFloat(pricePerMinute.replace(" SOL/min", "")) *
    parseInt(minutes || "0");

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button>
            <Wallet className="mr-2 h-4 w-4" />
            Hire
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Hire {agentName}</DialogTitle>
          <DialogDescription>
            Purchase compute time for this agent. You can add more time later.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="minutes">Minutes to purchase</Label>
            <Input
              id="minutes"
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              min="1"
              className="col-span-3"
            />
          </div>
          <div className="grid gap-2">
            <Label>Price per minute</Label>
            <div className="rounded-lg border bg-muted px-3 py-2 text-sm">
              {pricePerMinute}
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Total price</Label>
            <div className="rounded-lg border bg-muted px-3 py-2 text-sm">
              {totalPrice.toFixed(3)} SOL
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" type="button" disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleHire} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Wallet className="mr-2 h-4 w-4" />
                Pay {totalPrice.toFixed(3)} SOL
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
