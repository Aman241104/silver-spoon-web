import { Suspense } from "react";
import { getAllCollections } from "@/lib/db";
import CollectionEditCard from "@/components/admin/CollectionEditCard";
import NewCollectionForm from "@/components/admin/NewCollectionForm";
import type { DbCollection } from "@/lib/db";

const HARDCODED: DbCollection[] = [
  { slug: "mens",      title: "Men's Collection",      image_url: "/images/collections/men-category-new.png", link_href: "/products?gender=men",  sort_order: 1, is_active: true },
  { slug: "womens",    title: "Women's Collection",    image_url: "/images/collections/women-category.png",   link_href: "/products?gender=women", sort_order: 2, is_active: true },
  { slug: "gifting",   title: "Gifting Collection",    image_url: "/images/collections/gifting-collection.jpg", link_href: "/gifting",            sort_order: 3, is_active: true },
  { slug: "tableware", title: "Silverware & Tableware", image_url: "/images/collections/new-arrivals.jpg",    link_href: "/collections/utensils", sort_order: 4, is_active: true },
];

async function CollectionList() {
  const collections = await getAllCollections();
  const items = collections.length > 0 ? collections : HARDCODED;
  const fromDb = collections.length > 0;

  return (
    <div>
      <div className="space-y-4">
        {items.map((col) => (
          <CollectionEditCard key={col.slug} collection={col} />
        ))}
      </div>
    </div>
  );
}

export default function AdminCollectionsPage() {
  return (
    <div className="p-8 md:p-12 max-w-3xl">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif text-[#2c2c2c] tracking-tight">Collection Cards</h2>
          <p className="text-gray-400 text-sm mt-1">
            Customise the &ldquo;Explore Our Collections&rdquo; section shown on the homepage.
          </p>
        </div>
        <NewCollectionForm />
      </div>

      <Suspense
        fallback={
          <div className="animate-pulse space-y-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-36 bg-white border border-gray-100" />
            ))}
          </div>
        }
      >
        <CollectionList />
      </Suspense>
    </div>
  );
}
