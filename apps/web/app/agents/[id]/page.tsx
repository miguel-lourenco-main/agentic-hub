import { notFound } from "next/navigation";
import { Bot, Wallet, Sparkles } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReviewsSection } from "@/components/reviews/reviews-section";
import { StarRating } from "@/components/ui/star-rating";
import { Button } from "@/components/ui/button";
import { AgentMetrics } from "@/components/agent-metrics";
import { HireDialog } from "@/components/hire-dialog";
import { InvestDialog } from "@/components/invest-dialog";

interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  billing: {
    model: string; // e.g., "per unit", "per request", "per minute"
    rate: number; // e.g., 0.01
    currency: string; // e.g., "SOL"
    unit?: string; // Optional human-readable unit description
  };
  investment: {
    marketCap: number;
    availableShares: number;
    pricePerShare: number;
  };
  embedUrl: string;
  apiDocs: {
    openapi: string;
    info: {
      title: string;
      version: string;
    };
  };
  reviews: Array<{
    id: string;
    userId: string;
    userName: string;
    userImage?: string;
    rating: number;
    comment: string;
    createdAt: Date;
    updatedAt?: Date;
  }>;
  averageRating: number;
}

type Agents = Record<string, Agent>;

// Mock data - in real app, this would come from your backend
const agents: Agents = {
  "1": {
    id: "1",
    name: "CodeAssist Pro",
    description:
      "Expert coding assistant with real-time pair programming capabilities",
    category: "Development",
    billing: {
      model: "per unit",
      rate: 0.00001,
      currency: "SOL",
      unit: "output tokens", // Optional clarification of what a unit means for this agent
    },
    investment: {
      marketCap: 100000,
      availableShares: 10000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/agent-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "CodeAssist Pro API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "1",
        userId: "user1",
        userName: "Alice",
        rating: 5,
        comment:
          "Incredible coding assistant! Helped me solve complex problems quickly.",
        createdAt: new Date("2024-01-01"),
      },
      {
        id: "2",
        userId: "user2",
        userName: "Bob",
        rating: 4,
        comment:
          "Very helpful for pair programming. Could use more language support.",
        createdAt: new Date("2024-01-02"),
      },
    ],
    averageRating: 4.5,
  },
  "2": {
    id: "2",
    name: "DataAnalyst AI",
    description: "Advanced data analysis and visualization specialist",
    category: "Analytics",
    billing: {
      model: "per query",
      rate: 0.0002,
      currency: "SOL",
      unit: "query",
    },
    investment: {
      marketCap: 250000,
      availableShares: 25000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/data-analyst-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "DataAnalyst AI API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "3",
        userId: "user3",
        userName: "Charlie",
        rating: 5,
        comment: "Transformed our raw data into actionable insights. Amazing!",
        createdAt: new Date("2024-01-03"),
      },
    ],
    averageRating: 5.0,
  },
  "3": {
    id: "3",
    name: "ContentGenius",
    description: "Creative content generation and optimization",
    category: "Content",
    billing: {
      model: "per unit",
      rate: 0.00005,
      currency: "SOL",
      unit: "1k words",
    },
    investment: {
      marketCap: 150000,
      availableShares: 15000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/content-genius-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "ContentGenius API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "4",
        userId: "user4",
        userName: "Diana",
        rating: 4,
        comment:
          "Great for blog posts and social media content. Very creative!",
        createdAt: new Date("2024-01-04"),
      },
    ],
    averageRating: 4.0,
  },
  "4": {
    id: "4",
    name: "SupportBot Elite",
    description: "24/7 customer support automation with human-like interactions",
    category: "Customer Support",
    billing: {
      model: "per conversation",
      rate: 0.015,
      currency: "SOL",
      unit: "conversation",
    },
    investment: {
      marketCap: 180000,
      availableShares: 18000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/supportbot-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "SupportBot Elite API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "5",
        userId: "user5",
        userName: "Eva",
        rating: 5,
        comment: "Exceptional customer service automation. Very responsive!",
        createdAt: new Date("2024-01-05"),
      },
    ],
    averageRating: 4.6,
  },
  "5": {
    id: "5",
    name: "ResearchMind",
    description: "Advanced research assistant for academic and scientific work",
    category: "Research",
    billing: {
      model: "per paper",
      rate: 0.03,
      currency: "SOL",
      unit: "paper",
    },
    investment: {
      marketCap: 200000,
      availableShares: 20000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/researchmind-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "ResearchMind API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "6",
        userId: "user6",
        userName: "Frank",
        rating: 5,
        comment: "Invaluable for academic research. Saved me countless hours!",
        createdAt: new Date("2024-01-06"),
      },
    ],
    averageRating: 4.7,
  },
  "6": {
    id: "6",
    name: "SecurityGuard AI",
    description: "Cybersecurity monitoring and threat detection",
    category: "Development",
    billing: {
      model: "per scan",
      rate: 0.02,
      currency: "SOL",
      unit: "scan",
    },
    investment: {
      marketCap: 160000,
      availableShares: 16000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/securityguard-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "SecurityGuard AI API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "7",
        userId: "user7",
        userName: "George",
        rating: 4,
        comment: "Great security monitoring. Would love more customization options.",
        createdAt: new Date("2024-01-07"),
      },
    ],
    averageRating: 4.4,
  },
  "7": {
    id: "7",
    name: "PerformanceOptimizer",
    description: "Code and system performance analysis and optimization",
    category: "Development",
    billing: {
      model: "per analysis",
      rate: 0.025,
      currency: "SOL",
      unit: "analysis",
    },
    investment: {
      marketCap: 170000,
      availableShares: 17000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/performance-optimizer-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "PerformanceOptimizer API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "8",
        userId: "user8",
        userName: "Hannah",
        rating: 4,
        comment: "Significantly improved our application performance!",
        createdAt: new Date("2024-01-08"),
      },
    ],
    averageRating: 4.3,
  },
  "8": {
    id: "8",
    name: "MLEngineer",
    description: "Machine learning model development and training assistant",
    category: "Development",
    billing: {
      model: "per model",
      rate: 0.04,
      currency: "SOL",
      unit: "model",
    },
    investment: {
      marketCap: 220000,
      availableShares: 22000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/ml-engineer-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "MLEngineer API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "9",
        userId: "user9",
        userName: "Ian",
        rating: 5,
        comment: "Excellent ML model development assistance!",
        createdAt: new Date("2024-01-09"),
      },
    ],
    averageRating: 4.6,
  },
  "9": {
    id: "9",
    name: "DataArchitect",
    description: "Database design and optimization specialist",
    category: "Analytics",
    billing: {
      model: "per design",
      rate: 0.03,
      currency: "SOL",
      unit: "design",
    },
    investment: {
      marketCap: 180000,
      availableShares: 18000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/data-architect-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "DataArchitect API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "10",
        userId: "user10",
        userName: "Jack",
        rating: 4,
        comment: "Great database optimization suggestions!",
        createdAt: new Date("2024-01-10"),
      },
    ],
    averageRating: 4.5,
  },
  "10": {
    id: "10",
    name: "MetricsVision",
    description: "Business metrics and KPI analysis expert",
    category: "Analytics",
    billing: {
      model: "per report",
      rate: 0.02,
      currency: "SOL",
      unit: "report",
    },
    investment: {
      marketCap: 160000,
      availableShares: 16000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/metrics-vision-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "MetricsVision API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "11",
        userId: "user11",
        userName: "Karen",
        rating: 4,
        comment: "Insightful KPI analysis and reporting!",
        createdAt: new Date("2024-01-11"),
      },
    ],
    averageRating: 4.4,
  },
  "11": {
    id: "11",
    name: "CopywriterPro",
    description: "Professional copywriting and content strategy",
    category: "Content",
    billing: {
      model: "per unit",
      rate: 0.008,
      currency: "SOL",
      unit: "1k words",
    },
    investment: {
      marketCap: 140000,
      availableShares: 14000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/copywriter-pro-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "CopywriterPro API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "12",
        userId: "user12",
        userName: "Linda",
        rating: 4,
        comment: "Excellent copywriting assistance!",
        createdAt: new Date("2024-01-12"),
      },
    ],
    averageRating: 4.3,
  },
  "12": {
    id: "12",
    name: "SupportGenius",
    description: "Advanced ticket management and customer interaction",
    category: "Customer Support",
    billing: {
      model: "per ticket",
      rate: 0.012,
      currency: "SOL",
      unit: "ticket",
    },
    investment: {
      marketCap: 150000,
      availableShares: 15000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/support-genius-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "SupportGenius API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "13",
        userId: "user13",
        userName: "Mike",
        rating: 4,
        comment: "Great ticket management system!",
        createdAt: new Date("2024-01-13"),
      },
    ],
    averageRating: 4.4,
  },
  "d5": {
    id: "d5",
    name: "GitMaster",
    description: "Advanced version control and code collaboration assistant",
    category: "Development",
    billing: {
      model: "per repo",
      rate: 0.015,
      currency: "SOL",
      unit: "repo",
    },
    investment: {
      marketCap: 155000,
      availableShares: 15500,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/gitmaster-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "GitMaster API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "14",
        userId: "user14",
        userName: "Nancy",
        rating: 5,
        comment: "Makes Git collaboration so much easier!",
        createdAt: new Date("2024-01-14"),
      },
    ],
    averageRating: 4.7,
  },
  "d6": {
    id: "d6",
    name: "TestingPro",
    description: "Automated testing and quality assurance specialist",
    category: "Development",
    billing: {
      model: "per suite",
      rate: 0.03,
      currency: "SOL",
      unit: "test suite",
    },
    investment: {
      marketCap: 165000,
      availableShares: 16500,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/testingpro-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "TestingPro API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "15",
        userId: "user15",
        userName: "Oscar",
        rating: 4,
        comment: "Great test coverage and automation!",
        createdAt: new Date("2024-01-15"),
      },
    ],
    averageRating: 4.5,
  },
  "d7": {
    id: "d7",
    name: "DevOpsGenius",
    description: "CI/CD pipeline and infrastructure automation expert",
    category: "Development",
    billing: {
      model: "per pipeline",
      rate: 0.05,
      currency: "SOL",
      unit: "pipeline",
    },
    investment: {
      marketCap: 185000,
      availableShares: 18500,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/devopsgenius-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "DevOpsGenius API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "16",
        userId: "user16",
        userName: "Patricia",
        rating: 5,
        comment: "Revolutionized our deployment process!",
        createdAt: new Date("2024-01-16"),
      },
    ],
    averageRating: 4.8,
  },
  "d8": {
    id: "d8",
    name: "APIArchitect",
    description: "RESTful and GraphQL API design specialist",
    category: "Development",
    billing: {
      model: "per endpoint",
      rate: 0.035,
      currency: "SOL",
      unit: "endpoint",
    },
    investment: {
      marketCap: 175000,
      availableShares: 17500,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/apiarchitect-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "APIArchitect API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "17",
        userId: "user17",
        userName: "Quinn",
        rating: 5,
        comment: "Excellent API design recommendations!",
        createdAt: new Date("2024-01-17"),
      },
    ],
    averageRating: 4.6,
  },
  "d9": {
    id: "d9",
    name: "MobileWizard",
    description: "Cross-platform mobile app development assistant",
    category: "Development",
    billing: {
      model: "per screen",
      rate: 0.045,
      currency: "SOL",
      unit: "screen",
    },
    investment: {
      marketCap: 195000,
      availableShares: 19500,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/mobilewizard-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "MobileWizard API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "18",
        userId: "user18",
        userName: "Rachel",
        rating: 4,
        comment: "Great for cross-platform development!",
        createdAt: new Date("2024-01-18"),
      },
    ],
    averageRating: 4.4,
  },
  "a4": {
    id: "a4",
    name: "PredictiveInsight",
    description: "Predictive analytics and forecasting specialist",
    category: "Analytics",
    billing: {
      model: "per forecast",
      rate: 0.04,
      currency: "SOL",
      unit: "forecast",
    },
    investment: {
      marketCap: 190000,
      availableShares: 19000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/predictiveinsight-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "PredictiveInsight API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "19",
        userId: "user19",
        userName: "Sam",
        rating: 5,
        comment: "Incredibly accurate forecasting!",
        createdAt: new Date("2024-01-19"),
      },
    ],
    averageRating: 4.7,
  },
  "a5": {
    id: "a5",
    name: "DataCleaner",
    description: "Data cleaning and preprocessing automation",
    category: "Analytics",
    billing: {
      model: "per dataset",
      rate: 0.015,
      currency: "SOL",
      unit: "dataset",
    },
    investment: {
      marketCap: 145000,
      availableShares: 14500,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/datacleaner-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "DataCleaner API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "20",
        userId: "user20",
        userName: "Tom",
        rating: 4,
        comment: "Saves hours of data preprocessing time!",
        createdAt: new Date("2024-01-20"),
      },
    ],
    averageRating: 4.3,
  },
  "a6": {
    id: "a6",
    name: "MarketAnalyzer",
    description: "Market research and competitive analysis expert",
    category: "Analytics",
    billing: {
      model: "per analysis",
      rate: 0.035,
      currency: "SOL",
      unit: "analysis",
    },
    investment: {
      marketCap: 175000,
      availableShares: 17500,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/marketanalyzer-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "MarketAnalyzer API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "21",
        userId: "user21",
        userName: "Uma",
        rating: 5,
        comment: "Comprehensive market insights!",
        createdAt: new Date("2024-01-21"),
      },
    ],
    averageRating: 4.6,
  },
  "a7": {
    id: "a7",
    name: "RiskAssessor",
    description: "Risk analysis and mitigation planning specialist",
    category: "Analytics",
    billing: {
      model: "per assessment",
      rate: 0.045,
      currency: "SOL",
      unit: "assessment",
    },
    investment: {
      marketCap: 195000,
      availableShares: 19500,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/riskassessor-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "RiskAssessor API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "22",
        userId: "user22",
        userName: "Victor",
        rating: 5,
        comment: "Excellent risk assessment capabilities!",
        createdAt: new Date("2024-01-22"),
      },
    ],
    averageRating: 4.8,
  },
  "a8": {
    id: "a8",
    name: "BehaviorAnalyst",
    description: "User behavior and pattern analysis expert",
    category: "Analytics",
    billing: {
      model: "per analysis",
      rate: 0.025,
      currency: "SOL",
      unit: "analysis",
    },
    investment: {
      marketCap: 165000,
      availableShares: 16500,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/behavioranalyst-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "BehaviorAnalyst API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "23",
        userId: "user23",
        userName: "Wendy",
        rating: 4,
        comment: "Insightful user behavior analysis!",
        createdAt: new Date("2024-01-23"),
      },
    ],
    averageRating: 4.5,
  },
  "a9": {
    id: "a9",
    name: "ReportMaster",
    description: "Automated report generation and insights delivery",
    category: "Analytics",
    billing: {
      model: "per report",
      rate: 0.02,
      currency: "SOL",
      unit: "report",
    },
    investment: {
      marketCap: 155000,
      availableShares: 15500,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/reportmaster-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "ReportMaster API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "24",
        userId: "user24",
        userName: "Xavier",
        rating: 4,
        comment: "Great automated reporting system!",
        createdAt: new Date("2024-01-24"),
      },
    ],
    averageRating: 4.4,
  },
  "c3": {
    id: "c3",
    name: "SEOExpert",
    description: "Search engine optimization and content ranking",
    category: "Content",
    billing: {
      model: "per page",
      rate: 0.03,
      currency: "SOL",
      unit: "page",
    },
    investment: {
      marketCap: 170000,
      availableShares: 17000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/seoexpert-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "SEOExpert API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "25",
        userId: "user25",
        userName: "Yolanda",
        rating: 5,
        comment: "Significantly improved our search rankings!",
        createdAt: new Date("2024-01-25"),
      },
    ],
    averageRating: 4.6,
  },
  "c4": {
    id: "c4",
    name: "SocialMediaGuru",
    description: "Social media content creation and management",
    category: "Content",
    billing: {
      model: "per post",
      rate: 0.02,
      currency: "SOL",
      unit: "post",
    },
    investment: {
      marketCap: 160000,
      availableShares: 16000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/socialmediaguru-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "SocialMediaGuru API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "26",
        userId: "user26",
        userName: "Zack",
        rating: 4,
        comment: "Great social media content suggestions!",
        createdAt: new Date("2024-01-26"),
      },
    ],
    averageRating: 4.4,
  },
  "c5": {
    id: "c5",
    name: "VideoScriptor",
    description: "Video script writing and storyboarding",
    category: "Content",
    billing: {
      model: "per minute",
      rate: 0.04,
      currency: "SOL",
      unit: "minute",
    },
    investment: {
      marketCap: 180000,
      availableShares: 18000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/videoscriptor-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "VideoScriptor API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "27",
        userId: "user27",
        userName: "Adam",
        rating: 5,
        comment: "Excellent video script writing assistance!",
        createdAt: new Date("2024-01-27"),
      },
    ],
    averageRating: 4.7,
  },
  "c6": {
    id: "c6",
    name: "EmailCampaigner",
    description: "Email marketing content and automation",
    category: "Content",
    billing: {
      model: "per email",
      rate: 0.015,
      currency: "SOL",
      unit: "email",
    },
    investment: {
      marketCap: 150000,
      availableShares: 15000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/emailcampaigner-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "EmailCampaigner API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "28",
        userId: "user28",
        userName: "Beth",
        rating: 4,
        comment: "Great email campaign optimization!",
        createdAt: new Date("2024-01-28"),
      },
    ],
    averageRating: 4.5,
  },
  "c7": {
    id: "c7",
    name: "BlogMaster",
    description: "Blog content creation and management",
    category: "Content",
    billing: {
      model: "per article",
      rate: 0.01,
      currency: "SOL",
      unit: "article",
    },
    investment: {
      marketCap: 140000,
      availableShares: 14000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/blogmaster-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "BlogMaster API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "29",
        userId: "user29",
        userName: "Carl",
        rating: 4,
        comment: "Consistent high-quality blog content!",
        createdAt: new Date("2024-01-29"),
      },
    ],
    averageRating: 4.3,
  },
  "c8": {
    id: "c8",
    name: "LocalizationPro",
    description: "Content localization and translation",
    category: "Content",
    billing: {
      model: "per language",
      rate: 0.025,
      currency: "SOL",
      unit: "language",
    },
    investment: {
      marketCap: 165000,
      availableShares: 16500,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/localizationpro-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "LocalizationPro API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "30",
        userId: "user30",
        userName: "Diana",
        rating: 5,
        comment: "Excellent localization quality!",
        createdAt: new Date("2024-01-30"),
      },
    ],
    averageRating: 4.8,
  },
  "c9": {
    id: "c9",
    name: "ContentEditor",
    description: "Content editing and proofreading specialist",
    category: "Content",
    billing: {
      model: "per unit",
      rate: 0.007,
      currency: "SOL",
      unit: "1k words",
    },
    investment: {
      marketCap: 135000,
      availableShares: 13500,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/contenteditor-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "ContentEditor API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "31",
        userId: "user31",
        userName: "Edward",
        rating: 5,
        comment: "Thorough editing and proofreading!",
        createdAt: new Date("2024-01-31"),
      },
    ],
    averageRating: 4.6,
  },
  "cs3": {
    id: "cs3",
    name: "ChatMaster",
    description: "Real-time chat support and inquiry handling",
    category: "Customer Support",
    billing: {
      model: "per chat",
      rate: 0.01,
      currency: "SOL",
      unit: "chat",
    },
    investment: {
      marketCap: 145000,
      availableShares: 14500,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/chatmaster-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "ChatMaster API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "32",
        userId: "user32",
        userName: "Fiona",
        rating: 4,
        comment: "Efficient chat support handling!",
        createdAt: new Date("2024-02-01"),
      },
    ],
    averageRating: 4.5,
  },
  "cs4": {
    id: "cs4",
    name: "FeedbackAnalyzer",
    description: "Customer feedback analysis and sentiment tracking",
    category: "Customer Support",
    billing: {
      model: "per report",
      rate: 0.02,
      currency: "SOL",
      unit: "report",
    },
    investment: {
      marketCap: 160000,
      availableShares: 16000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/feedbackanalyzer-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "FeedbackAnalyzer API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "33",
        userId: "user33",
        userName: "George",
        rating: 5,
        comment: "Excellent sentiment analysis capabilities!",
        createdAt: new Date("2024-02-02"),
      },
    ],
    averageRating: 4.7,
  },
  "cs5": {
    id: "cs5",
    name: "KnowledgeBase",
    description: "Self-service support content management",
    category: "Customer Support",
    billing: {
      model: "per article",
      rate: 0.025,
      currency: "SOL",
      unit: "article",
    },
    investment: {
      marketCap: 165000,
      availableShares: 16500,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/knowledgebase-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "KnowledgeBase API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "34",
        userId: "user34",
        userName: "Helen",
        rating: 4,
        comment: "Great self-service content organization!",
        createdAt: new Date("2024-02-03"),
      },
    ],
    averageRating: 4.3,
  },
  "cs6": {
    id: "cs6",
    name: "TicketRouter",
    description: "Intelligent ticket routing and prioritization",
    category: "Customer Support",
    billing: {
      model: "per ticket",
      rate: 0.018,
      currency: "SOL",
      unit: "ticket",
    },
    investment: {
      marketCap: 155000,
      availableShares: 15500,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/ticketrouter-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "TicketRouter API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "35",
        userId: "user35",
        userName: "Ian",
        rating: 5,
        comment: "Efficient ticket routing system!",
        createdAt: new Date("2024-02-04"),
      },
    ],
    averageRating: 4.6,
  },
  "cs7": {
    id: "cs7",
    name: "SatisfactionPro",
    description: "Customer satisfaction monitoring and improvement",
    category: "Customer Support",
    billing: {
      model: "per survey",
      rate: 0.03,
      currency: "SOL",
      unit: "survey",
    },
    investment: {
      marketCap: 175000,
      availableShares: 17500,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/satisfactionpro-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "SatisfactionPro API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "36",
        userId: "user36",
        userName: "James",
        rating: 5,
        comment: "Great customer satisfaction insights!",
        createdAt: new Date("2024-02-05"),
      },
    ],
    averageRating: 4.8,
  },
  "cs8": {
    id: "cs8",
    name: "CrisisManager",
    description: "Emergency support and crisis management",
    category: "Customer Support",
    billing: {
      model: "per incident",
      rate: 0.05,
      currency: "SOL",
      unit: "incident",
    },
    investment: {
      marketCap: 200000,
      availableShares: 20000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/crisismanager-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "CrisisManager API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "37",
        userId: "user37",
        userName: "Kate",
        rating: 5,
        comment: "Excellent crisis management capabilities!",
        createdAt: new Date("2024-02-06"),
      },
    ],
    averageRating: 4.9,
  },
  "cs9": {
    id: "cs9",
    name: "MultilingualSupport",
    description: "Multi-language customer support specialist",
    category: "Customer Support",
    billing: {
      model: "per session",
      rate: 0.035,
      currency: "SOL",
      unit: "session",
    },
    investment: {
      marketCap: 180000,
      availableShares: 18000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/multilingualsupport-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "MultilingualSupport API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "38",
        userId: "user38",
        userName: "Luis",
        rating: 5,
        comment: "Great multilingual support capabilities!",
        createdAt: new Date("2024-02-07"),
      },
    ],
    averageRating: 4.7,
  },
  "r2": {
    id: "r2",
    name: "LitReviewer",
    description: "Literature review and citation analysis",
    category: "Research",
    billing: {
      model: "per review",
      rate: 0.025,
      currency: "SOL",
      unit: "review",
    },
    investment: {
      marketCap: 165000,
      availableShares: 16500,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/litreviewer-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "LitReviewer API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "39",
        userId: "user39",
        userName: "Mary",
        rating: 4,
        comment: "Thorough literature review assistance!",
        createdAt: new Date("2024-02-08"),
      },
    ],
    averageRating: 4.5,
  },
  "r3": {
    id: "r3",
    name: "DataMiner",
    description: "Research data collection and analysis",
    category: "Research",
    billing: {
      model: "per dataset",
      rate: 0.04,
      currency: "SOL",
      unit: "dataset",
    },
    investment: {
      marketCap: 185000,
      availableShares: 18500,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/dataminer-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "DataMiner API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "40",
        userId: "user40",
        userName: "Nick",
        rating: 5,
        comment: "Excellent data collection capabilities!",
        createdAt: new Date("2024-02-09"),
      },
    ],
    averageRating: 4.6,
  },
  "r4": {
    id: "r4",
    name: "HypothesisTester",
    description: "Statistical analysis and hypothesis testing",
    category: "Research",
    billing: {
      model: "per test",
      rate: 0.035,
      currency: "SOL",
      unit: "test",
    },
    investment: {
      marketCap: 175000,
      availableShares: 17500,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/hypothesistester-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "HypothesisTester API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "41",
        userId: "user41",
        userName: "Olivia",
        rating: 5,
        comment: "Great statistical analysis tools!",
        createdAt: new Date("2024-02-10"),
      },
    ],
    averageRating: 4.8,
  },
  "r5": {
    id: "r5",
    name: "PatentExplorer",
    description: "Patent research and innovation tracking",
    category: "Research",
    billing: {
      model: "per search",
      rate: 0.045,
      currency: "SOL",
      unit: "search",
    },
    investment: {
      marketCap: 190000,
      availableShares: 19000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/patentexplorer-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "PatentExplorer API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "42",
        userId: "user42",
        userName: "Paul",
        rating: 4,
        comment: "Comprehensive patent search capabilities!",
        createdAt: new Date("2024-02-11"),
      },
    ],
    averageRating: 4.4,
  },
  "r6": {
    id: "r6",
    name: "MarketResearcher",
    description: "Market trends and consumer behavior analysis",
    category: "Research",
    billing: {
      model: "per report",
      rate: 0.05,
      currency: "SOL",
      unit: "report",
    },
    investment: {
      marketCap: 195000,
      availableShares: 19500,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/marketresearcher-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "MarketResearcher API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "43",
        userId: "user43",
        userName: "Quinn",
        rating: 5,
        comment: "Excellent market research insights!",
        createdAt: new Date("2024-02-12"),
      },
    ],
    averageRating: 4.6,
  },
  "r7": {
    id: "r7",
    name: "SurveyMaster",
    description: "Survey design and response analysis",
    category: "Research",
    billing: {
      model: "per survey",
      rate: 0.02,
      currency: "SOL",
      unit: "survey",
    },
    investment: {
      marketCap: 155000,
      availableShares: 15500,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/surveymaster-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "SurveyMaster API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "44",
        userId: "user44",
        userName: "Rachel",
        rating: 4,
        comment: "Great survey design assistance!",
        createdAt: new Date("2024-02-13"),
      },
    ],
    averageRating: 4.3,
  },
  "r8": {
    id: "r8",
    name: "CompetitiveAnalyst",
    description: "Competitive research and market positioning",
    category: "Research",
    billing: {
      model: "per analysis",
      rate: 0.04,
      currency: "SOL",
      unit: "analysis",
    },
    investment: {
      marketCap: 185000,
      availableShares: 18500,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/competitiveanalyst-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "CompetitiveAnalyst API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "45",
        userId: "user45",
        userName: "Steve",
        rating: 5,
        comment: "Excellent competitive analysis tools!",
        createdAt: new Date("2024-02-14"),
      },
    ],
    averageRating: 4.7,
  },
  "r9": {
    id: "r9",
    name: "TrendSpotter",
    description: "Industry trend analysis and forecasting",
    category: "Research",
    billing: {
      model: "per report",
      rate: 0.03,
      currency: "SOL",
      unit: "report",
    },
    investment: {
      marketCap: 170000,
      availableShares: 17000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/trendspotter-ui",
    apiDocs: {
      openapi: "3.0.0",
      info: {
        title: "TrendSpotter API",
        version: "1.0.0",
      },
    },
    reviews: [
      {
        id: "46",
        userId: "user46",
        userName: "Tom",
        rating: 4,
        comment: "Great trend analysis capabilities!",
        createdAt: new Date("2024-02-15"),
      },
    ],
    averageRating: 4.5,
  }
};

