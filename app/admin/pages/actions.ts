"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { updatePage } from "@/lib/pages-store";
import { isSupabaseConfigured } from "@/lib/env";
import { getBanners } from "@/lib/banners-store";
import { getPages } from "@/lib/pages-store";
import { getPosts } from "@/lib/posts-store";
import { getEvents } from "@/lib/events-store";
import { getAchievements } from "@/lib/achievements-store";
import { getGalleryItems } from "@/lib/gallery-store";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function adminUpdateAboutPage(formData: FormData) {
  const vision = String(formData.get("vision") || "").trim();
  const mission = String(formData.get("mission") || "").trim();
  const motto = String(formData.get("motto") || "").trim();

  // History paragraphs
  const history1 = String(formData.get("history_p1") || "").trim();
  const history2 = String(formData.get("history_p2") || "").trim();
  const history3 = String(formData.get("history_p3") || "").trim();
  const history_paragraphs = [history1, history2, history3].filter(Boolean);

  // Principal message
  const principal_name = String(formData.get("principal_name") || "").trim();
  const principal_qualification = String(formData.get("principal_qualification") || "").trim();
  const principal_image = String(formData.get("principal_image") || "").trim();
  const principal_p1 = String(formData.get("principal_p1") || "").trim();
  const principal_p2 = String(formData.get("principal_p2") || "").trim();
  const principal_p3 = String(formData.get("principal_p3") || "").trim();
  const principal_message_paragraphs = [principal_p1, principal_p2, principal_p3].filter(Boolean);

  // Secondary Coordinator (Coordinator 9-10)
  const coord_sec_name = String(formData.get("coord_sec_name") || "").trim();
  const coord_sec_qualification = String(formData.get("coord_sec_qualification") || "").trim();
  const coord_sec_image = String(formData.get("coord_sec_image") || "").trim();
  const coord_sec_p1 = String(formData.get("coord_sec_p1") || "").trim();
  const coord_sec_p2 = String(formData.get("coord_sec_p2") || "").trim();
  const coord_sec_message_paragraphs = [coord_sec_p1, coord_sec_p2].filter(Boolean);

  // Basic Coordinator (Coordinator 6-8)
  const coord_bas_name = String(formData.get("coord_bas_name") || "").trim();
  const coord_bas_qualification = String(formData.get("coord_bas_qualification") || "").trim();
  const coord_bas_image = String(formData.get("coord_bas_image") || "").trim();
  const coord_bas_p1 = String(formData.get("coord_bas_p1") || "").trim();
  const coord_bas_p2 = String(formData.get("coord_bas_p2") || "").trim();
  const coord_bas_message_paragraphs = [coord_bas_p1, coord_bas_p2].filter(Boolean);

  // New Key Personnel Fields
  const director_name = String(formData.get("director_name") || "").trim();
  const director_qualification = String(formData.get("director_qualification") || "").trim();
  const director_image = String(formData.get("director_image") || "").trim();

  const academic_director_name = String(formData.get("academic_director_name") || "").trim();
  const academic_director_qualification = String(formData.get("academic_director_qualification") || "").trim();
  const academic_director_image = String(formData.get("academic_director_image") || "").trim();

  const coord_1_5_name = String(formData.get("coord_1_5_name") || "").trim();
  const coord_1_5_qualification = String(formData.get("coord_1_5_qualification") || "").trim();
  const coord_1_5_image = String(formData.get("coord_1_5_image") || "").trim();

  const incharge_1_2_name = String(formData.get("incharge_1_2_name") || "").trim();
  const incharge_1_2_qualification = String(formData.get("incharge_1_2_qualification") || "").trim();
  const incharge_1_2_image = String(formData.get("incharge_1_2_image") || "").trim();

  const montessori_name = String(formData.get("montessori_name") || "").trim();
  const montessori_qualification = String(formData.get("montessori_qualification") || "").trim();
  const montessori_image = String(formData.get("montessori_image") || "").trim();

  const plus_two_name = String(formData.get("plus_two_name") || "").trim();
  const plus_two_qualification = String(formData.get("plus_two_qualification") || "").trim();
  const plus_two_image = String(formData.get("plus_two_image") || "").trim();

  const updatedBody = {
    vision,
    mission,
    motto,
    history_paragraphs,
    principal: {
      name: principal_name,
      qualification: principal_qualification,
      image_url: principal_image || "/images/principal.jpg",
      message_paragraphs: principal_message_paragraphs
    },
    coordinators: [
      {
        name: director_name,
        role: "Director",
        qualification: director_qualification,
        image_url: director_image,
        level_label: "Director",
        message_paragraphs: []
      },
      {
        name: principal_name,
        role: "Principal",
        qualification: principal_qualification,
        image_url: principal_image || "/images/principal.jpg",
        level_label: "Principal's Desk",
        message_paragraphs: principal_message_paragraphs
      },
      {
        name: academic_director_name,
        role: "Academic Director",
        qualification: academic_director_qualification,
        image_url: academic_director_image,
        level_label: "Academic Director",
        message_paragraphs: []
      },
      {
        name: plus_two_name,
        role: "+2 Coordinator",
        qualification: plus_two_qualification,
        image_url: plus_two_image,
        level_label: "Plus Two Coordinator",
        message_paragraphs: []
      },
      {
        name: coord_sec_name,
        role: "Coordinator 9-10",
        qualification: coord_sec_qualification,
        image_url: coord_sec_image || "/images/bijay kumar shrestha.png",
        level_label: "Secondary Level (Grade 9 - 10)",
        message_paragraphs: coord_sec_message_paragraphs
      },
      {
        name: coord_bas_name,
        role: "Coordinator 6-8",
        qualification: coord_bas_qualification,
        image_url: coord_bas_image || "/images/bhuwan sanjel.jpeg",
        level_label: "Basic Level (Grade 6 - 8)",
        message_paragraphs: coord_bas_message_paragraphs
      },
      {
        name: coord_1_5_name,
        role: "Coordinator 1-5",
        qualification: coord_1_5_qualification,
        image_url: coord_1_5_image || "/images/KB Rai.jpg",
        level_label: "Primary Level (Grade 1 - 5)",
        message_paragraphs: []
      },
      {
        name: incharge_1_2_name,
        role: "Incharge 1-2",
        qualification: incharge_1_2_qualification,
        image_url: incharge_1_2_image || "/images/Anu Shakya.jpg",
        level_label: "Primary Incharge (Grade 1 - 2)",
        message_paragraphs: []
      },
      {
        name: montessori_name,
        role: "Montessori Coordinator",
        qualification: montessori_qualification,
        image_url: montessori_image || "/images/Indu Rai.jpg",
        level_label: "Montessori Wing",
        message_paragraphs: []
      }
    ]
  };

  await updatePage("about", {
    body: updatedBody
  });

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/admin/pages");
  redirect("/admin/pages");
}

