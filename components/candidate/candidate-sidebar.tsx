import { Users, Home, LayoutDashboard, Layers, Heart, Settings } from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import LogOutButton from "../action-buttion/log-out-button";

// import LogoutButton from "../buttons/LogoutButton";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Candidate Dashboard",
    url: "/dashboard/candidate",
    icon: LayoutDashboard,
  },
  {
    title: "Applications",
    url: "/dashboard/candidate/applications",
    icon: Layers,
  },
  {
    title: "Save Jobs",
    url: "/dashboard/candidate/saved-jobs",
    icon: Heart,
  },
  {
    title: "Proile",
    url: "/dashboard/candidate/profile",
    icon: Users,
  },
  {
    title: "Settings",
    url: "/dashboard/candidate/settings",
    icon: Settings,
  },
];

export function CandidateDashboardSidebar() {
  return (
    <Sidebar side="left" collapsible="icon" variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-4">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <LogOutButton />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
