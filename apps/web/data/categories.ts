import { agents } from "./agents";

export type Category = {
  name: string;
  count: number;
  description: string;
};

// Calculate counts from actual agents data
const getCategoryCount = (categoryName: string) => {
  return agents.filter(agent => agent.category === categoryName).length;
};

export const categories: Category[] = [
  { 
    name: "All Agents", 
    count: agents.length,
    description: "Browse all available AI agents"
  },
  { 
    name: "Development", 
    count: getCategoryCount("Development"),
    description: "Programming and software development assistants"
  },
  { 
    name: "Analytics", 
    count: getCategoryCount("Analytics"),
    description: "Data analysis and business intelligence"
  },
  { 
    name: "Content", 
    count: getCategoryCount("Content"),
    description: "Content creation and management"
  },
  { 
    name: "Customer Support", 
    count: getCategoryCount("Customer Support"),
    description: "Customer service and support automation"
  },
  { 
    name: "Research", 
    count: getCategoryCount("Research"),
    description: "Academic and scientific research assistance"
  },
]; 