import { isSupabaseConfigured } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import fs from "fs";
import path from "path";

export interface Achievement {
  id: string;
  slug: string;
  title: string; // Student Name
  category: string; // Batch, e.g. "Batch 2056"
  summary: string; // Success Details / Role, e.g. "Registered Nurse, UK"
  body: string; // Detailed description
  cover_image: string; // Image path / URL
  achievement_date: string;
  status: "draft" | "published" | "archived";
  published_at?: string;
  created_at?: string;
  updated_at?: string;
}

const LOCAL_FILE_PATH = path.join(process.cwd(), "lib", "achievements-data.json");

// Helper to read local JSON
function readLocalAchievements(): Achievement[] {
  try {
    if (!fs.existsSync(LOCAL_FILE_PATH)) {
      return [];
    }
    const fileContent = fs.readFileSync(LOCAL_FILE_PATH, "utf-8");
    return JSON.parse(fileContent);
  } catch (err) {
    console.error("Error reading local achievements:", err);
    return [];
  }
}

// Helper to write local JSON
function writeLocalAchievements(achievements: Achievement[]): void {
  try {
    fs.writeFileSync(LOCAL_FILE_PATH, JSON.stringify(achievements, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing local achievements:", err);
  }
}

export async function getAchievements(includeDrafts = false): Promise<Achievement[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();
      let query = supabase.from("achievements").select(`
        id,
        slug,
        title,
        category,
        summary,
        body,
        achievement_date,
        status,
        published_at,
        image_id
      `);

      if (!includeDrafts) {
        query = query.eq("status", "published").lte("published_at", new Date().toISOString());
      }

      // Sort by achievement_date descending, then category descending
      query = query.order("achievement_date", { ascending: false });

      const { data, error } = await query;
      if (error) throw error;

      if (data) {
        // Fetch all media assets to map image paths
        const { data: mediaData } = await supabase.from("media_assets").select("id, path");
        const mediaMap = new Map(mediaData?.map((m) => [m.id, m.path]) || []);

        return data.map((item: any) => ({
          id: item.id,
          slug: item.slug,
          title: item.title,
          category: item.category || "",
          summary: item.summary || "",
          body: item.body ? (typeof item.body === "string" ? item.body : JSON.stringify(item.body)) : "",
          cover_image: item.image_id && mediaMap.has(item.image_id)
            ? `/${mediaMap.get(item.image_id)}`
            : "/images/staffs.jpg", // fallback to staff team or custom default
          achievement_date: item.achievement_date || "",
          status: item.status,
          published_at: item.published_at
        }));
      }
    } catch (err) {
      console.warn("Supabase achievements query failed, falling back to local storage:", err);
    }
  }

  // Local JSON fallback
  let localAchievements = readLocalAchievements();
  if (!includeDrafts) {
    localAchievements = localAchievements.filter(
      (a) => a.status === "published"
    );
  }
  // Sort by achievement_date desc, then by category desc
  return localAchievements.sort((a, b) => {
    const dateCompare = new Date(b.achievement_date).getTime() - new Date(a.achievement_date).getTime();
    if (dateCompare !== 0) return dateCompare;
    return b.category.localeCompare(a.category);
  });
}

export async function getAchievementBySlug(slug: string): Promise<Achievement | null> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();
      const { data, error } = await supabase
        .from("achievements")
        .select(`
          id,
          slug,
          title,
          category,
          summary,
          body,
          achievement_date,
          status,
          published_at,
          image_id
        `)
        .eq("slug", slug)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        let cover_image = "/images/staffs.jpg";
        if (data.image_id) {
          const { data: media } = await supabase
            .from("media_assets")
            .select("path")
            .eq("id", data.image_id)
            .maybeSingle();
          if (media) cover_image = `/${media.path}`;
        }

        return {
          id: data.id,
          slug: data.slug,
          title: data.title,
          category: data.category || "",
          summary: data.summary || "",
          body: data.body ? (typeof data.body === "string" ? data.body : JSON.stringify(data.body)) : "",
          cover_image,
          achievement_date: data.achievement_date || "",
          status: data.status,
          published_at: data.published_at
        };
      }
    } catch (err) {
      console.warn("Supabase single achievement query failed, falling back to local storage:", err);
    }
  }

  const localAchievements = readLocalAchievements();
  return localAchievements.find((a) => a.slug === slug) || null;
}

export async function getAchievementById(id: string): Promise<Achievement | null> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();
      const { data, error } = await supabase
        .from("achievements")
        .select(`
          id,
          slug,
          title,
          category,
          summary,
          body,
          achievement_date,
          status,
          published_at,
          image_id
        `)
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        let cover_image = "/images/staffs.jpg";
        if (data.image_id) {
          const { data: media } = await supabase
            .from("media_assets")
            .select("path")
            .eq("id", data.image_id)
            .maybeSingle();
          if (media) cover_image = `/${media.path}`;
        }

        return {
          id: data.id,
          slug: data.slug,
          title: data.title,
          category: data.category || "",
          summary: data.summary || "",
          body: data.body ? (typeof data.body === "string" ? data.body : JSON.stringify(data.body)) : "",
          cover_image,
          achievement_date: data.achievement_date || "",
          status: data.status,
          published_at: data.published_at
        };
      }
    } catch (err) {
      console.warn("Supabase getAchievementById query failed, falling back to local storage:", err);
    }
  }

  const localAchievements = readLocalAchievements();
  return localAchievements.find((a) => a.id === id) || null;
}

