import { isSupabaseConfigured } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import fs from "fs";
import path from "path";

export interface GalleryItem {
  id: string;
  title: string;
  cover_image: string; // URL/Path to image
  album: string; // Category
  sort_order: number;
  is_featured: boolean;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

const LOCAL_FILE_PATH = path.join(process.cwd(), "lib", "gallery-data.json");

// Helper to read local JSON
function readLocalGallery(): GalleryItem[] {
  try {
    if (!fs.existsSync(LOCAL_FILE_PATH)) {
      return [];
    }
    const fileContent = fs.readFileSync(LOCAL_FILE_PATH, "utf-8");
    return JSON.parse(fileContent);
  } catch (err) {
    console.error("Error reading local gallery:", err);
    return [];
  }
}

// Helper to write local JSON
function writeLocalGallery(items: GalleryItem[]): void {
  try {
    fs.writeFileSync(LOCAL_FILE_PATH, JSON.stringify(items, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing local gallery:", err);
  }
}

export async function getGalleryItems(includeInactive = false): Promise<GalleryItem[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();
      let query = supabase.from("gallery_items").select(`
        id,
        title,
        album,
        sort_order,
        is_featured,
        is_active,
        image_id
      `);

      if (!includeInactive) {
        query = query.eq("is_active", true);
      }

      query = query.order("sort_order", { ascending: true }).order("created_at", { ascending: false });

      const { data, error } = await query;
      if (error) throw error;

      if (data) {
        // Fetch all media assets to map image paths
        const { data: mediaData } = await supabase.from("media_assets").select("id, bucket, path");
        const mediaMap = new Map<string, { bucket: string; path: string }>(
          mediaData?.map((m) => [m.id, { bucket: m.bucket, path: m.path }]) || []
        );

        return data.map((item: any) => {
          let cover_image = "/images/school details.jpg";
          if (item.image_id && mediaMap.has(item.image_id)) {
            const media = mediaMap.get(item.image_id)!;
            cover_image = media.bucket === "external"
              ? media.path
              : (media.path.startsWith("/") ? media.path : `/${media.path}`);
          }

          return {
            id: item.id,
            title: item.title,
            album: item.album || "General",
            sort_order: item.sort_order || 0,
            is_featured: item.is_featured || false,
            is_active: item.is_active || false,
            cover_image,
          };
        });
      }
    } catch (err) {
      console.warn("Supabase gallery items query failed, falling back to local storage:", err);
    }
  }

  // Local fallback
  let localItems = readLocalGallery();
  if (!includeInactive) {
    localItems = localItems.filter((i) => i.is_active);
  }
  return localItems.sort((a, b) => a.sort_order - b.sort_order);
}

export async function getGalleryItemById(id: string): Promise<GalleryItem | null> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();
      const { data, error } = await supabase
        .from("gallery_items")
        .select(`
          id,
          title,
          album,
          sort_order,
          is_featured,
          is_active,
          image_id
        `)
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        let cover_image = "/images/school details.jpg";
        if (data.image_id) {
          const { data: media } = await supabase
            .from("media_assets")
            .select("bucket, path")
            .eq("id", data.image_id)
            .maybeSingle();
          if (media) {
            cover_image = media.bucket === "external"
              ? media.path
              : (media.path.startsWith("/") ? media.path : `/${media.path}`);
          }
        }

        return {
          id: data.id,
          title: data.title,
          album: data.album || "General",
          sort_order: data.sort_order || 0,
          is_featured: data.is_featured || false,
          is_active: data.is_active || false,
          cover_image,
        };
      }
    } catch (err) {
      console.warn("Supabase getGalleryItemById failed, falling back to local storage:", err);
    }
  }

  const localItems = readLocalGallery();
  return localItems.find((i) => i.id === id) || null;
}

