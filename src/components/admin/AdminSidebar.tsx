"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/actions/auth";
import { LayoutDashboard, Package, Flame, Grid2X2, Tag, Layers, ImageIcon, LogOut, X, Star, Menu as MenuIcon } from "lucide-react";

const navItems = [
  { href: "/admin/dashboard",       label: "Dashboard",       icon: LayoutDashboard },
  { href: "/admin/products",        label: "Products",        icon: Package },
  { href: "/admin/weekly",          label: "Weekly Picks",    icon: Flame },
  { href: "/admin/collections",     label: "Collections",     icon: Grid2X2 },
  { href: "/admin/category-images", label: "Category Images", icon: ImageIcon },
  { href: "/admin/subcategories",   label: "Sub-categories",  icon: Layers },
  { href: "/admin/nav-menu",        label: "Header Menu",     icon: MenuIcon },
  { href: "/admin/offers",          label: "Offers",          icon: Tag },
  { href: "/admin/reviews",         label: "Reviews",         icon: Star },
];

interface Props {
  weeklyCount: number;
  weeklyMax: number;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ weeklyCount, weeklyMax, isOpen = false, onClose }: Props) {
  const pathname = usePathname();

  return (
    <aside className={`fixed left-0 top-0 h-full w-56 z-50 bg-[#2F3131] text-white flex flex-col transform transition-transform duration-200 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
      <div className="px-6 py-7 border-b border-white/10 flex items-start justify-between">
        <div>
          <p className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-bold mb-1">Silver Spoon</p>
          <h1 className="text-lg font-serif text-white leading-tight">Admin</h1>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="lg:hidden text-white/40 hover:text-white transition-colors mt-1 p-1 -mr-1"
          aria-label="Close menu"
        >
          <X size={16} />
        </button>
      </div>

      <nav className="flex-1 py-5 px-3 flex flex-col gap-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/admin/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
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
                  {weeklyCount}/{weeklyMax}
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