export async function createAchievement(achievementData: Omit<Achievement, "id">): Promise<Achievement> {
  const newId = crypto.randomUUID();
  const newAchievement: Achievement = {
    ...achievementData,
    id: newId,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();
      
      let image_id: string | null = null;
      if (newAchievement.cover_image) {
        const assetPath = newAchievement.cover_image.replace(/^\//, "");
        const { data: media } = await supabase
          .from("media_assets")
          .select("id")
          .eq("path", assetPath)
          .maybeSingle();

        if (media) {
          image_id = media.id;
        } else {
          const { data: newMedia, error: mediaErr } = await supabase
            .from("media_assets")
            .insert({
              bucket: "public-media",
              path: assetPath,
              alt_text: newAchievement.title
            })
            .select("id")
            .single();
          if (!mediaErr && newMedia) {
            image_id = newMedia.id;
          }
        }
      }

      const { data, error } = await supabase
        .from("achievements")
        .insert({
          id: newAchievement.id,
          slug: newAchievement.slug,
          title: newAchievement.title,
          category: newAchievement.category,
          summary: newAchievement.summary,
          body: newAchievement.body,
          achievement_date: newAchievement.achievement_date || new Date().toISOString().split("T")[0],
          status: newAchievement.status,
          published_at: newAchievement.published_at || (newAchievement.status === "published" ? new Date().toISOString() : null),
          image_id
        })
        .select()
        .single();

      if (error) throw error;
      if (data) {
        return newAchievement;
      }
    } catch (err) {
      console.warn("Supabase create achievement failed, falling back to local file:", err);
    }
  }

  // Local JSON fallback
  const localAchievements = readLocalAchievements();
  localAchievements.push(newAchievement);
  writeLocalAchievements(localAchievements);
  return newAchievement;
}

export async function updateAchievement(id: string, updatedFields: Partial<Achievement>): Promise<Achievement> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();

      let image_id: string | undefined;
      if (updatedFields.cover_image !== undefined) {
        if (updatedFields.cover_image === "") {
          image_id = undefined;
        } else {
          const assetPath = updatedFields.cover_image.replace(/^\//, "");
          const { data: media } = await supabase
            .from("media_assets")
            .select("id")
            .eq("path", assetPath)
            .maybeSingle();

          if (media) {
            image_id = media.id;
          } else {
            const { data: newMedia, error: mediaErr } = await supabase
              .from("media_assets")
              .insert({
                bucket: "public-media",
                path: assetPath,
                alt_text: updatedFields.title || "Achievement Image"
              })
              .select("id")
              .single();
            if (!mediaErr && newMedia) {
              image_id = newMedia.id;
            }
          }
        }
      }

      const dbUpdate: any = {
        updated_at: new Date().toISOString()
      };
      if (updatedFields.slug !== undefined) dbUpdate.slug = updatedFields.slug;
      if (updatedFields.title !== undefined) dbUpdate.title = updatedFields.title;
      if (updatedFields.category !== undefined) dbUpdate.category = updatedFields.category;
      if (updatedFields.summary !== undefined) dbUpdate.summary = updatedFields.summary;
      if (updatedFields.body !== undefined) dbUpdate.body = updatedFields.body;
      if (updatedFields.achievement_date !== undefined) dbUpdate.achievement_date = updatedFields.achievement_date;
      if (updatedFields.status !== undefined) {
        dbUpdate.status = updatedFields.status;
        if (updatedFields.status === "published") {
          dbUpdate.published_at = updatedFields.published_at || new Date().toISOString();
        }
      }
      if (image_id !== undefined) dbUpdate.image_id = image_id;

      const { error } = await supabase
        .from("achievements")
        .update(dbUpdate)
        .eq("id", id);

      if (error) throw error;
    } catch (err) {
      console.warn("Supabase update achievement failed, falling back to local file:", err);
    }
  }

  // Local JSON fallback
  const localAchievements = readLocalAchievements();
  const index = localAchievements.findIndex((a) => a.id === id);
  if (index === -1) {
    throw new Error(`Achievement with ID ${id} not found.`);
  }

  const updatedAchievement: Achievement = {
    ...localAchievements[index],
    ...updatedFields,
    updated_at: new Date().toISOString()
  };

  localAchievements[index] = updatedAchievement;
  writeLocalAchievements(localAchievements);
  return updatedAchievement;
}

export async function deleteAchievement(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();
      const { error } = await supabase.from("achievements").delete().eq("id", id);
      if (error) throw error;
      return true;
    } catch (err) {
      console.warn("Supabase delete achievement failed, falling back to local file:", err);
    }
  }

  const localAchievements = readLocalAchievements();
  const filteredAchievements = localAchievements.filter((a) => a.id !== id);
  if (localAchievements.length === filteredAchievements.length) {
    return false;
  }
  writeLocalAchievements(filteredAchievements);
  return true;
}
