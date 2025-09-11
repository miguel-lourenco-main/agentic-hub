import nextDynamic from "next/dynamic";
import { Suspense } from "react";

const AnimatedResults = nextDynamic(() => import("@/components/agents/animated-results").then(m => m.AnimatedResults), { ssr: false, loading: () => null });
const CategoriesSection = nextDynamic(() => import("@/components/agents/categories-section").then(m => m.CategoriesSection), { ssr: false, loading: () => null });
const FeaturedByCategorySection = nextDynamic(() => import("@/components/agents/featured-by-category-section").then(m => m.FeaturedByCategorySection), { ssr: false, loading: () => null });
const AllAgentsGridSection = nextDynamic(() => import("@/components/agents/all-agents-grid-section").then(m => m.AllAgentsGridSection), { ssr: false, loading: () => null });

export default function AgentsPage() {
  // Avoid static gen bailout by not reading searchParams on the server
  // Query reading is handled on the client via GlobalSearchBar/HeaderSearchInline
  const query = "";
  return (
    <Suspense>
      <main className="container mx-auto py-6 px-4 pb-24">
        {/* Search Results (animated, code-split) */}
        <AnimatedResults query={query} />

        {/* Categories (code-split) */}
        <CategoriesSection />

        {/* Featured by Category (code-split) */}
        <FeaturedByCategorySection />

        {/* All Agents grid (code-split) */}
        <AllAgentsGridSection />
      </main>
    </Suspense>
  );
}