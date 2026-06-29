import type { ReactNode } from "react";
import { ToastProvider } from "@/components/admin/ui/Toast";
import AdminSidebar from "@/components/admin/AdminSidebar";

async function getWeeklyCount(): Promise<number> {
  try {
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/products?select=*&is_weekly=eq.true`;
    const res = await fetch(url, {
      method: "HEAD",
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
        "Accept-Profile": "public",
        Prefer: "count=exact",
      },
      cache: "no-store",
    });
    if (!res.ok) return 0;
    const range = res.headers.get("Content-Range") ?? "";
    return Number(range.split("/")[1]) || 0;
  } catch {
    return 0;
  }
}

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const weeklyCount = await getWeeklyCount();

  return (
    <div className="min-h-screen flex bg-[#FAF8F5]">
      <AdminSidebar weeklyCount={weeklyCount} />
      <ToastProvider>
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </ToastProvider>
    </div>
  );
}
