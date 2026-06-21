"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAchievement, updateAchievement, deleteAchievement } from "@/lib/achievements-store";

export async function adminCreateAchievement(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const slug = String(formData.get("slug") || "").trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const category = String(formData.get("category") || "").trim();
  const summary = String(formData.get("summary") || "").trim();
  const body = String(formData.get("body") || "").trim();
  const cover_image = String(formData.get("cover_image") || "").trim() || "/images/staffs.jpg";
  const achievement_date = String(formData.get("achievement_date") || "").trim() || new Date().toISOString().split("T")[0];
  const status = (formData.get("status") as "draft" | "published" | "archived") || "draft";
  const sort_order = Number(formData.get("sort_order") ?? 0);

  if (!title || !category || !summary) {
    throw new Error("Title (Name), Category (Batch), and Summary (Success details) are required.");
  }

  await createAchievement({
    title,
    slug,
    category,
    summary,
    body,
    cover_image,
    achievement_date,
    status,
    published_at: status === "published" ? new Date().toISOString() : undefined,
    sort_order
  });

  revalidatePath("/hall-of-fame");
  revalidatePath("/");
  revalidatePath("/admin/hall-of-fame");
  redirect("/admin/hall-of-fame");
}

export async function adminUpdateAchievement(formData: FormData) {
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const summary = String(formData.get("summary") || "").trim();
  const body = String(formData.get("body") || "").trim();
  const cover_image = String(formData.get("cover_image") || "").trim();
  const achievement_date = String(formData.get("achievement_date") || "").trim();
  const status = formData.get("status") as "draft" | "published" | "archived";
  const sort_order = Number(formData.get("sort_order") ?? 0);

  if (!id || !title || !category || !summary) {
    throw new Error("ID, Title (Name), Category (Batch), and Summary (Success details) are required.");
  }

  await updateAchievement(id, {
    title,
    slug,
    category,
    summary,
    body,
    cover_image,
    achievement_date,
    status,
    published_at: status === "published" ? new Date().toISOString() : undefined,
    sort_order
  });

  revalidatePath("/hall-of-fame");
  revalidatePath("/");
  revalidatePath("/admin/hall-of-fame");
  redirect("/admin/hall-of-fame");
}

export async function adminDeleteAchievement(id: string) {
  if (!id) throw new Error("ID is required to delete.");
  await deleteAchievement(id);
  revalidatePath("/hall-of-fame");
  revalidatePath("/");
  revalidatePath("/admin/hall-of-fame");
}
