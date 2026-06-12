import { MarketplaceStats } from "../lib/interfaces";
import { agents } from "./agents";

export const marketplaceStats: MarketplaceStats = {
  totalAgents: agents.length,
  solVolume: 128_400,
  requestsServed: 12_400_000,
  activeInvestors: 3_280,
};
