"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { adminRoute, content, customerRoute } from "@/config";

import type { UserRole } from "@/types";
import type { SidebarItems } from "@/types/sidebar.type";
import { cn } from "cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../shared/logo";

const sidebarRoutes: Partial<Record<UserRole, SidebarItems>> = {
  ADMIN: adminRoute,
  CUSTOMER: customerRoute,
};

export function DashboardSidebar({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const routes: SidebarItems = sidebarRoutes[role] || [];

  console.log(pathname);

  return (
    <Sidebar>
      <SidebarHeader className="flex h-16 flex-row items-center justify-between border-b px-4">
        <Logo/>

        {/* Mobile only */}
        <SidebarTrigger
          className="ml-2 size-9 shrink-0 rounded-lg border border-border bg-background shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground md:hidden"
          aria-label="Toggle sidebar"
        />
      </SidebarHeader>

      <SidebarContent>
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="text-[10px] dark:text-gray-400 text-gray-700">
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((subItem) => (
                  <SidebarMenuItem key={subItem.title}>
                    <Link
                      href={subItem.url}
                      aria-current={
                        pathname === subItem.url ? "page" : undefined
                      }
                      className={cn(
                        "flex w-full items-center gap-2 rounded-none px-3 py-2  transition-colors",
                        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        pathname === subItem.url &&
                          "bg-sidebar-accent font-medium text-sidebar-accent-foreground",
                      )}
                    >
                      {subItem.title}
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
