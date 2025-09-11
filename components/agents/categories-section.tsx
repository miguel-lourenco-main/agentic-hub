"use client";

import { AnimatedSection } from "@/components/agents/animated-section";
import { CategoryTag } from "@/components/agents/category-tag";
import { categories } from "@/data/categories";

export function CategoriesSection() {
  return (
    <AnimatedSection className="mb-16">
      <h2 className="text-2xl font-semibold tracking-tight mb-4">Categories</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category, index) => (
          <CategoryTag key={category.name} category={category} index={index} />
        ))}
      </div>
    </AnimatedSection>
  );
}


