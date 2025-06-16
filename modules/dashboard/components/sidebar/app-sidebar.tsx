"use client";

import { Gift, HandCoins, LayoutDashboard, Settings } from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = {
    main: [
      {
        title: "Visão Geral",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Lista de Presentes",
        url: "/dashboard/gifts",
        icon: Gift,
      },
      {
        title: "Contribuições",
        url: "/dashboard/contributions",
        icon: HandCoins,
      },
      {
        title: "Configurações",
        url: "/dashboard/settings",
        icon: Settings,
      },
    ],
  };

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href="/dashboard">
                <Gift className="!size-5" />
                <span className="text-base font-semibold">Nuvia</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.main} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
