"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createPost, updatePost, deletePost } from "@/lib/posts-store";

export async function adminCreateBlog(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const slug = String(formData.get("slug") || "").trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const excerpt = String(formData.get("excerpt") || "").trim();
  const body = String(formData.get("body") || "").trim();
  const status = (formData.get("status") as "draft" | "published" | "archived") || "draft";
  const cover_image = String(formData.get("cover_image") || "").trim() || "/images/students with smart board.jpg";
  const homepage_order_raw = formData.get("homepage_order");
  const homepage_order = homepage_order_raw ? parseInt(String(homepage_order_raw), 10) : null;
  const pinned = formData.get("pinned") === "true";

  if (!title) {
    throw new Error("Title is required.");
  }

  await createPost({
    type: "blog",
    title,
    slug,
    excerpt,
    body,
    cover_image,
    homepage_order: isNaN(Number(homepage_order)) ? null : homepage_order,
    status,
    pinned,
    published_at: status === "published" ? new Date().toISOString() : undefined
  });

  revalidatePath("/");
  revalidatePath("/blogs");
  revalidatePath("/admin/blogs");
  redirect("/admin/blogs");
}

export async function adminUpdateBlog(formData: FormData) {
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const body = String(formData.get("body") || "").trim();
  const status = formData.get("status") as "draft" | "published" | "archived";
  const cover_image = String(formData.get("cover_image") || "").trim();
  const homepage_order_raw = formData.get("homepage_order");
  const homepage_order = homepage_order_raw ? parseInt(String(homepage_order_raw), 10) : null;
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
    homepage_order: isNaN(Number(homepage_order)) ? null : homepage_order,
    status,
    pinned,
    published_at: status === "published" ? new Date().toISOString() : undefined
  });

  revalidatePath("/");
  revalidatePath("/blogs");
  revalidatePath(`/blogs/${slug}`);
  revalidatePath("/admin/blogs");
  redirect("/admin/blogs");
}

export async function adminUpdateBlogOrder(id: string, order: number | null) {
  if (!id) throw new Error("ID is required to update order.");
  await updatePost(id, {
    homepage_order: order
  });
  revalidatePath("/");
  revalidatePath("/blogs");
  revalidatePath("/admin/blogs");
}

export async function adminDeleteBlog(id: string) {
  if (!id) throw new Error("ID is required to delete.");
  await deletePost(id);
  revalidatePath("/");
  revalidatePath("/blogs");
  revalidatePath("/admin/blogs");
}
