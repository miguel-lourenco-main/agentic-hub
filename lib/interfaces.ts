// Shared marketplace domain types. Demo data in data/ conforms to these;
// keep fields in sync when extending agent metadata, billing, or activity.

/** Listed AI agent: service metadata, pricing, investment, embed + OpenAPI. */
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
  /** Sandboxed UI URL embedded on the agent detail page. */
  embedUrl: string;
  /** OpenAPI-shaped docs blob surfaced in ApiDocsViewer. */
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

/** KPI tiles on the agent detail metrics strip (totals + period deltas). */
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

/** Time-series sample for price / sparkline charts (`t` label, `v` value). */
export interface PricePoint {
  t: string;
  v: number;
}

/** Recent hire/invest event shown in live feeds and the market tape. */
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

export interface ApiEndpoint {
  method: "GET" | "POST";
  path: string;
  description: string;
  sampleRequest?: string;
  sampleResponse: string;
}