export async function createGalleryItem(itemData: Omit<GalleryItem, "id">): Promise<GalleryItem> {
  const newId = crypto.randomUUID();
  const newItem: GalleryItem = {
    ...itemData,
    id: newId,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();

      let image_id: string | null = null;
      if (newItem.cover_image) {
        let bucket = "public-media";
        let pathStr = newItem.cover_image;
        if (pathStr.startsWith("http://") || pathStr.startsWith("https://")) {
          bucket = "external";
        } else {
          pathStr = pathStr.replace(/^\//, "");
        }

        const { data: media } = await supabase
          .from("media_assets")
          .select("id")
          .eq("bucket", bucket)
          .eq("path", pathStr)
          .maybeSingle();

        if (media) {
          image_id = media.id;
        } else {
          const { data: newMedia, error: mediaErr } = await supabase
            .from("media_assets")
            .insert({
              bucket,
              path: pathStr,
              alt_text: newItem.title,
            })
            .select("id")
            .single();

          if (!mediaErr && newMedia) {
            image_id = newMedia.id;
          }
        }
      }

      const { data, error } = await supabase
        .from("gallery_items")
        .insert({
          id: newItem.id,
          title: newItem.title,
          album: newItem.album,
          sort_order: newItem.sort_order,
          is_featured: newItem.is_featured,
          is_active: newItem.is_active,
          image_id,
        })
        .select()
        .single();

      if (error) throw error;
      if (data) {
        return newItem;
      }
    } catch (err) {
      console.warn("Supabase createGalleryItem failed, falling back to local file:", err);
    }
  }

  const localItems = readLocalGallery();
  localItems.push(newItem);
  writeLocalGallery(localItems);
  return newItem;
}

export async function updateGalleryItem(id: string, updatedFields: Partial<GalleryItem>): Promise<GalleryItem> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();

      let image_id: string | undefined | null;
      if (updatedFields.cover_image !== undefined) {
        if (updatedFields.cover_image === "") {
          image_id = null;
        } else {
          let bucket = "public-media";
          let pathStr = updatedFields.cover_image;
          if (pathStr.startsWith("http://") || pathStr.startsWith("https://")) {
            bucket = "external";
          } else {
            pathStr = pathStr.replace(/^\//, "");
          }

          const { data: media } = await supabase
            .from("media_assets")
            .select("id")
            .eq("bucket", bucket)
            .eq("path", pathStr)
            .maybeSingle();

          if (media) {
            image_id = media.id;
          } else {
            const { data: newMedia, error: mediaErr } = await supabase
              .from("media_assets")
              .insert({
                bucket,
                path: pathStr,
                alt_text: updatedFields.title || "Gallery Image",
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
        updated_at: new Date().toISOString(),
      };
      if (updatedFields.title !== undefined) dbUpdate.title = updatedFields.title;
      if (updatedFields.album !== undefined) dbUpdate.album = updatedFields.album;
      if (updatedFields.sort_order !== undefined) dbUpdate.sort_order = updatedFields.sort_order;
      if (updatedFields.is_featured !== undefined) dbUpdate.is_featured = updatedFields.is_featured;
      if (updatedFields.is_active !== undefined) dbUpdate.is_active = updatedFields.is_active;
      if (image_id !== undefined) dbUpdate.image_id = image_id;

      const { data, error } = await supabase
        .from("gallery_items")
        .update(dbUpdate)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      if (data) {
        const updatedItem = await getGalleryItemById(id);
        if (updatedItem) return updatedItem;
      }
    } catch (err) {
      console.warn("Supabase updateGalleryItem failed, falling back to local file:", err);
    }
  }

  const localItems = readLocalGallery();
  const index = localItems.findIndex((i) => i.id === id);
  if (index === -1) {
    throw new Error(`Gallery item with ID ${id} not found.`);
  }

  const updatedItem: GalleryItem = {
    ...localItems[index],
    ...updatedFields,
    updated_at: new Date().toISOString(),
  };

  localItems[index] = updatedItem;
  writeLocalGallery(localItems);
  return updatedItem;
}

export async function deleteGalleryItem(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();
      const { error } = await supabase.from("gallery_items").delete().eq("id", id);
      if (error) throw error;
      return true;
    } catch (err) {
      console.warn("Supabase deleteGalleryItem failed, falling back to local file:", err);
    }
  }

  const localItems = readLocalGallery();
  const filtered = localItems.filter((i) => i.id !== id);
  if (localItems.length === filtered.length) {
    return false;
  }
  writeLocalGallery(filtered);
  return true;
}
