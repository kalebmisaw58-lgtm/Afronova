"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
 import {
  LayoutDashboard, Globe, FileText, Users, Calendar, Quote,
  Settings, LogOut, Images, Inbox,
} from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Website Content", href: "/admin/content", icon: Globe },
  { label: "News Articles", href: "/admin/news", icon: FileText },
  { label: "Partners", href: "/admin/partners", icon: Users },
  { label: "Portfolio Images", href: "/admin/portfolio", icon: Images },
  { label: "Testimonials", href: "/admin/testimonials", icon: Quote },
  { label: "Event Schedule", href: "/admin/schedule", icon: Calendar },
  { label: "Inquiries & Leads", href: "/admin/inquiries", icon: Inbox },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminNav() {
  const pathname = usePathname();
  const { admin, logout } = useAdmin();

  return (
    <aside className="w-64 shrink-0 border-r border-[#D6A34A]/20 bg-[#101312] min-h-screen flex flex-col shadow-lg">
      <div className="p-6 border-b border-white/10">
        <p className="text-xs text-[#D6A34A] uppercase tracking-widest font-bold">AfroNova Admin</p>
        <p className="text-sm font-bold text-white truncate mt-1">
          {admin?.full_name ?? admin?.email}
        </p>
        <p className="text-xs text-white/50 capitalize font-medium">{admin?.role}</p>
      </div>

      <nav className="py-4 flex-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-5 py-3 text-sm font-semibold transition-all ${
                isActive
                  ? "text-[#F0B84F] bg-[#D6A34A]/15 border-l-4 border-[#D6A34A] shadow-inner"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-[#D6A34A]" : "text-white/60"}`} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-white/70 hover:text-white hover:bg-red-500/20 hover:text-red-300 rounded-xl transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-red-400" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

