"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, Bot } from "lucide-react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@workspace/ui/components/sidebar";
import { Agent } from "@/lib/interfaces";
import { agents as availableAgents } from "@/data/agents";

export function AgentsSidebar() {
  const [myAgents, setMyAgents] = useState<Agent[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);

  const addAgent = () => {
    const unselectedAgents = availableAgents.filter(
      (agent) => !myAgents.some((myAgent) => myAgent.id === agent.id)
    );
    if (unselectedAgents.length === 0) return;
    
    const randomAgent = unselectedAgents[Math.floor(Math.random() * unselectedAgents.length)]!;
    setMyAgents([...myAgents, randomAgent]);
  };

  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.scrollTop = menuRef.current.scrollHeight;
    }
  }, [myAgents]);

  return (
    <SidebarContent>
      <SidebarGroup>
        <div className="sticky top-0 bg-sidebar z-10 pb-2">
          <SidebarGroupLabel>My Agents</SidebarGroupLabel>
          <SidebarGroupAction onClick={addAgent}>
            <Plus />
          </SidebarGroupAction>
        </div>
        <SidebarGroupContent ref={menuRef} className="overflow-auto">
          {myAgents.length === 0 ? (
            <div className="px-2 py-4 text-center text-sm text-muted-foreground">
              <Bot className="mx-auto mb-2 h-8 w-8 opacity-50" />
              <p>No agents yet</p>
              <p className="text-xs">Click the + button to add your first agent</p>
            </div>
          ) : (
            <SidebarMenu>
              {myAgents.map((agent) => (
                <SidebarMenuItem key={agent.id}>
                  <SidebarMenuButton asChild>
                    <a href={`/agents/${agent.id}`}>
                      <Bot className="h-4 w-4" />
                      <span>{agent.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          )}
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
} 