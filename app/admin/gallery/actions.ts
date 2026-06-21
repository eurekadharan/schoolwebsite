"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createGalleryItem, updateGalleryItem, deleteGalleryItem } from "@/lib/gallery-store";

export async function adminCreateGalleryItem(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const album = String(formData.get("album") || "").trim() || "General";
  const cover_image = String(formData.get("cover_image") || "").trim() || "/images/school details.jpg";
  const sort_order = parseInt(String(formData.get("sort_order") || "10"), 10);
  const is_featured = formData.get("is_featured") === "true";
  const is_active = formData.get("is_active") === "true";

  if (!title || !cover_image) {
    throw new Error("Title and Cover image are required.");
  }

  await createGalleryItem({
    title,
    album,
    cover_image,
    sort_order: isNaN(sort_order) ? 10 : sort_order,
    is_featured,
    is_active
  });

  revalidatePath("/gallery");
  revalidatePath("/");
  revalidatePath("/admin/gallery");
  redirect("/admin/gallery");
}

export async function adminUpdateGalleryItem(formData: FormData) {
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  const album = String(formData.get("album") || "").trim() || "General";
  const cover_image = String(formData.get("cover_image") || "").trim();
  const sort_order = parseInt(String(formData.get("sort_order") || "10"), 10);
  const is_featured = formData.get("is_featured") === "true";
  const is_active = formData.get("is_active") === "true";

  if (!id || !title) {
    throw new Error("ID and Title are required.");
  }

  await updateGalleryItem(id, {
    title,
    album,
    cover_image,
    sort_order: isNaN(sort_order) ? 10 : sort_order,
    is_featured,
    is_active
  });

  revalidatePath("/gallery");
  revalidatePath("/");
  revalidatePath("/admin/gallery");
  redirect("/admin/gallery");
}

export async function adminDeleteGalleryItem(id: string) {
  if (!id) throw new Error("ID is required to delete.");
  await deleteGalleryItem(id);
  revalidatePath("/gallery");
  revalidatePath("/");
  revalidatePath("/admin/gallery");
}
