import { NextResponse } from "next/server";
import { getBanners } from "@/lib/banners-store";

export const revalidate = 0; // Disable cache to serve real-time admin updates

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const placement = searchParams.get("placement");

    let banners = await getBanners(false);
    if (placement) {
      banners = banners.filter((b) => b.placement === placement);
    }
    return NextResponse.json(banners);
  } catch (err: any) {
    console.error("API Banners Error:", err);
    return NextResponse.json({ error: "Failed to fetch banners" }, { status: 500 });
  }
}
