"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createPost, updatePost, deletePost } from "@/lib/posts-store";

export async function adminCreateNotice(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const slug = String(formData.get("slug") || "").trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const excerpt = String(formData.get("excerpt") || "").trim();
  const body = String(formData.get("body") || "").trim();
  const status = (formData.get("status") as "draft" | "published" | "archived") || "draft";
  const cover_image = String(formData.get("cover_image") || "").trim() || "";
  const pinned = formData.get("pinned") === "true";

  if (!title) {
    throw new Error("Title is required.");
  }

  await createPost({
    type: "notice",
    title,
    slug,
    excerpt,
    body,
    cover_image,
    status,
    pinned,
    published_at: status === "published" ? new Date().toISOString() : undefined
  });

  revalidatePath("/");
  revalidatePath("/notices");
  revalidatePath("/admin/notices");
  redirect("/admin/notices");
}

export async function adminUpdateNotice(formData: FormData) {
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const body = String(formData.get("body") || "").trim();
  const status = formData.get("status") as "draft" | "published" | "archived";
  const cover_image = String(formData.get("cover_image") || "").trim();
  const pinned = formData.get("pinned") === "true";

  if (!id || !title) {
    throw new Error("ID and Title are required.");
  }

  await updatePost(id, {
    title,
    slug,
    excerpt,
    body,
    cover_image,
    status,
    pinned,
    published_at: status === "published" ? new Date().toISOString() : undefined
  });

  revalidatePath("/");
  revalidatePath("/notices");
  revalidatePath(`/notices/${slug}`);
  revalidatePath("/admin/notices");
  redirect("/admin/notices");
}

export async function adminDeleteNotice(id: string) {
  if (!id) throw new Error("ID is required to delete.");
  await deletePost(id);
  revalidatePath("/");
  revalidatePath("/notices");
  revalidatePath("/admin/notices");
}
