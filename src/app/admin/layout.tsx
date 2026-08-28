"use client";

import { ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AdminProvider, useAdmin } from "@/context/AdminContext";
import AdminNav from "@/components/admin/AdminNav";

function AdminGate({ children }: { children: ReactNode }) {
  const { admin, loading } = useAdmin();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !admin && pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
  }, [admin, loading, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#101312]">
        <div className="text-white/60">Loading admin…</div>
      </div>
    );
  }

  if (!admin && pathname !== "/admin/login") return null;

  // Login page doesn't get the sidebar
  if (pathname === "/admin/login") return <>{children}</>;

  // Authenticated routes get the sidebar layout
  return (
    <div className="flex min-h-screen bg-[#070908] text-white">
      <AdminNav />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminProvider>
      <AdminGate>{children}</AdminGate>
    </AdminProvider>
  );
}

