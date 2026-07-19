import { Suspense } from "react";
import { getNavItems, getCategoryFormOptions, type NavMenu } from "@/lib/db";
import NavMenuListCard from "@/components/admin/NavMenuListCard";
import NewNavMenuItemForm from "@/components/admin/NewNavMenuItemForm";

const MENU_LABELS: Record<NavMenu, string> = {
  WOMEN: "Women",
  MEN: "Men",
  GIFTS: "Gifts",
  COLLECTION: "Collection",
};

async function NavMenuGroups() {
  const navItems = await getNavItems();
  return (
    <div className="space-y-8">
      {(Object.keys(MENU_LABELS) as NavMenu[]).map((menu) => (
        <div key={menu}>
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">
            {MENU_LABELS[menu]} Menu
          </h3>
          {navItems[menu].length === 0 ? (
            <p className="text-gray-400 text-sm py-4">No added items yet — the default dropdown items still show on the site.</p>
          ) : (
            <div className="space-y-2">
              {navItems[menu].map((item) => (
                <NavMenuListCard key={item.id} id={item.id} title={item.title} href={item.href} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default async function AdminNavMenuPage() {
  const categories = await getCategoryFormOptions();
  return (
    <div className="p-8 md:p-12 max-w-2xl">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif text-[#2c2c2c] tracking-tight">Header Menu</h2>
          <p className="text-gray-400 text-sm mt-1">
            Add new items to the MEN / WOMEN / GIFTS / COLLECTION dropdowns in the site header. Each item links to a product category.
          </p>
        </div>
        <NewNavMenuItemForm categories={categories} />
      </div>
      <Suspense fallback={<div className="animate-pulse h-40 bg-white border border-gray-100" />}>
        <NavMenuGroups />
      </Suspense>
    </div>
  );
}
