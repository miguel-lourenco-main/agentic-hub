import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { withBasePath } from "@/lib/base-path";

type AppLogoProps = {
  className?: string;
  size?: number;
};

export function AppLogo({ className, size = 28 }: AppLogoProps) {
  return (
    <motion.div layoutId="app-logo" layout className={className}>
      <Link href={withBasePath("/")} aria-label="Agentic Hub home">
        <Image src={withBasePath("/images/app-logo.svg")} alt="Agentic Hub" width={size} height={size} priority />
      </Link>
    </motion.div>
  );
}