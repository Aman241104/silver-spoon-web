import { Suspense } from "react";
import Link from "next/link";
import { revalidateTag } from "next/cache";
import { Package, Flame, Star, Tag, Grid2X2, ImageIcon, Plus, RefreshCw } from "lucide-react";
import { countProducts, countActiveOffers, getProductsPaginatedLean } from "@/lib/db";
import DashboardProductPanel from "@/components/admin/DashboardProductPanel";

async function StatsRow() {
  const [total, weekly, featured, activeOffers] = await Promise.all([
    countProducts(),
    countProducts("is_weekly=eq.true"),
    countProducts("featured=eq.true"),
    countActiveOffers(),
  ]);

  const stats = [
    { label: "Total Products", value: total,        sub: "in catalog",         icon: Package, href: "/admin/products",  color: "text-gray-400" },
    { label: "Weekly Picks",   value: weekly,       sub: `of 6 slots used`,    icon: Flame,   href: "/admin/weekly",    color: `text-${weekly >= 6 ? "[#D4AF37]" : "gray-400"}` },
    { label: "Featured",       value: featured,     sub: "on homepage",        icon: Star,    href: "/admin/products",  color: "text-gray-400" },
    { label: "Active Offers",  value: activeOffers, sub: "live on site",       icon: Tag,     href: "/admin/offers",    color: "text-gray-400" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {stats.map(({ label, value, sub, icon: Icon, href, color }) => (
        <Link
          key={label}
          href={href}
          className="bg-white border border-gray-100 p-5 hover:border-[#D4AF37]/30 hover:shadow-sm transition-all duration-150 group"
        >
          <div className="flex items-start justify-between mb-3">
            <Icon size={16} className={`${color} group-hover:text-[#D4AF37] transition-colors`} />
          </div>
          <p className="text-4xl font-serif text-[#2c2c2c] leading-none mb-1">{value}</p>
          <p className="text-[9px] uppercase tracking-widest font-bold text-gray-300 mt-1">{label}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>
        </Link>
      ))}
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-pulse">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="bg-white border border-gray-100 p-5">
          <div className="h-4 w-4 bg-gray-200 rounded mb-3" />
          <div className="h-10 w-16 bg-gray-200 rounded mb-1" />
          <div className="h-2.5 w-20 bg-gray-100 rounded mt-2" />
          <div className="h-2.5 w-16 bg-gray-50 rounded mt-1" />
        </div>
      ))}
    </div>
  );
}

async function ProductPanelSection() {
  const { products } = await getProductsPaginatedLean(1, 50);
  return <DashboardProductPanel products={products} />;
}

async function refreshCache() {
  "use server";
  revalidateTag("products", "max");
  revalidateTag("weekly-products", "max");
  revalidateTag("collections", "max");
  revalidateTag("offers", "max");
  revalidateTag("category-images", "max");
}

export default function AdminDashboard() {
  return (
    <div className="p-6 md:p-10">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif text-[#2c2c2c] tracking-tight">Dashboard</h2>
          <p className="text-gray-400 text-sm mt-0.5">Silver Spoon by AC Jewellers</p>
        </div>
        <form action={refreshCache}>
          <button
            type="submit"
            className="flex items-center gap-2 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#2c2c2c] border border-gray-200 hover:border-gray-400 transition-colors"
            title="Flush the site cache so changes appear immediately"
          >
            <RefreshCw size={11} />
            Refresh Cache
          </button>
        </form>
      </div>

      {/* Stats */}
      <div className="mb-8">
        <Suspense fallback={<StatsSkeleton />}>
          <StatsRow />
        </Suspense>
      </div>

      {/* Quick links strip */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link
          href="/admin/products/new"
          className="flex items-center gap-1.5 bg-[#2F3131] text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-colors"
        >
          <Plus size={11} />
          Add Product
        </Link>
        <Link
          href="/admin/weekly"
          className="flex items-center gap-1.5 bg-white border border-gray-200 text-[#2c2c2c] px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:border-[#D4AF37] transition-colors"
        >
          <Flame size={11} />
          Weekly Picks
        </Link>
        <Link
          href="/admin/collections"
          className="flex items-center gap-1.5 bg-white border border-gray-200 text-[#2c2c2c] px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:border-[#D4AF37] transition-colors"
        >
          <Grid2X2 size={11} />
          Collections
        </Link>
        <Link
          href="/admin/category-images"
          className="flex items-center gap-1.5 bg-white border border-gray-200 text-[#2c2c2c] px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:border-[#D4AF37] transition-colors"
        >
          <ImageIcon size={11} />
          Category Images
        </Link>
        <Link
          href="/admin/offers"
          className="flex items-center gap-1.5 bg-white border border-gray-200 text-[#2c2c2c] px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:border-[#D4AF37] transition-colors"
        >
          <Tag size={11} />
          Offers
        </Link>
      </div>

      {/* Quick toggle panel */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
            Quick Toggle — Featured &amp; Weekly
          </h3>
        </div>
        <Suspense
          fallback={
            <div className="bg-white border border-gray-100 animate-pulse">
              <div className="p-4 border-b border-gray-50">
                <div className="h-9 bg-gray-100 rounded w-full" />
              </div>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-gray-50">
                  <div className="w-8 h-8 bg-gray-100 rounded-sm shrink-0" />
                  <div className="flex-1 space-y-1">
                    <div className="h-3 bg-gray-100 rounded w-40" />
                    <div className="h-2 bg-gray-50 rounded w-20" />
                  </div>
                  <div className="flex gap-4">
                    <div className="h-5 w-10 bg-gray-100 rounded-full" />
                    <div className="h-5 w-10 bg-gray-100 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          }
        >
          <ProductPanelSection />
        </Suspense>
      </div>
    </div>
  );
}
