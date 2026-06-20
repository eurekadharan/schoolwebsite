import { NextResponse, type NextRequest } from "next/server";
import { isSupabaseConfigured } from "@/lib/env";
import { checkRateLimit } from "@/lib/server/rate-limit";
import { readSubmissionBody } from "@/lib/server/request-body";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { inquirySubmissionSchema } from "@/lib/validations/forms";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  const limit = checkRateLimit(`inquiry:${ip}`, 6, 60_000);

  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again later." },
      {
        status: 429,
        headers: { "retry-after": String(limit.retryAfter ?? 60) },
      },
    );
  }

  const parsed = inquirySubmissionSchema.safeParse(
    await readSubmissionBody(request),
  );

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Supabase is not configured." },
      { status: 503 },
    );
  }

  const { website, ...submission } = parsed.data;
  void website;
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("inquiry_submissions").insert({
    ...submission,
    metadata: {
      user_agent: request.headers.get("user-agent"),
      source: "website",
    },
  });

  if (error) {
    return NextResponse.json(
      { ok: false, error: "Could not save inquiry submission." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
