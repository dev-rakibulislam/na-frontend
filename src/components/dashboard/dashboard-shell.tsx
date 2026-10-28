import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DashboardSidebar } from "./dashboard-sidebar";
import type { ReactNode } from "react";
import type { UserRole } from "@/types";
import { Bell, Search, UserRound } from "lucide-react";
import ThemeToggle from "../theme-toggle";

export default function DashboardShell({
  children,
  role,
}: {
  children: ReactNode;
  role: UserRole;
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar role={role} />
      <SidebarInset className="min-w-0">
        <header className="sticky top-0 z-30 flex h-14 min-w-0 items-center gap-2 border-b bg-background px-3 sm:h-16 sm:gap-3 sm:px-4">
          {/* Sidebar Toggle */}
          <SidebarTrigger className="shrink-0" />

          {/* Breadcrumb */}
          <div className="flex min-w-0 flex-1 items-center gap-1.5 overflow-hidden">
            <span className="hidden truncate text-sm text-muted-foreground sm:inline">
              Dashboard
            </span>

            <span className="hidden text-muted-foreground sm:inline">/</span>

            <span className="truncate text-sm font-medium">Overview</span>
          </div>

          {/* Search */}
          <button
            type="button"
            aria-label="Search"
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-md hover:bg-accent"
          >
            <Search className="size-4" />
          </button>

          {/* Notifications */}
          {/* <button
            type="button"
            aria-label="Notifications"
            className="relative inline-flex size-9 shrink-0 items-center justify-center rounded-md hover:bg-accent"
          >
            <Bell className="size-4" />
            <span className="absolute right-2 top-2 size-2 rounded-full bg-red-500" />
          </button> */}

          {/* Theme */}
          <ThemeToggle />

          {/* Profile */}
          <button
            type="button"
            aria-label="Open profile menu"
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border hover:bg-accent"
          >
            <UserRound className="size-4" />
          </button>
        </header>

        <main className="min-w-0 flex-1 p-3 sm:p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
