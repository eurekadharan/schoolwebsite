import type { Metadata } from "next";
import Image from "next/image";
import { getGalleryItems } from "@/lib/gallery-store";
import { getPageSummary } from "@/lib/site-data";
import GalleryClient from "@/components/site/gallery-client";

export const metadata: Metadata = {
  title: "School Gallery | Eureka",
  description: "Browse campus life, celebrations, programs, student activities, sports, and achievement moments captured across the school year."
};

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const items = await getGalleryItems(false); // only active items
  const page = getPageSummary("gallery")!;

  return (
    <>
      {/* Hero Header */}
      <section className="relative isolate flex min-h-[300px] items-center overflow-hidden text-white">
        <Image
          src={page.image || "/images/students in house dress.jpg"}
          alt={page.title}
          fill
          sizes="100vw"
          className="-z-20 object-cover"
          priority
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#2b2e3d]/90 to-[#2b2e3d]/25" />
        <div className="mx-auto w-full max-w-[1140px] px-4">
          <span className="mb-3 inline-flex min-h-7 items-center rounded-full bg-[#d9fffc] px-3.5 py-1 text-xs font-bold uppercase text-[#3eaea6]">
            {page.eyebrow}
          </span>
          <h1 className="max-w-[760px] text-balance text-[clamp(36px,5vw,54px)] font-black leading-tight text-white">
            {page.title}
          </h1>
          <p className="mt-4 max-w-[660px] text-slate-200">
            {page.description}
          </p>
        </div>
      </section>

      {/* Interactive Gallery Content */}
      <GalleryClient items={items} />
    </>
  );
}
