"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Category } from "@/lib/types";

interface CategoryTagProps {
  category: Category;
  index: number;
}

export function CategoryTag({ category, index }: CategoryTagProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link
        href={`/agents/category/${category.name.toLowerCase().replace(" ", "-")}`}
        className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium hover:bg-muted/80"
      >
        {category.name}
        <span className="ml-2 text-muted-foreground">
          ({category.count})
        </span>
      </Link>
    </motion.div>
  );
} 