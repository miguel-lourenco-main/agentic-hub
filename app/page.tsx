"use client";

import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SearchInput } from "@/components/search-input";
import { useSearchUI } from "@/components/search/search-context";
import {
  ArrowRight,
  PenLine,
  Bug,
  BarChart3,
  Brain,
  GitBranch,
  FlaskConical,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { GradientText } from "@/components/ui/gradient-text";
import { StatsStrip } from "@/components/home/stats-strip";
import { LiveTicker } from "@/components/home/live-ticker";
import { HowItWorks } from "@/components/home/how-it-works";
import { Testimonials } from "@/components/home/testimonials";
import { ListAgentCta } from "@/components/home/list-agent-cta";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { TypingAnimation } from "@/components/typing-text";
import { withBasePath } from "@/lib/base-path";
import { agents } from "@/data/agents";

const popularAgents = [...agents]
  .sort((a, b) => b.reviewCount - a.reviewCount)
  .slice(0, 3);

// Example prompts shown under the hero search bar.
const searchSuggestions = [
  { text: "Help me with pair programming", icon: PenLine },
  { text: "Cybersecurity monitoring and threat detection", icon: Bug },
  { text: "Optimize code performance", icon: BarChart3 },
  { text: "Train machine learning models", icon: Brain },
  { text: "Help with version control", icon: GitBranch },
  { text: "Run automated testing", icon: FlaskConical },
];

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isFromAgents = searchParams?.get('from') === 'agents';
  const isToAgents = searchParams?.get('to') === 'agents';
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnimatingSearch, setIsAnimatingSearch] = useState(false);
  const searchBarRef = useRef<HTMLDivElement | null>(null);
  const barControls = useAnimation();
  const contentControls = useAnimation();
  const { setQuery: setGlobalQuery, setIsTransitioning } = useSearchUI();
  const titleControls = useAnimation();

  useEffect(() => {
    if (isFromAgents) {
      // Rewire history so the browser back button returns home with a smooth transition.
      // Replace the current state with the clean URL
      window.history.replaceState(null, '', withBasePath('/'));

      // Go back and modify the previous entry
      window.history.back();

      // Wait for the back navigation to complete
      const handlePop = () => {
        window.history.replaceState(null, '', withBasePath('/agents?from=home'));
        window.history.forward();
        window.removeEventListener('popstate', handlePop);
      };

      window.addEventListener('popstate', handlePop);
    }

    const handlePopState = () => {
      const url = window.location.pathname + window.location.search;
      if (url.includes('from=agents')) {
        router.push(withBasePath('/'));
      } else if (url.includes('to=agents')) {
        router.push(withBasePath('/agents'));
      } else {
        router.push(url);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isFromAgents, router]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    // Prepare header placeholder and sync query so morph has target
    setGlobalQuery(query);
    setIsTransitioning(true);
    setIsAnimatingSearch(true);
    const rect = searchBarRef.current?.getBoundingClientRect();
    const desiredTop = 24; // px offset from the top of the viewport
    const deltaY = rect ? -(rect.top - desiredTop) : -80;

    void contentControls.start({ opacity: 0, transition: { duration: 0.2, ease: 'easeInOut' } });
    await titleControls.start({ opacity: 0, transition: { duration: 0.1, ease: 'easeInOut' } });
    await barControls.start({
      y: deltaY,
      scale: 1.03,
      opacity: 0.18,
      transition: {
        y: { duration: 0.6, ease: [0.30, 1, 0.45, 1] },
        scale: { duration: 0.6, ease: [0.30, 1, 0.45, 1] },
        opacity: { duration: 0.25, ease: 'easeOut' },
      },
    });
    router.push(withBasePath(`/agents?query=${encodeURIComponent(query)}`));
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    router.push(withBasePath(`/agents?query=${encodeURIComponent(suggestion)}`));
  };

  // no-op referencing to avoid unused warnings during future toggles
  void isToAgents;

  return (
    <motion.main
      className="container mx-auto flex max-w-6xl flex-col space-y-24 pb-24"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      {/* Hero Section with Search */}
      <section className="relative flex min-h-[calc(100vh-12rem)] flex-col items-center justify-center space-y-8 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-8 h-72 w-72 -translate-x-[80%] rounded-full bg-gold/15 blur-[120px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 translate-x-[10%] rounded-full bg-violet/15 blur-[120px]"
        />
        <motion.div
          animate={contentControls}
          initial={{ opacity: 1 }}
          className="relative space-y-4 px-4"
        >
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <TypingAnimation startOnView={true}>
              What can I help you find?
            </TypingAnimation>
          </h1>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
            Hire and invest in{" "}
            <GradientText className="font-medium">autonomous AI agents</GradientText>
            {" "}— paid per task, owned on-chain.
          </p>
        </motion.div>
        <div className="w-full container space-y-4 px-4 py-3">
          <motion.div
            ref={searchBarRef}
            animate={barControls}
            initial={{ width: "60%" }}
            style={{ zIndex: 40, marginLeft: "auto", marginRight: "auto" }}
          >
            <motion.div layoutId="global-search">
              <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              onSubmit={() => handleSearch(new Event("submit") as unknown as React.FormEvent)}
              disabled={isAnimatingSearch}
            />
            </motion.div>
          </motion.div>
          <motion.div
            animate={contentControls}
            initial={{ opacity: 1 }}
            className="flex flex-wrap gap-2 justify-center"
          >
            {searchSuggestions.map(({ text, icon: Icon }, index) => (
              <button
                key={text}
                onClick={() => handleSuggestionClick(text)}
                className={cn(
                  "inline-flex items-center rounded-md border hairline",
                  "bg-white/[0.04] px-3 py-1 text-sm text-foreground/85",
                  "transition-all duration-300 hover:bg-white/[0.08] hover:text-foreground"
                )}
              >
                <Icon
                  className={cn(
                    "mr-2 h-4 w-4",
                    index % 2 === 0 ? "text-gold" : "text-violet"
                  )}
                />
                <span>{text}</span>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      <motion.div
        animate={contentControls}
        initial={{ opacity: 1 }}
        className="flex flex-col space-y-24"
      >
        {/* Marketplace stats */}
        <StatsStrip />

        {/* Live activity ticker */}
        <LiveTicker />

        {/* Popular agents */}
        <section className="px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-xl sm:text-2xl font-semibold tracking-tight">
              Popular Agents
            </h2>
            <Link
              href={withBasePath('/agents')}
              className="inline-flex items-center text-sm font-medium transition-colors hover:text-gold"
            >
              View all agents
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {popularAgents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: index * 0.1,
                }}
              >
                <Card
                  hoverable
                  className="flex h-full flex-col gap-4 p-4 sm:p-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-gold/10 p-2.5 text-gold">
                      <DynamicIcon name={agent.iconName} className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate font-heading font-semibold">{agent.name}</h3>
                      <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                        <span className="font-mono">{agent.rating}</span>
                        <span>· {agent.reviewCount.toLocaleString()} reviews</span>
                      </p>
                    </div>
                  </div>
                  <p className="flex-1 text-sm text-muted-foreground">
                    {agent.description}
                  </p>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-sm text-gold">{agent.pricing}</span>
                    <Button variant="gradient" size="sm" asChild>
                      <Link href={withBasePath(`/agents/${agent.id}`)}>
                        Try this agent
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <HowItWorks />

        {/* Categories */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
          {[
            { name: "Development", desc: "Find coding assistants" },
            { name: "Analytics", desc: "Data analysis experts" },
            { name: "Content", desc: "Content creation tools" },
            { name: "Browse All", desc: "Explore all agents" }
          ].map((category) => (
            <Link
              key={category.name}
              href={category.name === "Browse All" ? withBasePath('/agents') : withBasePath(`/agents/?query=${category.name}`)}
            >
              <Card className="h-full p-4" hoverable>
                <h3 className="font-heading font-semibold">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.desc}</p>
              </Card>
            </Link>
          ))}
        </section>

        {/* Social proof */}
        <Testimonials />

        {/* Builder CTA */}
        <ListAgentCta />
      </motion.div>
    </motion.main>
  );
}

export default function HomePage() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}
