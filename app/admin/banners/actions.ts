"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createBanner, updateBanner, deleteBanner } from "@/lib/banners-store";

export async function adminCreateBanner(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const subtitle = String(formData.get("subtitle") || "").trim();
  const cta_label = String(formData.get("cta_label") || "").trim();
  const cta_href = String(formData.get("cta_href") || "").trim();
  const placement = String(formData.get("placement") || "home_hero").trim();
  const sort_order = parseInt(String(formData.get("sort_order") || "0"), 10);
  const is_active = formData.get("is_active") === "true";
  const cover_image = String(formData.get("cover_image") || "").trim();
  const starts_at = String(formData.get("starts_at") || "").trim() || undefined;
  const ends_at = String(formData.get("ends_at") || "").trim() || undefined;

  if (!title) {
    throw new Error("Title is required.");
  }

  await createBanner({
    title,
    subtitle,
    cta_label,
    cta_href,
    placement,
    sort_order,
    is_active,
    cover_image,
    starts_at,
    ends_at
  });

  revalidatePath("/");
  revalidatePath("/admin/banners");
  redirect("/admin/banners");
}

export async function adminUpdateBanner(formData: FormData) {
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  const subtitle = String(formData.get("subtitle") || "").trim();
  const cta_label = String(formData.get("cta_label") || "").trim();
  const cta_href = String(formData.get("cta_href") || "").trim();
  const placement = String(formData.get("placement") || "home_hero").trim();
  const sort_order = parseInt(String(formData.get("sort_order") || "0"), 10);
  const is_active = formData.get("is_active") === "true";
  const cover_image = String(formData.get("cover_image") || "").trim();
  const starts_at = String(formData.get("starts_at") || "").trim() || undefined;
  const ends_at = String(formData.get("ends_at") || "").trim() || undefined;

  if (!id || !title) {
    throw new Error("ID and Title are required.");
  }

  await updateBanner(id, {
    title,
    subtitle,
    cta_label,
    cta_href,
    placement,
    sort_order,
    is_active,
    cover_image,
    starts_at,
    ends_at
  });

  revalidatePath("/");
  revalidatePath("/admin/banners");
  redirect("/admin/banners");
}

export async function adminDeleteBanner(id: string) {
  if (!id) throw new Error("ID is required to delete.");
  await deleteBanner(id);
  revalidatePath("/");
  revalidatePath("/admin/banners");
}