// Generate static params for all agent IDs
export function generateStaticParams() {
  return Object.keys(agents).map((id) => ({
    id,
  }));
}

// Sample data - replace with real data from your API
const metricsData = {
  revenue: {
    total: 12500,
    change: 12.5,
  },
  requests: {
    total: 45678,
    change: 8.2,
  },
  activeUsers: {
    total: 892,
    change: 15.3,
  },
  avgResponseTime: {
    total: 245,
    change: -5.8,
  },
};

export default function AgentPage({ params }: { params: { id: string } }) {
  const agent = agents[params.id];

  if (!agent) {
    notFound();
  }

  return (
    <main className="container mx-auto p-6">
      {/* Agent Header */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <Bot className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{agent.name}</CardTitle>
                  <CardDescription>{agent.description}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <StarRating rating={agent.averageRating} readOnly />
                    <span className="text-sm font-medium">
                      {agent.averageRating.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {agent.reviews.length} review
                    {agent.reviews.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Category: {agent.category}</span>
              <span>
                Rate: {agent.billing.rate} {agent.billing.currency}{" "}
                {agent.billing.model}
              </span>
            </div>
            <div className="flex gap-2">
              <HireDialog agentName={agent.name} billing={agent.billing}>
                <Button size="lg">
                  <Wallet className="mr-2 h-4 w-4" />
                  Hire
                </Button>
              </HireDialog>
              <InvestDialog
                agentName={agent.name}
                marketCap={agent.investment.marketCap}
                availableShares={agent.investment.availableShares}
                pricePerShare={agent.investment.pricePerShare}
              >
                <Button size="lg" variant="secondary">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Invest
                </Button>
              </InvestDialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
        <AgentMetrics data={metricsData} />
      </section>

      {/* Main Content Tabs */}
      <Tabs defaultValue="interface" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="interface">Agent Interface</TabsTrigger>
          <TabsTrigger value="docs">API Documentation</TabsTrigger>
          <TabsTrigger value="playground">API Playground</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        {/* Agent Interface Tab */}
        <TabsContent value="interface" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Agent Interface</CardTitle>
              <CardDescription>
                Interact with the agent through its custom interface
              </CardDescription>
            </CardHeader>
            <CardContent className="min-h-[500px]">
              {/* Third-party UI will be embedded here */}
              <div className="rounded-lg border h-full w-full flex items-center justify-center text-muted-foreground">
                <iframe
                  src={agent.embedUrl}
                  className="w-full h-full min-h-[500px]"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                  title={`${agent.name} Interface`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Documentation Tab */}
        <TabsContent value="docs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
              <CardDescription>
                Explore the agent&apos;s API endpoints and integration options
              </CardDescription>
            </CardHeader>
            <CardContent className="min-h-[500px]">
              {/* OpenAPI documentation will be rendered here */}
              <pre className="p-4 rounded-lg bg-muted overflow-auto">
                {JSON.stringify(agent.apiDocs, null, 2)}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Playground Tab */}
        <TabsContent value="playground" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Playground</CardTitle>
              <CardDescription>
                Test the agent&apos;s API endpoints directly in your browser
              </CardDescription>
            </CardHeader>
            <CardContent className="min-h-[500px]">
              <div className="grid grid-cols-2 gap-4 h-full">
                {/* Request Panel */}
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Request</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <textarea
                        className="w-full h-[200px] p-2 text-sm font-mono bg-muted rounded-md"
                        placeholder="Enter your API request here..."
                      />
                    </CardContent>
                  </Card>
                </div>

                {/* Response Panel */}
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Response</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="w-full h-[200px] p-2 text-sm font-mono bg-muted rounded-md overflow-auto">
                        Response will appear here...
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reviews & Ratings</CardTitle>
              <CardDescription>
                See what others are saying about this agent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReviewsSection
                reviews={agent.reviews}
                averageRating={agent.averageRating}
                totalReviews={agent.reviews.length}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
