"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Brain,
  Code,
  MessageSquare,
  PenLine,
  Bug,
  BarChart3,
  ShoppingBag,
  Megaphone,
  Languages,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Mock data for AI agents
const featuredAgents = [
  {
    id: "1",
    name: "CodeAssist Pro",
    description:
      "Expert coding assistant with real-time pair programming capabilities",
    category: "Development",
    icon: Code,
    pricing: "0.01 SOL/min",
    rating: 4.5,
    reviewCount: 128,
  },
  {
    id: "2",
    name: "DataAnalyst AI",
    description: "Advanced data analysis and visualization specialist",
    category: "Analytics",
    icon: Brain,
    pricing: "0.02 SOL/query",
    rating: 4.8,
    reviewCount: 89,
  },
  {
    id: "3",
    name: "ContentGenius",
    description: "Creative content generation and optimization",
    category: "Content",
    icon: MessageSquare,
    pricing: "0.005 SOL/1k words",
    rating: 4.2,
    reviewCount: 156,
  },
];

const categories = [
  { name: "All Agents", count: 150 },
  { name: "Development", count: 45 },
  { name: "Analytics", count: 32 },
  { name: "Content", count: 28 },
  { name: "Customer Support", count: 25 },
  { name: "Research", count: 20 },
];

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
    text: "Write a blog post about AI",
    icon: PenLine,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10 hover:bg-purple-500/20",
  },
  {
    text: "Help me debug my React code",
    icon: Bug,
    color: "text-red-500",
    bgColor: "bg-red-500/10 hover:bg-red-500/20",
  },
  {
    text: "Analyze my website traffic data",
    icon: BarChart3,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10 hover:bg-blue-500/20",
  },
  {
    text: "Generate product descriptions",
    icon: ShoppingBag,
    color: "text-green-500",
    bgColor: "bg-green-500/10 hover:bg-green-500/20",
  },
  {
    text: "Create a marketing strategy",
    icon: Megaphone,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10 hover:bg-orange-500/20",
  },
  {
    text: "Translate my document",
    icon: Languages,
    color: "text-sky-500",
    bgColor: "bg-sky-500/10 hover:bg-sky-500/20",
  },
];

export default function Home() {
  return (
    <motion.main
      className="container mx-auto max-w-5xl py-6"
      initial={{ x: -100, opacity: 0 }}
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
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          What can I help you find?
        </h1>
        <div className="w-full max-w-3xl space-y-4">
          <div className="flex gap-2">
            <Input 
              placeholder="Describe the task you need help with..."
              className="h-12"
            />
            <Button size="lg">
              Search Agents
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {searchSuggestions.map(({ text, icon: Icon, color, bgColor }) => (
              <button
                key={text}
                className={cn(
                  "inline-flex items-center rounded-md border border-transparent",
                  "px-3 py-1 text-sm transition-all duration-300",
                  "bg-muted/50 text-muted-foreground",
                  "hover:bg-opacity-100 hover:text-foreground",
                  bgColor
                )}
              >
                <Icon className={cn("mr-2 h-4 w-4", color)} />
                <span>{text}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Agents */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">Popular Tasks</h2>
          <Link
            href="/agents"
            className="inline-flex items-center text-sm font-medium hover:underline"
          >
            View all agents
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popularAgents.map((agent) => (
            <Card
              key={agent.id}
              hoverable
              className="p-6 hover:border-foreground/50 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">{agent.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {agent.uses.toLocaleString()} uses
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {agent.description}
              </p>
              <Link href={`/agents/${agent.id}`}>
                <Button className="w-full">Try this agent</Button>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { name: "Development", desc: "Find coding assistants" },
          { name: "Analytics", desc: "Data analysis experts" },
          { name: "Content", desc: "Content creation tools" },
          { name: "Browse All", desc: "Explore all agents", href: "/agents" }
        ].map((category) => (
          <Link 
            key={category.name}
            href={category.href || `/agents/category/${category.name.toLowerCase()}`}
          >
            <Card className="p-4 hover:border-foreground/50 transition-colors" hoverable>
              <h3 className="font-semibold">{category.name}</h3>
              <p className="text-sm text-muted-foreground">{category.desc}</p>
            </Card>
          </Link>
        ))}
      </section>
    </motion.main>
  );
}
