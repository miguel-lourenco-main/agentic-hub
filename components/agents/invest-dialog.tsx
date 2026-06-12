"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, TrendingUp, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GradientText } from "@/components/ui/gradient-text";
import { SparklineChart } from "@/components/ui/sparkline-chart";
import { seededRandom } from "@/lib/seeded";

interface InvestDialogProps {
  children: React.ReactNode;
  agentName: string;
  marketCap: number;
  availableShares: number;
  pricePerShare: number;
}

export function InvestDialog({
  children,
  agentName,
  marketCap,
  availableShares,
  pricePerShare,
}: InvestDialogProps) {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInvest = async () => {
    setIsLoading(true);
    // Simulate investment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setShowSuccess(true);
    // Reset after showing success
    setTimeout(() => {
      setShowSuccess(false);
      setStep(1);
      setAmount("");
    }, 3000);
  };

  const shares = amount ? Number(amount) / pricePerShare : 0;

  // Deterministic mini trend for the market-cap tile (static-export safe)
  const rand = seededRandom(`invest-${agentName}`);
  const capTrend = Array.from({ length: 12 }, (_, i) => 0.7 + i * 0.025 + rand() * 0.15);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Invest in {agentName}
          </DialogTitle>
          <DialogDescription>
            Become a stakeholder in this AI agent&apos;s future success
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6 py-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="overflow-hidden rounded-lg border hairline bg-black/20 p-3 pb-0">
                  <div className="flex items-center gap-2 text-sm font-medium mb-1">
                    <TrendingUp className="h-4 w-4 text-gold" />
                    Market Cap
                  </div>
                  <div className="font-mono text-xl font-bold">
                    <GradientText>{marketCap.toLocaleString()} SOL</GradientText>
                  </div>
                  <SparklineChart
                    data={capTrend}
                    height={28}
                    className="-mx-3 mt-1 w-[calc(100%+1.5rem)]"
                  />
                </div>
                <div className="rounded-lg border hairline bg-black/20 p-3">
                  <div className="flex items-center gap-2 text-sm font-medium mb-1">
                    <Users className="h-4 w-4 text-violet" />
                    Available Shares
                  </div>
                  <div className="font-mono text-xl font-bold">
                    <GradientText variant="violet">
                      {availableShares.toLocaleString()}
                    </GradientText>
                  </div>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    @ {pricePerShare} SOL / share
                  </p>
                </div>
              </div>
              <Button variant="gradient" className="w-full" onClick={() => setStep(2)} disabled={isLoading}>
                Continue to Investment
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6 py-4"
            >
              <div className="space-y-2">
                <Label htmlFor="amount">Investment Amount (SOL)</Label>
                <div className="relative">
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount..."
                    value={amount}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setAmount(e.target.value)
                    }
                    className="pr-16"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">
                    SOL
                  </div>
                </div>
                {amount && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-muted-foreground"
                  >
                    You will receive approximately {shares.toFixed(2)} shares
                  </motion.p>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep(1)}
                  disabled={isLoading}
                >
                  Back
                </Button>
                <Button
                  variant="gradient"
                  className="flex-1"
                  onClick={handleInvest}
                  disabled={!amount || isLoading}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Sparkles className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    "Invest Now"
                  )}
                </Button>
              </div>
            </motion.div>
          )}

          {showSuccess && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="py-8 text-center space-y-4"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="mx-auto w-fit"
              >
                <Sparkles className="h-12 w-12 text-primary" />
              </motion.div>
              <h3 className="text-xl font-semibold">Investment Successful!</h3>
              <p className="text-sm text-muted-foreground">
                Welcome to the future of {agentName}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
