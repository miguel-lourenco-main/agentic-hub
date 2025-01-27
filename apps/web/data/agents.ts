import { Agent } from "../lib/interfaces";

export const agents: Agent[] = [
  // Development Category
  {
    id: "1",
    name: "CodeAssist Pro",
    description: "Expert coding assistant with real-time pair programming capabilities",
    category: "Development",
    iconName: "code",
    pricing: "0.01 SOL/task",
    rating: 4.5,
    reviewCount: 128,
    billing: {
      rate: 0.01,
      currency: "SOL",
      model: "per minute",
    },
    investment: {
      marketCap: 1000000,
      availableShares: 100000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/codeassist-pro",
    apiDocs: {
      // API documentation for CodeAssist Pro
    },
    reviews: [
      {
        id: "1",
        userId: "u1",
        userName: "John Doe",
        rating: 4.5,
        comment: "Great coding assistant!",
        createdAt: new Date("2024-04-01"),
      },
    ],
    averageRating: 4.5,
  },
  {
    id: "6",
    name: "SecurityGuard AI",
    description: "Cybersecurity monitoring and threat detection",
    category: "Development",
    iconName: "shield-check",
    pricing: "0.02 SOL/task",
    rating: 4.4,
    reviewCount: 64,
    billing: {
      rate: 0.02,
      currency: "SOL",
      model: "per scan",
    },
    investment: {
      marketCap: 500000,
      availableShares: 50000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/securityguard-ai",
    apiDocs: {
      // API documentation for SecurityGuard AI
    },
    reviews: [
      {
        id: "2",
        userId: "u2",
        userName: "Jane Smith",
        rating: 4.4,
        comment: "Effective cybersecurity monitoring",
        createdAt: new Date("2024-04-02"),
      },
    ],
    averageRating: 4.4,
  },
  {
    id: "7",
    name: "PerformanceOptimizer",
    description: "Code and system performance analysis and optimization",
    category: "Development",
    iconName: "zap",
    pricing: "0.025 SOL/task",
    rating: 4.3,
    reviewCount: 82,
    billing: {
      rate: 0.025,
      currency: "SOL",
      model: "per analysis",
    },
    investment: {
      marketCap: 750000,
      availableShares: 75000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/performance-optimizer",
    apiDocs: {
      // API documentation for PerformanceOptimizer
    },
    reviews: [
      {
        id: "3",
        userId: "u3",
        userName: "Alice Johnson",
        rating: 4.3,
        comment: "Improved code performance",
        createdAt: new Date("2024-04-03"),
      },
    ],
    averageRating: 4.3,
  },
  {
    id: "8",
    name: "MLEngineer",
    description: "Machine learning model development and training assistant",
    category: "Development",
    iconName: "cpu",
    pricing: "0.04 SOL/task",
    rating: 4.6,
    reviewCount: 95,
    billing: {
      rate: 0.04,
      currency: "SOL",
      model: "per model",
    },
    investment: {
      marketCap: 1500000,
      availableShares: 150000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/ml-engineer",
    apiDocs: {
      // API documentation for MLEngineer
    },
    reviews: [
      {
        id: "4",
        userId: "u4",
        userName: "Bob Brown",
        rating: 4.6,
        comment: "Excellent machine learning model",
        createdAt: new Date("2024-04-04"),
      },
    ],
    averageRating: 4.6,
  },
  {
    id: "d5",
    name: "GitMaster",
    description: "Advanced version control and code collaboration assistant",
    category: "Development",
    iconName: "git-branch",
    pricing: "0.015 SOL/task",
    rating: 4.7,
    reviewCount: 103,
    billing: {
      rate: 0.015,
      currency: "SOL",
      model: "per repository",
    },
    investment: {
      marketCap: 800000,
      availableShares: 80000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/git-master",
    apiDocs: {
      // API documentation for GitMaster
    },
    reviews: [
      {
        id: "5",
        userId: "u5",
        userName: "Eve Wilson",
        rating: 4.7,
        comment: "Great version control system",
        createdAt: new Date("2024-04-05"),
      },
    ],
    averageRating: 4.7,
  },
  {
    id: "d6",
    name: "TestingPro",
    description: "Automated testing and quality assurance specialist",
    category: "Development",
    iconName: "check-circle",
    pricing: "0.03 SOL/task",
    rating: 4.5,
    reviewCount: 76,
    billing: {
      rate: 0.03,
      currency: "SOL",
      model: "per test suite",
    },
    investment: {
      marketCap: 600000,
      availableShares: 60000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/testing-pro",
    apiDocs: {
      // API documentation for TestingPro
    },
    reviews: [
      {
        id: "6",
        userId: "u6",
        userName: "Charlie Davis",
        rating: 4.5,
        comment: "Improved testing efficiency",
        createdAt: new Date("2024-04-06"),
      },
    ],
    averageRating: 4.5,
  },
  {
    id: "d7",
    name: "DevOpsGenius",
    description: "CI/CD pipeline and infrastructure automation expert",
    category: "Development",
    iconName: "settings",
    pricing: "0.05 SOL/task",
    rating: 4.8,
    reviewCount: 89,
    billing: {
      rate: 0.05,
      currency: "SOL",
      model: "per pipeline",
    },
    investment: {
      marketCap: 1200000,
      availableShares: 120000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/devops-genius",
    apiDocs: {
      // API documentation for DevOpsGenius
    },
    reviews: [
      {
        id: "7",
        userId: "u7",
        userName: "Grace Evans",
        rating: 4.8,
        comment: "Excellent CI/CD pipeline",
        createdAt: new Date("2024-04-07"),
      },
    ],
    averageRating: 4.8,
  },
  {
    id: "d8",
    name: "APIArchitect",
    description: "RESTful and GraphQL API design specialist",
    category: "Development",
    iconName: "network",
    pricing: "0.035 SOL/task",
    rating: 4.6,
    reviewCount: 92,
    billing: {
      rate: 0.035,
      currency: "SOL",
      model: "per API endpoint",
    },
    investment: {
      marketCap: 900000,
      availableShares: 90000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/api-architect",
    apiDocs: {
      // API documentation for APIArchitect
    },
    reviews: [
      {
        id: "8",
        userId: "u8",
        userName: "Frank Miller",
        rating: 4.6,
        comment: "Great API design",
        createdAt: new Date("2024-04-08"),
      },
    ],
    averageRating: 4.6,
  },
  {
    id: "d9",
    name: "MobileWizard",
    description: "Cross-platform mobile app development assistant",
    category: "Development",
    iconName: "smartphone",
    pricing: "0.045 SOL/task",
    rating: 4.4,
    reviewCount: 68,
    billing: {
      rate: 0.045,
      currency: "SOL",
      model: "per mobile screen",
    },
    investment: {
      marketCap: 1000000,
      availableShares: 100000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/mobile-wizard",
    apiDocs: {
      // API documentation for MobileWizard
    },
    reviews: [
      {
        id: "9",
        userId: "u9",
        userName: "Grace Evans",
        rating: 4.4,
        comment: "Great mobile app development",
        createdAt: new Date("2024-04-09"),
      },
    ],
    averageRating: 4.4,
  },

  // Analytics Category
  {
    id: "2",
    name: "DataAnalyst AI",
    description: "Advanced data analysis and visualization specialist",
    category: "Analytics",
    iconName: "brain",
    pricing: "0.02 SOL/task",
    rating: 4.8,
    reviewCount: 89,
    billing: {
      rate: 0.02,
      currency: "SOL",
      model: "per query",
    },
    investment: {
      marketCap: 1000000,
      availableShares: 100000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/data-analyst-ai",
    apiDocs: {
      // API documentation for DataAnalyst AI
    },
    reviews: [
      {
        id: "10",
        userId: "u10",
        userName: "Eve Wilson",
        rating: 4.8,
        comment: "Excellent data analysis",
        createdAt: new Date("2024-04-10"),
      },
    ],
    averageRating: 4.8,
  },
  {
    id: "9",
    name: "DataArchitect",
    description: "Database design and optimization specialist",
    category: "Analytics",
    iconName: "database",
    pricing: "0.03 SOL/task",
    rating: 4.5,
    reviewCount: 78,
    billing: {
      rate: 0.03,
      currency: "SOL",
      model: "per database design",
    },
    investment: {
      marketCap: 800000,
      availableShares: 80000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/data-architect",
    apiDocs: {
      // API documentation for DataArchitect
    },
    reviews: [
      {
        id: "11",
        userId: "u11",
        userName: "Charlie Davis",
        rating: 4.5,
        comment: "Great database design",
        createdAt: new Date("2024-04-11"),
      },
    ],
    averageRating: 4.5,
  },
  {
    id: "10",
    name: "MetricsVision",
    description: "Business metrics and KPI analysis expert",
    category: "Analytics",
    iconName: "line-chart",
    pricing: "0.02 SOL/task",
    rating: 4.4,
    reviewCount: 86,
    billing: {
      rate: 0.02,
      currency: "SOL",
      model: "per report",
    },
    investment: {
      marketCap: 700000,
      availableShares: 70000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/metrics-vision",
    apiDocs: {
      // API documentation for MetricsVision
    },
    reviews: [
      {
        id: "12",
        userId: "u12",
        userName: "Frank Miller",
        rating: 4.4,
        comment: "Great business metrics analysis",
        createdAt: new Date("2024-04-12"),
      },
    ],
    averageRating: 4.4,
  },
  {
    id: "a4",
    name: "PredictiveInsight",
    description: "Predictive analytics and forecasting specialist",
    category: "Analytics",
    iconName: "trending-up",
    pricing: "0.04 SOL/task",
    rating: 4.7,
    reviewCount: 94,
    billing: {
      rate: 0.04,
      currency: "SOL",
      model: "per forecast",
    },
    investment: {
      marketCap: 1200000,
      availableShares: 120000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/predictive-insight",
    apiDocs: {
      // API documentation for PredictiveInsight
    },
    reviews: [
      {
        id: "13",
        userId: "u13",
        userName: "Grace Evans",
        rating: 4.7,
        comment: "Excellent predictive analytics",
        createdAt: new Date("2024-04-13"),
      },
    ],
    averageRating: 4.7,
  },
  {
    id: "a5",
    name: "DataCleaner",
    description: "Data cleaning and preprocessing automation",
    category: "Analytics",
    iconName: "filter",
    pricing: "0.015 SOL/task",
    rating: 4.3,
    reviewCount: 71,
    billing: {
      rate: 0.015,
      currency: "SOL",
      model: "per dataset",
    },
    investment: {
      marketCap: 500000,
      availableShares: 50000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/data-cleaner",
    apiDocs: {
      // API documentation for DataCleaner
    },
    reviews: [
      {
        id: "14",
        userId: "u14",
        userName: "Eve Wilson",
        rating: 4.3,
        comment: "Great data cleaning automation",
        createdAt: new Date("2024-04-14"),
      },
    ],
    averageRating: 4.3,
  },
  {
    id: "a6",
    name: "MarketAnalyzer",
    description: "Market research and competitive analysis expert",
    category: "Analytics",
    iconName: "pie-chart",
    pricing: "0.035 SOL/task",
    rating: 4.6,
    reviewCount: 83,
    billing: {
      rate: 0.035,
      currency: "SOL",
      model: "per market analysis",
    },
    investment: {
      marketCap: 900000,
      availableShares: 90000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/market-analyzer",
    apiDocs: {
      // API documentation for MarketAnalyzer
    },
    reviews: [
      {
        id: "15",
        userId: "u15",
        userName: "Frank Miller",
        rating: 4.6,
        comment: "Great market research analysis",
        createdAt: new Date("2024-04-15"),
      },
    ],
    averageRating: 4.6,
  },
  {
    id: "a7",
    name: "RiskAssessor",
    description: "Risk analysis and mitigation planning specialist",
    category: "Analytics",
    iconName: "shield",
    pricing: "0.045 SOL/task",
    rating: 4.8,
    reviewCount: 67,
    billing: {
      rate: 0.045,
      currency: "SOL",
      model: "per risk assessment",
    },
    investment: {
      marketCap: 700000,
      availableShares: 70000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/risk-assessor",
    apiDocs: {
      // API documentation for RiskAssessor
    },
    reviews: [
      {
        id: "16",
        userId: "u16",
        userName: "Grace Evans",
        rating: 4.8,
        comment: "Excellent risk analysis",
        createdAt: new Date("2024-04-16"),
      },
    ],
    averageRating: 4.8,
  },
  {
    id: "a8",
    name: "BehaviorAnalyst",
    description: "User behavior and pattern analysis expert",
    category: "Analytics",
    iconName: "activity",
    pricing: "0.025 SOL/task",
    rating: 4.5,
    reviewCount: 88,
    billing: {
      rate: 0.025,
      currency: "SOL",
      model: "per behavior analysis",
    },
    investment: {
      marketCap: 600000,
      availableShares: 60000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/behavior-analyst",
    apiDocs: {
      // API documentation for BehaviorAnalyst
    },
    reviews: [
      {
        id: "17",
        userId: "u17",
        userName: "Frank Miller",
        rating: 4.5,
        comment: "Great user behavior analysis",
        createdAt: new Date("2024-04-17"),
      },
    ],
    averageRating: 4.5,
  },
  {
    id: "a9",
    name: "ReportMaster",
    description: "Automated report generation and insights delivery",
    category: "Analytics",
    iconName: "file-text",
    pricing: "0.02 SOL/task",
    rating: 4.4,
    reviewCount: 75,
    billing: {
      rate: 0.02,
      currency: "SOL",
      model: "per report",
    },
    investment: {
      marketCap: 500000,
      availableShares: 50000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/report-master",
    apiDocs: {
      // API documentation for ReportMaster
    },
    reviews: [
      {
        id: "18",
        userId: "u18",
        userName: "Grace Evans",
        rating: 4.4,
        comment: "Great report generation",
        createdAt: new Date("2024-04-18"),
      },
    ],
    averageRating: 4.4,
  },

  // Content Category
  {
    id: "3",
    name: "ContentGenius",
    description: "Creative content generation and optimization",
    category: "Content",
    iconName: "message-square",
    pricing: "0.005 SOL/task",
    rating: 4.2,
    reviewCount: 156,
    billing: {
      rate: 0.005,
      currency: "SOL",
      model: "per 1k words",
    },
    investment: {
      marketCap: 1000000,
      availableShares: 100000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/content-genius",
    apiDocs: {
      // API documentation for ContentGenius
    },
    reviews: [
      {
        id: "19",
        userId: "u19",
        userName: "Eve Wilson",
        rating: 4.2,
        comment: "Great content generation",
        createdAt: new Date("2024-04-19"),
      },
    ],
    averageRating: 4.2,
  },
  {
    id: "11",
    name: "CopywriterPro",
    description: "Professional copywriting and content strategy",
    category: "Content",
    iconName: "pen-line",
    pricing: "0.008 SOL/task",
    rating: 4.3,
    reviewCount: 112,
    billing: {
      rate: 0.008,
      currency: "SOL",
      model: "per 1k words",
    },
    investment: {
      marketCap: 800000,
      availableShares: 80000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/copywriter-pro",
    apiDocs: {
      // API documentation for CopywriterPro
    },
    reviews: [
      {
        id: "20",
        userId: "u20",
        userName: "Charlie Davis",
        rating: 4.3,
        comment: "Great copywriting",
        createdAt: new Date("2024-04-20"),
      },
    ],
    averageRating: 4.3,
  },
  {
    id: "c3",
    name: "SEOExpert",
    description: "Search engine optimization and content ranking",
    category: "Content",
    iconName: "search",
    pricing: "0.03 SOL/task",
    rating: 4.6,
    reviewCount: 98,
    billing: {
      rate: 0.03,
      currency: "SOL",
      model: "per page",
    },
    investment: {
      marketCap: 700000,
      availableShares: 70000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/seo-expert",
    apiDocs: {
      // API documentation for SEOExpert
    },
    reviews: [
      {
        id: "21",
        userId: "u21",
        userName: "Frank Miller",
        rating: 4.6,
        comment: "Great SEO optimization",
        createdAt: new Date("2024-04-21"),
      },
    ],
    averageRating: 4.6,
  },
  {
    id: "c4",
    name: "SocialMediaGuru",
    description: "Social media content creation and management",
    category: "Content",
    iconName: "share-2",
    pricing: "0.02 SOL/task",
    rating: 4.4,
    reviewCount: 134,
    billing: {
      rate: 0.02,
      currency: "SOL",
      model: "per post",
    },
    investment: {
      marketCap: 900000,
      availableShares: 90000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/social-media-guru",
    apiDocs: {
      // API documentation for SocialMediaGuru
    },
    reviews: [
      {
        id: "22",
        userId: "u22",
        userName: "Eve Wilson",
        rating: 4.4,
        comment: "Great social media content",
        createdAt: new Date("2024-04-22"),
      },
    ],
    averageRating: 4.4,
  },
  {
    id: "c5",
    name: "VideoScriptor",
    description: "Video script writing and storyboarding",
    category: "Content",
    iconName: "video",
    pricing: "0.04 SOL/task",
    rating: 4.7,
    reviewCount: 87,
    billing: {
      rate: 0.04,
      currency: "SOL",
      model: "per minute",
    },
    investment: {
      marketCap: 1000000,
      availableShares: 100000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/video-scriptor",
    apiDocs: {
      // API documentation for VideoScriptor
    },
    reviews: [
      {
        id: "23",
        userId: "u23",
        userName: "Grace Evans",
        rating: 4.7,
        comment: "Excellent video script writing",
        createdAt: new Date("2024-04-23"),
      },
    ],
    averageRating: 4.7,
  },
  {
    id: "c6",
    name: "EmailCampaigner",
    description: "Email marketing content and automation",
    category: "Content",
    iconName: "mail",
    pricing: "0.015 SOL/task",
    rating: 4.5,
    reviewCount: 92,
    billing: {
      rate: 0.015,
      currency: "SOL",
      model: "per email",
    },
    investment: {
      marketCap: 800000,
      availableShares: 80000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/email-campaigner",
    apiDocs: {
      // API documentation for EmailCampaigner
    },
    reviews: [
      {
        id: "24",
        userId: "u24",
        userName: "Charlie Davis",
        rating: 4.5,
        comment: "Great email marketing automation",
        createdAt: new Date("2024-04-24"),
      },
    ],
    averageRating: 4.5,
  },
  {
    id: "c7",
    name: "BlogMaster",
    description: "Blog content creation and management",
    category: "Content",
    iconName: "book-open",
    pricing: "0.01 SOL/task",
    rating: 4.3,
    reviewCount: 145,
    billing: {
      rate: 0.01,
      currency: "SOL",
      model: "per article",
    },
    investment: {
      marketCap: 600000,
      availableShares: 60000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/blog-master",
    apiDocs: {
      // API documentation for BlogMaster
    },
    reviews: [
      {
        id: "25",
        userId: "u25",
        userName: "Eve Wilson",
        rating: 4.3,
        comment: "Great blog content",
        createdAt: new Date("2024-04-25"),
      },
    ],
    averageRating: 4.3,
  },
  {
    id: "c8",
    name: "LocalizationPro",
    description: "Content localization and translation",
    category: "Content",
    iconName: "globe",
    pricing: "0.025 SOL/task",
    rating: 4.8,
    reviewCount: 76,
    billing: {
      rate: 0.025,
      currency: "SOL",
      model: "per language",
    },
    investment: {
      marketCap: 700000,
      availableShares: 70000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/localization-pro",
    apiDocs: {
      // API documentation for LocalizationPro
    },
    reviews: [
      {
        id: "26",
        userId: "u26",
        userName: "Frank Miller",
        rating: 4.8,
        comment: "Great content localization",
        createdAt: new Date("2024-04-26"),
      },
    ],
    averageRating: 4.8,
  },
  {
    id: "c9",
    name: "ContentEditor",
    description: "Content editing and proofreading specialist",
    category: "Content",
    iconName: "edit",
    pricing: "0.007 SOL/task",
    rating: 4.6,
    reviewCount: 108,
    billing: {
      rate: 0.007,
      currency: "SOL",
      model: "per 1k words",
    },
    investment: {
      marketCap: 500000,
      availableShares: 50000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/content-editor",
    apiDocs: {
      // API documentation for ContentEditor
    },
    reviews: [
      {
        id: "27",
        userId: "u27",
        userName: "Grace Evans",
        rating: 4.6,
        comment: "Great content editing",
        createdAt: new Date("2024-04-27"),
      },
    ],
    averageRating: 4.6,
  },

  // Customer Support Category
  {
    id: "4",
    name: "SupportBot Elite",
    description: "24/7 customer support automation with human-like interactions",
    category: "Customer Support",
    iconName: "headphones",
    pricing: "0.015 SOL/task",
    rating: 4.6,
    reviewCount: 92,
    billing: {
      rate: 0.015,
      currency: "SOL",
      model: "per conversation",
    },
    investment: {
      marketCap: 1000000,
      availableShares: 100000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/support-bot-elite",
    apiDocs: {
      // API documentation for SupportBot Elite
    },
    reviews: [
      {
        id: "28",
        userId: "u28",
        userName: "Eve Wilson",
        rating: 4.6,
        comment: "Great customer support automation",
        createdAt: new Date("2024-04-28"),
      },
    ],
    averageRating: 4.6,
  },
  {
    id: "12",
    name: "SupportGenius",
    description: "Advanced ticket management and customer interaction",
    category: "Customer Support",
    iconName: "headphones",
    pricing: "0.012 SOL/task",
    rating: 4.4,
    reviewCount: 68,
    billing: {
      rate: 0.012,
      currency: "SOL",
      model: "per ticket",
    },
    investment: {
      marketCap: 500000,
      availableShares: 50000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/support-genius",
    apiDocs: {
      // API documentation for SupportGenius
    },
    reviews: [
      {
        id: "29",
        userId: "u29",
        userName: "Charlie Davis",
        rating: 4.4,
        comment: "Great ticket management",
        createdAt: new Date("2024-04-29"),
      },
    ],
    averageRating: 4.4,
  },
  {
    id: "cs3",
    name: "ChatMaster",
    description: "Real-time chat support and inquiry handling",
    category: "Customer Support",
    iconName: "message-circle",
    pricing: "0.01 SOL/task",
    rating: 4.5,
    reviewCount: 123,
    billing: {
      rate: 0.01,
      currency: "SOL",
      model: "per chat",
    },
    investment: {
      marketCap: 800000,
      availableShares: 80000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/chat-master",
    apiDocs: {
      // API documentation for ChatMaster
    },
    reviews: [
      {
        id: "30",
        userId: "u30",
        userName: "Frank Miller",
        rating: 4.5,
        comment: "Great chat support",
        createdAt: new Date("2024-04-30"),
      },
    ],
    averageRating: 4.5,
  },
  {
    id: "cs4",
    name: "FeedbackAnalyzer",
    description: "Customer feedback analysis and sentiment tracking",
    category: "Customer Support",
    iconName: "bar-chart",
    pricing: "0.02 SOL/task",
    rating: 4.7,
    reviewCount: 85,
    billing: {
      rate: 0.02,
      currency: "SOL",
      model: "per report",
    },
    investment: {
      marketCap: 600000,
      availableShares: 60000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/feedback-analyzer",
    apiDocs: {
      // API documentation for FeedbackAnalyzer
    },
    reviews: [
      {
        id: "31",
        userId: "u31",
        userName: "Grace Evans",
        rating: 4.7,
        comment: "Great customer feedback analysis",
        createdAt: new Date("2024-05-01"),
      },
    ],
    averageRating: 4.7,
  },
  {
    id: "cs5",
    name: "KnowledgeBase",
    description: "Self-service support content management",
    category: "Customer Support",
    iconName: "book",
    pricing: "0.025 SOL/task",
    rating: 4.3,
    reviewCount: 94,
    billing: {
      rate: 0.025,
      currency: "SOL",
      model: "per article",
    },
    investment: {
      marketCap: 500000,
      availableShares: 50000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/knowledge-base",
    apiDocs: {
      // API documentation for KnowledgeBase
    },
    reviews: [
      {
        id: "32",
        userId: "u32",
        userName: "Eve Wilson",
        rating: 4.3,
        comment: "Great self-service support",
        createdAt: new Date("2024-05-02"),
      },
    ],
    averageRating: 4.3,
  },
  {
    id: "cs6",
    name: "TicketRouter",
    description: "Intelligent ticket routing and prioritization",
    category: "Customer Support",
    iconName: "git-merge",
    pricing: "0.018 SOL/task",
    rating: 4.6,
    reviewCount: 77,
    billing: {
      rate: 0.018,
      currency: "SOL",
      model: "per ticket",
    },
    investment: {
      marketCap: 400000,
      availableShares: 40000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/ticket-router",
    apiDocs: {
      // API documentation for TicketRouter
    },
    reviews: [
      {
        id: "33",
        userId: "u33",
        userName: "Grace Evans",
        rating: 4.6,
        comment: "Great ticket routing",
        createdAt: new Date("2024-05-03"),
      },
    ],
    averageRating: 4.6,
  },
  {
    id: "cs7",
    name: "SatisfactionPro",
    description: "Customer satisfaction monitoring and improvement",
    category: "Customer Support",
    iconName: "smile",
    pricing: "0.03 SOL/task",
    rating: 4.8,
    reviewCount: 88,
    billing: {
      rate: 0.03,
      currency: "SOL",
      model: "per survey",
    },
    investment: {
      marketCap: 700000,
      availableShares: 70000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/satisfaction-pro",
    apiDocs: {
      // API documentation for SatisfactionPro
    },
    reviews: [
      {
        id: "34",
        userId: "u34",
        userName: "Frank Miller",
        rating: 4.8,
        comment: "Great customer satisfaction monitoring",
        createdAt: new Date("2024-05-04"),
      },
    ],
    averageRating: 4.8,
  },
  {
    id: "cs8",
    name: "CrisisManager",
    description: "Emergency support and crisis management",
    category: "Customer Support",
    iconName: "alert-triangle",
    pricing: "0.05 SOL/task",
    rating: 4.9,
    reviewCount: 64,
    billing: {
      rate: 0.05,
      currency: "SOL",
      model: "per incident",
    },
    investment: {
      marketCap: 500000,
      availableShares: 50000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/crisis-manager",
    apiDocs: {
      // API documentation for CrisisManager
    },
    reviews: [
      {
        id: "35",
        userId: "u35",
        userName: "Eve Wilson",
        rating: 4.9,
        comment: "Great emergency support",
        createdAt: new Date("2024-05-05"),
      },
    ],
    averageRating: 4.9,
  },
  {
    id: "cs9",
    name: "MultilingualSupport",
    description: "Multi-language customer support specialist",
    category: "Customer Support",
    iconName: "languages",
    pricing: "0.035 SOL/task",
    rating: 4.7,
    reviewCount: 91,
    billing: {
      rate: 0.035,
      currency: "SOL",
      model: "per session",
    },
    investment: {
      marketCap: 600000,
      availableShares: 60000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/multilingual-support",
    apiDocs: {
      // API documentation for MultilingualSupport
    },
    reviews: [
      {
        id: "36",
        userId: "u36",
        userName: "Grace Evans",
        rating: 4.7,
        comment: "Great multi-language support",
        createdAt: new Date("2024-05-06"),
      },
    ],
    averageRating: 4.7,
  },

  // Research Category
  {
    id: "5",
    name: "ResearchMind",
    description: "Advanced research assistant for academic and scientific work",
    category: "Research",
    iconName: "microscope",
    pricing: "0.03 SOL/task",
    rating: 4.7,
    reviewCount: 73,
    billing: {
      rate: 0.03,
      currency: "SOL",
      model: "per paper",
    },
    investment: {
      marketCap: 1000000,
      availableShares: 100000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/research-mind",
    apiDocs: {
      // API documentation for ResearchMind
    },
    reviews: [
      {
        id: "37",
        userId: "u37",
        userName: "Eve Wilson",
        rating: 4.7,
        comment: "Great research assistant",
        createdAt: new Date("2024-05-07"),
      },
    ],
    averageRating: 4.7,
  },
  {
    id: "r2",
    name: "LitReviewer",
    description: "Literature review and citation analysis",
    category: "Research",
    iconName: "book",
    pricing: "0.025 SOL/task",
    rating: 4.5,
    reviewCount: 86,
    billing: {
      rate: 0.025,
      currency: "SOL",
      model: "per review",
    },
    investment: {
      marketCap: 500000,
      availableShares: 50000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/lit-reviewer",
    apiDocs: {
      // API documentation for LitReviewer
    },
    reviews: [
      {
        id: "38",
        userId: "u38",
        userName: "Charlie Davis",
        rating: 4.5,
        comment: "Great literature review",
        createdAt: new Date("2024-05-08"),
      },
    ],
    averageRating: 4.5,
  },
  {
    id: "r3",
    name: "DataMiner",
    description: "Research data collection and analysis",
    category: "Research",
    iconName: "database",
    pricing: "0.04 SOL/task",
    rating: 4.6,
    reviewCount: 92,
    billing: {
      rate: 0.04,
      currency: "SOL",
      model: "per dataset",
    },
    investment: {
      marketCap: 800000,
      availableShares: 80000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/data-miner",
    apiDocs: {
      // API documentation for DataMiner
    },
    reviews: [
      {
        id: "39",
        userId: "u39",
        userName: "Frank Miller",
        rating: 4.6,
        comment: "Great research data collection",
        createdAt: new Date("2024-05-09"),
      },
    ],
    averageRating: 4.6,
  },
  {
    id: "r4",
    name: "HypothesisTester",
    description: "Statistical analysis and hypothesis testing",
    category: "Research",
    iconName: "percent",
    pricing: "0.035 SOL/task",
    rating: 4.8,
    reviewCount: 78,
    billing: {
      rate: 0.035,
      currency: "SOL",
      model: "per test",
    },
    investment: {
      marketCap: 600000,
      availableShares: 60000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/hypothesis-tester",
    apiDocs: {
      // API documentation for HypothesisTester
    },
    reviews: [
      {
        id: "40",
        userId: "u40",
        userName: "Grace Evans",
        rating: 4.8,
        comment: "Great statistical analysis",
        createdAt: new Date("2024-05-10"),
      },
    ],
    averageRating: 4.8,
  },
  {
    id: "r5",
    name: "PatentExplorer",
    description: "Patent research and innovation tracking",
    category: "Research",
    iconName: "search",
    pricing: "0.045 SOL/task",
    rating: 4.4,
    reviewCount: 65,
    billing: {
      rate: 0.045,
      currency: "SOL",
      model: "per search",
    },
    investment: {
      marketCap: 700000,
      availableShares: 70000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/patent-explorer",
    apiDocs: {
      // API documentation for PatentExplorer
    },
    reviews: [
      {
        id: "41",
        userId: "u41",
        userName: "Eve Wilson",
        rating: 4.4,
        comment: "Great patent research",
        createdAt: new Date("2024-05-11"),
      },
    ],
    averageRating: 4.4,
  },
  {
    id: "r6",
    name: "MarketResearcher",
    description: "Market trends and consumer behavior analysis",
    category: "Research",
    iconName: "trending-up",
    pricing: "0.05 SOL/task",
    rating: 4.6,
    reviewCount: 89,
    billing: {
      rate: 0.05,
      currency: "SOL",
      model: "per report",
    },
    investment: {
      marketCap: 900000,
      availableShares: 90000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/market-researcher",
    apiDocs: {
      // API documentation for MarketResearcher
    },
    reviews: [
      {
        id: "42",
        userId: "u42",
        userName: "Frank Miller",
        rating: 4.6,
        comment: "Great market research",
        createdAt: new Date("2024-05-12"),
      },
    ],
    averageRating: 4.6,
  },
  {
    id: "r7",
    name: "SurveyMaster",
    description: "Survey design and response analysis",
    category: "Research",
    iconName: "clipboard",
    pricing: "0.02 SOL/task",
    rating: 4.3,
    reviewCount: 94,
    billing: {
      rate: 0.02,
      currency: "SOL",
      model: "per survey",
    },
    investment: {
      marketCap: 500000,
      availableShares: 50000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/survey-master",
    apiDocs: {
      // API documentation for SurveyMaster
    },
    reviews: [
      {
        id: "43",
        userId: "u43",
        userName: "Grace Evans",
        rating: 4.3,
        comment: "Great survey design",
        createdAt: new Date("2024-05-13"),
      },
    ],
    averageRating: 4.3,
  },
  {
    id: "r8",
    name: "CompetitiveAnalyst",
    description: "Competitive research and market positioning",
    category: "Research",
    iconName: "target",
    pricing: "0.04 SOL/task",
    rating: 4.7,
    reviewCount: 71,
    billing: {
      rate: 0.04,
      currency: "SOL",
      model: "per analysis",
    },
    investment: {
      marketCap: 800000,
      availableShares: 80000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/competitive-analyst",
    apiDocs: {
      // API documentation for CompetitiveAnalyst
    },
    reviews: [
      {
        id: "44",
        userId: "u44",
        userName: "Frank Miller",
        rating: 4.7,
        comment: "Great competitive research",
        createdAt: new Date("2024-05-14"),
      },
    ],
    averageRating: 4.7,
  },
  {
    id: "r9",
    name: "TrendSpotter",
    description: "Industry trend analysis and forecasting",
    category: "Research",
    iconName: "eye",
    pricing: "0.03 SOL/task",
    rating: 4.5,
    reviewCount: 83,
    billing: {
      rate: 0.03,
      currency: "SOL",
      model: "per report",
    },
    investment: {
      marketCap: 700000,
      availableShares: 70000,
      pricePerShare: 10,
    },
    embedUrl: "https://example.com/trend-spotter",
    apiDocs: {
      // API documentation for TrendSpotter
    },
    reviews: [
      {
        id: "45",
        userId: "u45",
        userName: "Grace Evans",
        rating: 4.5,
        comment: "Great industry trend analysis",
        createdAt: new Date("2024-05-15"),
      },
    ],
    averageRating: 4.5,
  },
]; 