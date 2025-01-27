"use client"

import { Bot } from "lucide-react"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  SidebarFooter,
} from "@workspace/ui/components/sidebar"
import { Logo } from "@/components/logo"
import { AgentsSidebar } from "./agents/agents-sidebar"
import { NavUser } from "./nav-user"

const user = {
  name: "User",
  email: "user@example.com",
  avatar: "/avatars/user.jpg"
};

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent className="gap-y-24">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/agents">
                <Bot className="h-4 w-4" />
                <span>Agents</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <AgentsSidebar />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
