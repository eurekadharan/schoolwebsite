import { cache } from "react";
import { isSupabaseConfigured } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const adminRoles = [
  "super_admin",
  "admin",
  "editor",
  "admissions",
  "viewer",
] as const;

export type AdminRole = (typeof adminRoles)[number];

export type AdminProfile = {
  id: string;
  full_name: string;
  role: AdminRole;
  avatar_url: string | null;
};

export const getCurrentProfile = cache(async () => {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, role, avatar_url")
    .eq("id", user.id)
    .single();

  if (error || !data || !adminRoles.includes(data.role as AdminRole)) {
    return null;
  }

  return data as AdminProfile;
});

export async function assertAdminRole(allowedRoles: AdminRole[]) {
  const profile = await getCurrentProfile();

  if (!profile || !allowedRoles.includes(profile.role)) {
    throw new Error("You do not have permission to perform this action.");
  }

  return profile;
}
