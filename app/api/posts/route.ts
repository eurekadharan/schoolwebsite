import { NextResponse } from "next/server";
import { getPosts } from "@/lib/posts-store";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") as "blog" | "notice" | "news" | null;
    const includeDrafts = searchParams.get("includeDrafts") === "true";

    const posts = await getPosts(type || undefined, includeDrafts);
    return NextResponse.json(posts);
  } catch (err: any) {
    console.error("API Posts Error:", err);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
