import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { withBasePath } from "@/lib/base-path";

type AppLogoProps = {
  className?: string;
  size?: number;
  showWordmark?: boolean;
};

export function AppLogo({ className, size = 28, showWordmark = false }: AppLogoProps) {
  return (
    <motion.div layoutId="app-logo" layout className={className}>
      <Link
        href={withBasePath("/")}
        aria-label="AgenticHub home"
        className="flex items-center gap-2.5"
      >
        <Image
          src={withBasePath("/images/app-logo.svg")}
          alt="AgenticHub"
          width={size}
          height={size}
          priority
        />
        {showWordmark && (
          <span className="font-heading text-base font-semibold tracking-tight">
            Agentic<span className="text-gradient-gold">Hub</span>
          </span>
        )}
      </Link>
    </motion.div>
  );
}