export async function adminUpdateLifeAtEurekaPage(formData: FormData) {
  const sports = JSON.parse(String(formData.get("sports_json") || "[]"));
  const clubs = JSON.parse(String(formData.get("clubs_json") || "[]"));
  const gallery = JSON.parse(String(formData.get("gallery_json") || "[]"));
  const videos = JSON.parse(String(formData.get("videos_json") || "[]"));

  const updatedBody = {
    sports,
    clubs,
    gallery,
    videos
  };

  await updatePage("life-at-eureka", {
    body: updatedBody
  });

  revalidatePath("/");
  revalidatePath("/life-at-eureka");
  revalidatePath("/admin/pages");
  redirect("/admin/pages");
}

export async function getAdminDashboardCountsAction() {
  let counts = {
    admissions: 0,
    contacts: 0,
    inquiries: 0,
    banners: 0,
    pages: 0,
    blogs: 0,
    notices: 0,
    events: 0,
    achievements: 0,
    gallery: 0,
    media: 0
  };

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();
      
      const [
        admissionsRes,
        contactsRes,
        inquiriesRes,
        bannersRes,
        pagesRes,
        postsRes,
        eventsRes,
        achievementsRes,
        galleryRes,
        mediaRes
      ] = await Promise.all([
        supabase.from("admission_submissions").select("id", { count: "exact", head: true }).neq("status", "archived"),
        supabase.from("contact_submissions").select("id", { count: "exact", head: true }).neq("status", "archived"),
        supabase.from("inquiry_submissions").select("id", { count: "exact", head: true }).neq("status", "archived"),
        supabase.from("banners").select("id", { count: "exact", head: true }),
        supabase.from("pages").select("id", { count: "exact", head: true }),
        supabase.from("posts").select("id, type"),
        supabase.from("events").select("id", { count: "exact", head: true }),
        supabase.from("achievements").select("id", { count: "exact", head: true }),
        supabase.from("gallery_items").select("id", { count: "exact", head: true }),
        supabase.from("media_assets").select("id", { count: "exact", head: true })
      ]);

      counts.admissions = admissionsRes.count ?? 0;
      counts.contacts = contactsRes.count ?? 0;
      counts.inquiries = inquiriesRes.count ?? 0;
      counts.banners = bannersRes.count ?? 0;
      counts.pages = pagesRes.count ?? 0;
      if (postsRes.data) {
        counts.blogs = postsRes.data.filter((p: any) => p.type === "blog").length;
        counts.notices = postsRes.data.filter((p: any) => p.type === "notice").length;
      }
      counts.events = eventsRes.count ?? 0;
      counts.achievements = achievementsRes.count ?? 0;
      counts.gallery = galleryRes.count ?? 0;
      counts.media = mediaRes.count ?? 0;
    } catch (e) {
      console.error("Failed to fetch counts from Supabase:", e);
    }
  }

  // Fallback to local files if Supabase is not configured or queries returned 0/empty
  if (!isSupabaseConfigured() || counts.banners === 0) {
    try {
      counts.banners = (await getBanners(true)).length;
    } catch (e) {}
  }
  if (!isSupabaseConfigured() || counts.pages === 0) {
    try {
      counts.pages = (await getPages()).length;
    } catch (e) {}
  }
  if (!isSupabaseConfigured() || counts.blogs === 0) {
    try {
      const posts = await getPosts(undefined, true);
      counts.blogs = posts.filter(p => p.type === "blog").length;
      counts.notices = posts.filter(p => p.type === "notice").length;
    } catch (e) {}
  }
  if (!isSupabaseConfigured() || counts.events === 0) {
    try {
      counts.events = (await getEvents(true)).length;
    } catch (e) {}
  }
  if (!isSupabaseConfigured() || counts.achievements === 0) {
    try {
      counts.achievements = (await getAchievements(true)).length;
    } catch (e) {}
  }
  if (!isSupabaseConfigured() || counts.gallery === 0) {
    try {
      counts.gallery = (await getGalleryItems(true)).length;
    } catch (e) {}
  }

  return counts;
}
