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