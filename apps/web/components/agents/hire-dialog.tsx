"use client";

import * as React from "react";
import { Wallet, Loader2, Info, Check } from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { SparkleBorder } from "@workspace/ui/components/sparkle-border";
import { cn } from "@/lib/utils";

interface HireDialogProps {
  agentName: string;
  billing: {
    model: string;
    rate: number;
    currency: string;
    unit?: string;
  };
  children?: React.ReactNode;
}

export function HireDialog({ agentName, billing, children }: HireDialogProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [amount, setAmount] = React.useState("1000");
  const [open, setOpen] = React.useState(false);

  const handleHire = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSuccess(true);
    setIsLoading(false);
    
    // Show success state with sparkles for 1.5s before closing
    setTimeout(() => {
      setOpen(false);
      setTimeout(() => setIsSuccess(false), 600);
    }, 2500);
  };

  const totalPrice = billing.rate * parseInt(amount || "0");

  const getUnitLabel = () => {
    switch (billing.model) {
      case "per unit":
        return billing.unit ?? "units";
      case "per request":
        return "requests";
      case "per minute":
        return "minutes";
      default:
        return "credits";
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ?? (
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
            Purchase credits for this agent. You can add more credits later.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="amount">Amount to purchase</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>1 credit = 1 {getUnitLabel()}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              className="col-span-3"
              disabled={isLoading || isSuccess}
            />
          </div>
          <div className="grid gap-2">
            <Label>Rate</Label>
            <div className="rounded-lg border bg-muted px-3 py-2 text-sm">
              {billing.rate} {billing.currency} {billing.model}
              {billing.unit && ` (${billing.unit})`}
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Total price</Label>
            <div className="rounded-lg border bg-muted px-3 py-2 text-sm">
              {totalPrice.toFixed(6)} {billing.currency}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            type="button" 
            disabled={isLoading || isSuccess}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <SparkleBorder isSelected={isSuccess} className="rounded-md">
            <Button 
              onClick={handleHire} 
              disabled={isLoading}
              variant={isSuccess ? "secondary" : "default"}
              className={cn(
                "flex items-center w-full",
                isSuccess && "pointer-events-none"

              )}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-6 w-6 animate-spin" />
                  Processing payment...
                </>
              ) : isSuccess ? (
                <>
                  <Check className="mt-1 h-8 w-8 text-green-600" />
                  Payment successful!
                </>
              ) : (
                <>
                  <Wallet className="mr-2 h-4 w-4" />
                  Pay {totalPrice.toFixed(6)} {billing.currency}
                </>
              )}
            </Button>
          </SparkleBorder>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
