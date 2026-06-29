"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import type { ReactNode } from "react";
import NextTopLoader from "nextjs-toploader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { ToastProvider } from "@/components/admin/ui/Toast";

interface Props {
  weeklyCount: number;
  children: ReactNode;
}

export default function AdminShell({ weeklyCount, children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <NextTopLoader
        color="#D4AF37"
        height={2}
        showSpinner={false}
        shadow="0 0 8px #D4AF37"
        easing="ease"
        speed={200}
      />

      {/* Mobile-only top header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 z-30 bg-[#2F3131] flex items-center px-4 gap-3">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="text-white/70 hover:text-white transition-colors p-1 -ml-1"
          aria-label="Open navigation"
        >
          <Menu size={22} />
        </button>
        <span className="font-serif text-white text-lg leading-none">Silver Spoon</span>
        <span className="ml-auto text-[#D4AF37] text-[9px] font-bold uppercase tracking-widest">Admin</span>
      </header>

      {/* Backdrop — tapping it closes the drawer */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <AdminSidebar
        weeklyCount={weeklyCount}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <ToastProvider>
        <main className="min-h-screen lg:ml-56 pt-14 lg:pt-0 bg-[#FAF8F5] overflow-auto">
          {children}
        </main>
      </ToastProvider>
    </>
  );
}
