import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { formSchemas, formTables, type FormKind } from "@/lib/forms";
import { hasSupabaseAdminEnv, hasSupabaseEnv, supabaseAnonKey, supabaseServiceRoleKey, supabaseUrl } from "@/lib/supabase/env";

type RouteContext = {
  params: Promise<{ type: string }>;
};

export async function POST(request: Request, context: RouteContext) {
  const { type } = await context.params;

  if (!(type in formSchemas)) {
    return NextResponse.json({ error: "Unsupported form type." }, { status: 404 });
  }

  const payload = await request.json().catch(() => null);
  const schema = formSchemas[type as FormKind];
  const parsed = schema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form submission.", issues: parsed.error.flatten() }, { status: 400 });
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const { website, ...data } = parsed.data;
  void website;

  if (hasSupabaseEnv() && supabaseUrl) {
    const key = hasSupabaseAdminEnv() ? supabaseServiceRoleKey! : supabaseAnonKey!;
    const supabase = createClient(supabaseUrl, key, {
      auth: { persistSession: false, autoRefreshToken: false }
    });

    const { error } = await supabase.from(formTables[type as FormKind]).insert({
      ...data,
      metadata: {
        user_agent: request.headers.get("user-agent"),
        source: "website"
      }
    });

    if (error) {
      return NextResponse.json({ error: "Unable to save submission." }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
