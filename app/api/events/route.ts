import { NextResponse } from "next/server";
import { getEvents } from "@/lib/events-store";

export const revalidate = 0; // Disable cache to serve real-time admin updates

export async function GET() {
  try {
    const events = await getEvents(false);
    // Return only top 3 events for previews
    return NextResponse.json(events.slice(0, 3));
  } catch (err: any) {
    console.error("API Events Error:", err);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
