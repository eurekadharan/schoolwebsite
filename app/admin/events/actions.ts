"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createEvent, updateEvent, deleteEvent } from "@/lib/events-store";

export async function adminCreateEvent(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const slug = String(formData.get("slug") || "").trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const starts_at = String(formData.get("starts_at") || "").trim();
  const ends_at = String(formData.get("ends_at") || "").trim() || undefined;
  const location = String(formData.get("location") || "").trim();
  const cover_image = String(formData.get("cover_image") || "").trim() || "/images/christmas celebration.jpg";
  const excerpt = String(formData.get("excerpt") || "").trim();
  const body = String(formData.get("body") || "").trim();
  const status = (formData.get("status") as "draft" | "published" | "archived") || "draft";

  if (!title || !starts_at) {
    throw new Error("Title and Start Date/Time are required.");
  }

  await createEvent({
    title,
    slug,
    starts_at,
    ends_at: ends_at || starts_at,
    location,
    cover_image,
    excerpt,
    body,
    status,
    published_at: status === "published" ? new Date().toISOString() : undefined
  });

  revalidatePath("/events");
  revalidatePath("/");
  revalidatePath("/admin/events");
  redirect("/admin/events");
}

export async function adminUpdateEvent(formData: FormData) {
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const starts_at = String(formData.get("starts_at") || "").trim();
  const ends_at = String(formData.get("ends_at") || "").trim() || undefined;
  const location = String(formData.get("location") || "").trim();
  const cover_image = String(formData.get("cover_image") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const body = String(formData.get("body") || "").trim();
  const status = formData.get("status") as "draft" | "published" | "archived";

  if (!id || !title || !starts_at) {
    throw new Error("ID, Title, and Start Date/Time are required.");
  }

  await updateEvent(id, {
    title,
    slug,
    starts_at,
    ends_at: ends_at || starts_at,
    location,
    cover_image,
    excerpt,
    body,
    status,
    published_at: status === "published" ? new Date().toISOString() : undefined
  });

  revalidatePath("/events");
  revalidatePath(`/events/${slug}`);
  revalidatePath("/");
  revalidatePath("/admin/events");
  redirect("/admin/events");
}

export async function adminDeleteEvent(id: string) {
  if (!id) throw new Error("ID is required to delete.");
  await deleteEvent(id);
  revalidatePath("/events");
  revalidatePath("/");
  revalidatePath("/admin/events");
}
