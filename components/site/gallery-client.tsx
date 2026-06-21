"use client";

import { useState } from "react";
import SafeImage from "@/components/safe-image";

interface GalleryItem {
  id: string;
  title: string;
  cover_image: string;
  album: string;
  sort_order: number;
  is_featured: boolean;
  is_active: boolean;
}

interface GalleryClientProps {
  items: GalleryItem[];
}

export default function GalleryClient({ items }: GalleryClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  // Get unique categories from active items
  const categories = ["All", ...Array.from(new Set(items.map((item) => item.album)))];

  // Filter items
  const filteredItems = activeCategory === "All"
    ? items
    : items.filter((item) => item.album === activeCategory);

  return (
    <section className="bg-slate-50 py-[75px] max-md:py-14">
      <div className="mx-auto max-w-[1140px] px-4">
        {/* Category Filters */}
        {categories.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 text-xs font-black uppercase tracking-wider rounded-full transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-[#ff7b3b] text-white shadow-md transform -translate-y-0.5"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-[#3eaea6]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Gallery Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg border border-slate-100 shadow-sm">
            <p className="text-sm text-slate-400">No photos in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Photo box */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 shrink-0">
                  <SafeImage
                    src={item.cover_image}
                    alt={item.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {item.album && (
                    <span className="absolute top-4 left-4 bg-white/90 text-[10px] font-black uppercase text-[#3eaea6] px-2.5 py-1 rounded shadow-sm">
                      {item.album}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-5 flex-1 flex flex-col justify-center bg-white border-t border-slate-50">
                  <h3 className="font-extrabold text-[#10233f] text-base leading-snug group-hover:text-[#3eaea6] transition">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
