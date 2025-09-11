"use client";

import { motion } from "framer-motion";
import type { Category } from "@/lib/types";

interface CategoryTagProps {
  category: Category;
  index: number;
}

export function CategoryTag({ category, index }: CategoryTagProps) {
  const handleCategoryClick = () => {
    const categoryId = category.name === "All Agents" 
      ? "all-agents" 
      : category.name.toLowerCase().replace(/\s+/g, "-");
    const element = document.getElementById(categoryId);
    if (element) {
      element.scrollIntoView({ 
        behavior: "smooth", 
        block: "start",
        inline: "nearest"
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <button
        onClick={handleCategoryClick}
        className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium hover:bg-muted/80 transition-colors cursor-pointer"
      >
        {category.name}
        <span className="ml-2 text-muted-foreground">
          ({category.count})
        </span>
      </button>
    </motion.div>
  );
} 