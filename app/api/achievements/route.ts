import { NextResponse } from "next/server";
import { getAchievements } from "@/lib/achievements-store";

export const revalidate = 0; // Disable cache to serve real-time admin updates

export async function GET() {
  try {
    const achievements = await getAchievements(false);
    return NextResponse.json(achievements);
  } catch (err: any) {
    console.error("API Achievements Error:", err);
    return NextResponse.json({ error: "Failed to fetch achievements" }, { status: 500 });
  }
}
