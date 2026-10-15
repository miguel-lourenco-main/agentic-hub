"use client";

import { motion } from "framer-motion";
import { categoryAccentColor, categoryAccentTriple } from "@/lib/category-theme";
import type { Category } from "@/lib/types";
import { cn } from "@/lib/utils";

interface CategoryTagProps {
  category: Category;
  index: number;
  active: boolean;
  onClick: () => void;
}

export function CategoryTag({ category, index, active, onClick }: CategoryTagProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <button
        type="button"
        aria-pressed={active}
        onClick={onClick}
        style={{ ["--accent" as string]: categoryAccentTriple(category.name) }}
        className={cn(
          "group inline-flex items-center rounded-full border hairline px-3.5 py-1 text-sm font-medium transition-colors hover:border-[rgb(var(--accent)/0.5)] hover:text-[rgb(var(--accent))] cursor-pointer",
          active
            ? "border-[rgb(var(--accent)/0.6)] bg-[rgb(var(--accent)/0.1)] text-[rgb(var(--accent))]"
            : "bg-white/[0.04]"
        )}
      >
        {/* accent dot keeps each category visually distinct in the index row */}
        <span
          aria-hidden
          className="mr-2 h-1.5 w-1.5 rounded-full transition-transform group-hover:scale-125"
          style={{ backgroundColor: categoryAccentColor(category.name) }}
        />
        {category.name}
        <span className="ml-2 font-mono text-xs text-muted-foreground">
          {category.count}
        </span>
      </button>
    </motion.div>
  );
}
