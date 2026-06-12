// Marketplace listing: billing, investment token, reviews, and embed metadata.
export interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  iconName: string;
  pricing: string;
  rating: number;
  reviewCount: number;
  billing: {
    rate: number;
    currency: string;
    model: string;
  };
  investment: {
    marketCap: number;
    availableShares: number;
    pricePerShare: number;
  };
  embedUrl: string;
  apiDocs: Record<string, unknown>;
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

// Agent performance snapshot with month-over-month percent change per metric.
export interface MetricsData {
  revenue: {
    total: number;
    change: number;
  };
  requests: {
    total: number;
    change: number;
  };
  activeUsers: {
    total: number;
    change: number;
  };
  avgResponseTime: {
    total: number;
    change: number;
  };
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userImage?: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface PricePoint {
  t: string;
  v: number;
}

// Synthetic hire/invest event for live ticker and per-agent activity feeds.
export interface ActivityEvent {
  id: string;
  type: "hire" | "invest";
  wallet: string;
  agentId: string;
  agentName: string;
  amountSol: number;
  timeAgo: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
}

export interface MarketplaceStats {
  totalAgents: number;
  solVolume: number;
  requestsServed: number;
  activeInvestors: number;
}

// OpenAPI-style endpoint entry rendered in the docs viewer and playground.
export interface ApiEndpoint {
  method: "GET" | "POST";
  path: string;
  description: string;
  sampleRequest?: string;
  sampleResponse: string;
}