import { isSupabaseConfigured } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import fs from "fs";
import path from "path";

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  cover_image: string; // URL/Path to image
  cta_label: string;
  cta_href: string;
  placement: string; // 'home_hero' or 'popup'
  sort_order: number;
  is_active: boolean;
  starts_at?: string;
  ends_at?: string;
  created_at?: string;
  updated_at?: string;
}

const LOCAL_FILE_PATH = path.join(process.cwd(), "lib", "banners-data.json");

// Helper to read local JSON
function readLocalBanners(): Banner[] {
  try {
    if (!fs.existsSync(LOCAL_FILE_PATH)) {
      return [];
    }
    const fileContent = fs.readFileSync(LOCAL_FILE_PATH, "utf-8");
    return JSON.parse(fileContent);
  } catch (err) {
    console.error("Error reading local banners:", err);
    return [];
  }
}

// Helper to write local JSON
function writeLocalBanners(banners: Banner[]): void {
  try {
    fs.writeFileSync(LOCAL_FILE_PATH, JSON.stringify(banners, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing local banners:", err);
  }
}

export async function getBanners(includeInactive = false): Promise<Banner[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();
      let query = supabase.from("banners").select(`
        id,
        title,
        subtitle,
        cta_label,
        cta_href,
        placement,
        sort_order,
        is_active,
        starts_at,
        ends_at,
        image_id
      `);

      if (!includeInactive) {
        const now = new Date().toISOString();
        query = query
          .eq("is_active", true)
          .or(`starts_at.is.null,starts_at.lte.${now}`)
          .or(`ends_at.is.null,ends_at.gte.${now}`);
      }

      query = query.order("sort_order", { ascending: true });

      const { data, error } = await query;
      if (error) throw error;

      if (data) {
        // Fetch all media assets to map image paths
        const { data: mediaData } = await supabase.from("media_assets").select("id, path");
        const mediaMap = new Map(mediaData?.map((m) => [m.id, m.path]) || []);

        return data.map((item: any) => ({
          id: item.id,
          title: item.title,
          subtitle: item.subtitle || "",
          cta_label: item.cta_label || "",
          cta_href: item.cta_href || "",
          placement: item.placement,
          sort_order: item.sort_order || 0,
          is_active: item.is_active,
          starts_at: item.starts_at,
          ends_at: item.ends_at,
          cover_image: item.image_id && mediaMap.has(item.image_id)
            ? `/${mediaMap.get(item.image_id)}`
            : "/images/school details.jpg"
        }));
      }
    } catch (err) {
      console.warn("Supabase banners query failed, falling back to local storage:", err);
    }
  }

  // Local JSON fallback
  let localBanners = readLocalBanners();
  if (!includeInactive) {
    const now = new Date();
    localBanners = localBanners.filter((b) => {
      if (!b.is_active) return false;
      if (b.starts_at && new Date(b.starts_at) > now) return false;
      if (b.ends_at && new Date(b.ends_at) < now) return false;
      return true;
    });
  }
  return localBanners.sort((a, b) => a.sort_order - b.sort_order);
}

export async function createBanner(bannerData: Omit<Banner, "id">): Promise<Banner> {
  const newId = crypto.randomUUID();
  const newBanner: Banner = {
    ...bannerData,
    id: newId,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();
      
      let image_id: string | null = null;
      if (newBanner.cover_image) {
        const assetPath = newBanner.cover_image.replace(/^\//, "");
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
              alt_text: newBanner.title
            })
            .select("id")
            .single();
          if (!mediaErr && newMedia) {
            image_id = newMedia.id;
          }
        }
      }

      const { data, error } = await supabase
        .from("banners")
        .insert({
          id: newBanner.id,
          title: newBanner.title,
          subtitle: newBanner.subtitle,
          cta_label: newBanner.cta_label,
          cta_href: newBanner.cta_href,
          placement: newBanner.placement,
          sort_order: newBanner.sort_order,
          is_active: newBanner.is_active,
          starts_at: newBanner.starts_at || null,
          ends_at: newBanner.ends_at || null,
          image_id
        })
        .select()
        .single();

      if (error) throw error;
      if (data) {
        return newBanner;
      }
    } catch (err) {
      console.warn("Supabase create banner failed, falling back to local file:", err);
    }
  }

  const localBanners = readLocalBanners();
  localBanners.push(newBanner);
  writeLocalBanners(localBanners);
  return newBanner;
}

export async function deleteBanner(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();
      const { error } = await supabase.from("banners").delete().eq("id", id);
      if (error) throw error;
      return true;
    } catch (err) {
      console.warn("Supabase delete banner failed, falling back to local file:", err);
    }
  }

  const localBanners = readLocalBanners();
  const filteredBanners = localBanners.filter((b) => b.id !== id);
  if (localBanners.length === filteredBanners.length) {
    return false;
  }
  writeLocalBanners(filteredBanners);
  return true;
}
