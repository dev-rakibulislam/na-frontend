import AuthGuard from "@/components/auth/auth-guard";
import Header from "@/components/layout/public/header";
import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <Header />
      {children}
    </AuthGuard>
  );
}
