import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { newsletterSchema } from "@/lib/forms";
import { hasSupabaseAdminEnv, hasSupabaseEnv, supabaseAnonKey, supabaseServiceRoleKey, supabaseUrl } from "@/lib/supabase/env";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = newsletterSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid newsletter signup." }, { status: 400 });
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  if (hasSupabaseEnv() && supabaseUrl) {
    const key = hasSupabaseAdminEnv() ? supabaseServiceRoleKey! : supabaseAnonKey!;
    const supabase = createClient(supabaseUrl, key, {
      auth: { persistSession: false, autoRefreshToken: false }
    });

    const { error } = await supabase
      .from("newsletter_subscribers")
      .upsert({ email: parsed.data.email, status: "active" }, { onConflict: "email" });

    if (error) {
      return NextResponse.json({ error: "Unable to subscribe." }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
