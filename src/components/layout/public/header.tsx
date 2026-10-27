"use client";

import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
// import { toast } from "@/components/ui/toast";
import { useGetMe, useLogout } from "@/hooks";
import { UserRole } from "@/types";

import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

export default function Header() {
  const routes = [
    { name: "Home", url: "/" },
    { name: "About us", url: "/about-us" },
  ];

  const { data, isLoading } = useGetMe();
  const { mutate: logout } = useLogout();
  const queryClient = useQueryClient();

  const dashboardRoute: Record<UserRole, string> = {
    ADMIN: "/admin-dashboard",
    CUSTOMER: "/dashboard",
  };
  const role: UserRole = data?.data.role;
  console.log(role, "roless");
  // const handleLogout = () => {
  //   logout(undefined, {
  //     onSuccess: () => {
  //       toast.add({
  //         title: "Tata",
  //         description: "Logged out successfully",
  //         type: "success",
  //       });
  //       queryClient.removeQueries({ queryKey: ["user"] });
  //     },
  //     onError: () => {
  //       toast.add({
  //         title: "Logout failed",
  //         description: "Something Went Wrong",
  //         type: "error",
  //       });
  //     },
  //   });
  // };

  return (
    <header className="w-full h-16 border border-b">
      <div className="flex justify-between items-center h-full max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          {/* <Logo /> */}
          <span>NA </span>
        </div>

        <nav className="flex gap-5">
          {routes.map((route) => (
            <Link key={route.url} href={route.url}>
              {route.name}
            </Link>
          ))}
          {role && (
            <Link href={dashboardRoute[role]}>
              {role === "ADMIN" ? "Dashboard" : "My profile"}
            </Link>
          )}
          <ThemeToggle />
          {/* {role && <Link href={dashboardRoute[role]}>Dashboard</Link>} */}
        </nav>
        <div>
          {!isLoading && !data && (
            <Button variant="default">
              <Link href="/login">Login</Link>
            </Button>
          )}
          {!isLoading && data && <Button variant="destructive">Logout</Button>}
        </div>
      </div>
    </header>
  );
}
