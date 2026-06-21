import { NextResponse } from "next/server";
import { getGalleryItems } from "@/lib/gallery-store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const items = await getGalleryItems(false); // only active items
    return NextResponse.json(items);
  } catch (err) {
    console.error("Gallery items API failed:", err);
    return NextResponse.json({ error: "Failed to fetch gallery items" }, { status: 500 });
  }
}
