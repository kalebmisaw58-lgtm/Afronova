"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
 import {
  LayoutDashboard, Globe, FileText, Users, Calendar,
  Settings, LogOut, Images, Inbox,
} from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Website Content", href: "/admin/content", icon: Globe },
  { label: "News Articles", href: "/admin/news", icon: FileText },
  { label: "Partners", href: "/admin/partners", icon: Users },
  { label: "Portfolio Images", href: "/admin/portfolio", icon: Images },
  { label: "Testimonials", href: "/admin/testimonials", icon: Calendar },
  { label: "Event Schedule", href: "/admin/schedule", icon: Calendar },
  { label: "Inquiries & Leads", href: "/admin/inquiries", icon: Inbox },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminNav() {
  const pathname = usePathname();
  const { admin, logout } = useAdmin();

  return (
    <aside className="w-64 shrink-0 border-r border-white/5 bg-[#101312] min-h-screen flex flex-col">
      <div className="p-6 border-b border-white/5">
        <p className="text-xs text-white/40 uppercase tracking-wider">AfroNova Admin</p>
        <p className="text-sm font-semibold text-white/60 truncate mt-1">
          {admin?.full_name ?? admin?.email}
        </p>
        <p className="text-xs text-white/30">{admin?.role}</p>
      </div>

      <nav className="py-4">
        {navItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-all ${
              pathname === href
                ? "text-[#D6A34A] bg-white/5 border-l-2 border-[#D6A34A]"
                : "text-white/50 hover:text-white hover:bg-white/5"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/50 hover:text-white hover:bg-white/5 rounded transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
