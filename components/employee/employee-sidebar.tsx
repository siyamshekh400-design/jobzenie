import { Users, Home, LayoutDashboard, Layers, Heart, CirclePlus, Settings } from "lucide-react";
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
    title: "Employee Dashboard",
    url: "/dashboard/employee",
    icon: LayoutDashboard,
  },
  {
    title: "Job Posts",
    url: "/dashboard/employee/jobs",
    icon: Layers,
  },
  {
    title: "Post Job",
    url: "/dashboard/employee/jobs/new",
    icon: CirclePlus,
  },
  {
    title: "Saved candidates",
    url: "/dashboard/employee/saved-candidates",
    icon: Heart,
  },
  {
    title: "Proile",
    url: "/dashboard/employee/profile",
    icon: Users,
  },
  {
    title: "Settings",
    url: "/dashboard/employee/settings",
    icon: Settings,
  },
];

export function EmployeeDashboardSidebar() {
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
