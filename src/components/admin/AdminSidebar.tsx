"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/actions/auth";
import { LayoutDashboard, Package, Flame, Grid2X2, Tag, ImageIcon, LogOut } from "lucide-react";

const navItems = [
  { href: "/admin/dashboard",       label: "Dashboard",       icon: LayoutDashboard },
  { href: "/admin/products",        label: "Products",        icon: Package },
  { href: "/admin/weekly",          label: "Weekly Picks",    icon: Flame },
  { href: "/admin/collections",     label: "Collections",     icon: Grid2X2 },
  { href: "/admin/category-images", label: "Category Images", icon: ImageIcon },
  { href: "/admin/offers",          label: "Offers",          icon: Tag },
];

interface Props {
  weeklyCount: number;
}

export default function AdminSidebar({ weeklyCount }: Props) {
  const pathname = usePathname();

  return (
    <aside className="w-56 bg-[#2F3131] text-white flex flex-col shrink-0">
      <div className="px-6 py-7 border-b border-white/10">
        <p className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-bold mb-1">Silver Spoon</p>
        <h1 className="text-lg font-serif text-white leading-tight">Admin</h1>
      </div>

      <nav className="flex-1 py-5 px-3 flex flex-col gap-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/admin/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-[11px] font-bold uppercase tracking-widest transition-colors ${
                active
                  ? "bg-white/10 text-white"
                  : "text-white/45 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={13} className={active ? "text-[#D4AF37]" : ""} />
              <span className="flex-1">{label}</span>
              {href === "/admin/weekly" && weeklyCount > 0 && (
                <span className={`text-[9px] font-bold tabular-nums px-1.5 py-0.5 rounded-full leading-none ${
                  active ? "bg-[#D4AF37] text-[#2F3131]" : "bg-white/15 text-white/70"
                }`}>
                  {weeklyCount}/6
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <form action={logout}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-white/35 hover:text-white hover:bg-white/5 transition-colors text-[11px] font-bold uppercase tracking-widest"
          >
            <LogOut size={13} />
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}
