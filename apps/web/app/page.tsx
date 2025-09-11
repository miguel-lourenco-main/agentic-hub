"use client";

import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SearchInput } from "@/components/search-input";
import { useSearchUI } from "@/components/search/search-context";
import {
  ArrowRight,
  Bot,
  PenLine,
  Bug,
  BarChart3,
  ShoppingBag,
  Megaphone,
  Languages,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { TypingAnimation } from "@/components/typing-text";

// Mock data for popular agents
const popularAgents = [
  {
    id: "1",
    name: "CodeAssist Pro",
    description: "Expert coding assistant with real-time pair programming capabilities",
    uses: 15420,
  },
  {
    id: "2",
    name: "DataAnalyst AI",
    description: "Advanced data analysis and visualization specialist",
    uses: 12350,
  },
  {
    id: "3",
    name: "ContentGenius",
    description: "Creative content generation and optimization",
    uses: 10890,
  },
];

const searchSuggestions = [
  {
    text: "Help me with pair programming",
    icon: PenLine,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10 hover:bg-purple-500/20",
  },
  {
    text: "Cybersecurity monitoring and threat detection",
    icon: Bug,
    color: "text-red-500",
    bgColor: "bg-red-500/10 hover:bg-red-500/20",
  },
  {
    text: "Optimize code performance",
    icon: BarChart3,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10 hover:bg-blue-500/20",
  },
  {
    text: "Train machine learning models",
    icon: ShoppingBag,
    color: "text-green-500",
    bgColor: "bg-green-500/10 hover:bg-green-500/20",
  },
  {
    text: "Help with version control",
    icon: Megaphone,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10 hover:bg-orange-500/20",
  },
  {
    text: "Run automated testing",
    icon: Languages,
    color: "text-sky-500",
    bgColor: "bg-sky-500/10 hover:bg-sky-500/20",
  },
];

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isFromAgents = searchParams.get('from') === 'agents';
  const isToAgents = searchParams.get('to') === 'agents';
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnimatingSearch, setIsAnimatingSearch] = useState(false);
  const searchBarRef = useRef<HTMLDivElement | null>(null);
  const barControls = useAnimation();
  const contentControls = useAnimation();
  const { setQuery: setGlobalQuery, setIsTransitioning } = useSearchUI();
  const titleControls = useAnimation();

  useEffect(() => {
    if (isFromAgents) {      
      // Replace the current state with the clean URL
      window.history.replaceState(null, '', '/');
      
      // Go back and modify the previous entry
      window.history.back();
      
      // Wait for the back navigation to complete
      const handlePop = () => {
        window.history.replaceState(null, '', '/agents?from=home');
        window.history.forward();
        window.removeEventListener('popstate', handlePop);
      };
      
      window.addEventListener('popstate', handlePop);
    }

    const handlePopState = () => {
      const url = window.location.pathname + window.location.search;
      if (url.includes('from=agents')) {
        router.push('/');
      } else if (url.includes('to=agents')) {
        router.push('/agents');
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
    router.push(`/agents?query=${encodeURIComponent(query)}`);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    router.push(`/agents?query=${encodeURIComponent(suggestion)}`);
  };

  // no-op referencing to avoid unused warnings during future toggles
  void isToAgents;

  return (
    <motion.main
      className="flex h-full flex-col justify-center container mx-auto max-w-5xl space-y-8 py-6"
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
      <section className="flex flex-col items-center text-center space-y-8 py-12">
        <motion.h1
          animate={contentControls}
          initial={{ opacity: 1 }}
          className="text-3xl sm:text-4xl font-bold tracking-tight lg:text-5xl px-4"
        >
          <TypingAnimation startOnView={true}>
            What can I help you find?
          </TypingAnimation>
        </motion.h1>
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
            {searchSuggestions.map(({ text, icon: Icon, color, bgColor }) => (
              <button
                key={text}
                onClick={() => handleSuggestionClick(text)}
                className={cn(
                  "inline-flex items-center rounded-md border border-transparent",
                  "px-3 py-1 text-sm transition-all duration-300",
                  "bg-muted/50 text-foreground/85",
                  "hover:bg-opacity-100 hover:text-foreground",
                  bgColor
                )}
              >
                <Icon className={cn("mr-2 h-4 w-4", color)} />
                <span>{text}</span>
              </button>
            ))}
          </motion.div>
        </div>
      </section>
      <motion.section className="mb-12 px-4" animate={contentControls} initial={{ opacity: 1 }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">Popular Agents</h2>
          <Link
            href="/agents"
            className="inline-flex items-center text-sm font-medium hover:underline"
          >
            View all agents
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {popularAgents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: index * 0.1,
              }}
            >
              <Card
                hoverable
                className="flex justify-between items-center lg:flex-col p-4 sm:p-6 lg:space-x-0 lg:space-y-4 space-y-0 space-x-4 hover:border-foreground/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Bot className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{agent.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {agent.uses.toLocaleString()} uses
                    </p>
                  </div>
                </div>
                <p className="flex-1 lg:flex-none text-sm text-center text-muted-foreground">
                  {agent.description}
                </p>
                <Link href={`/agents/${agent.id}`}>
                  <Button className="w-full">
                    <ArrowRight className="h-4 w-4 lg:hidden" />
                    <span className="hidden lg:inline">Try this agent</span>
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Categories */}
      <motion.section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4" animate={contentControls} initial={{ opacity: 1 }}>
        {[
          { name: "Development", desc: "Find coding assistants" },
          { name: "Analytics", desc: "Data analysis experts" },
          { name: "Content", desc: "Content creation tools" },
          { name: "Browse All", desc: "Explore all agents" }
        ].map((category) => (
          <Link
            key={category.name}
            href={category.name === "Browse All" ? "/agents" : "/agents/?query=" + category.name}
          >
            <Card className="h-full p-4 hover:border-foreground/50 transition-colors" hoverable>
              <h3 className="font-semibold">{category.name}</h3>
              <p className="text-sm text-muted-foreground">{category.desc}</p>
            </Card>
          </Link>
        ))}
      </motion.section>
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
