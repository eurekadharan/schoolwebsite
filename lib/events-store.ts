import { isSupabaseConfigured } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import fs from "fs";
import path from "path";

export interface Event {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover_image: string; // URL/Path to image
  location: string;
  starts_at: string;
  ends_at: string;
  status: "draft" | "published" | "archived";
  published_at?: string;
  created_at?: string;
  updated_at?: string;
}

const LOCAL_FILE_PATH = path.join(process.cwd(), "lib", "events-data.json");

// Helper to read local JSON
function readLocalEvents(): Event[] {
  try {
    if (!fs.existsSync(LOCAL_FILE_PATH)) {
      return [];
    }
    const fileContent = fs.readFileSync(LOCAL_FILE_PATH, "utf-8");
    return JSON.parse(fileContent);
  } catch (err) {
    console.error("Error reading local events:", err);
    return [];
  }
}

// Helper to write local JSON
function writeLocalEvents(events: Event[]): void {
  try {
    fs.writeFileSync(LOCAL_FILE_PATH, JSON.stringify(events, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing local events:", err);
  }
}

export async function getEvents(includeDrafts = false): Promise<Event[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();
      let query = supabase.from("events").select(`
        id,
        slug,
        title,
        excerpt,
        body,
        location,
        starts_at,
        ends_at,
        status,
        published_at,
        cover_image_id
      `);

      if (!includeDrafts) {
        query = query.eq("status", "published").lte("published_at", new Date().toISOString());
      }

      // Sort by starts_at descending (newest events first)
      query = query.order("starts_at", { ascending: false });

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
          excerpt: item.excerpt || "",
          body: typeof item.body === "string" ? item.body : JSON.stringify(item.body) || "",
          cover_image: item.cover_image_id && mediaMap.has(item.cover_image_id)
            ? `/${mediaMap.get(item.cover_image_id)}`
            : "/images/christmas celebration.jpg",
          location: item.location || "",
          starts_at: item.starts_at,
          ends_at: item.ends_at,
          status: item.status,
          published_at: item.published_at
        }));
      }
    } catch (err) {
      console.warn("Supabase query failed, falling back to local storage:", err);
    }
  }

  // Local JSON fallback
  let localEvents = readLocalEvents();
  if (!includeDrafts) {
    localEvents = localEvents.filter(
      (e) => e.status === "published" && new Date(e.starts_at) <= new Date()
    );
  }
  return localEvents.sort((a, b) => new Date(b.starts_at).getTime() - new Date(a.starts_at).getTime());
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();
      const { data, error } = await supabase
        .from("events")
        .select(`
          id,
          slug,
          title,
          excerpt,
          body,
          location,
          starts_at,
          ends_at,
          status,
          published_at,
          cover_image_id
        `)
        .eq("slug", slug)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        let cover_image = "/images/christmas celebration.jpg";
        if (data.cover_image_id) {
          const { data: media } = await supabase
            .from("media_assets")
            .select("path")
            .eq("id", data.cover_image_id)
            .maybeSingle();
          if (media) cover_image = `/${media.path}`;
        }

        return {
          id: data.id,
          slug: data.slug,
          title: data.title,
          excerpt: data.excerpt || "",
          body: typeof data.body === "string" ? data.body : JSON.stringify(data.body) || "",
          cover_image,
          location: data.location || "",
          starts_at: data.starts_at,
          ends_at: data.ends_at,
          status: data.status,
          published_at: data.published_at
        };
      }
    } catch (err) {
      console.warn("Supabase single query failed, falling back to local storage:", err);
    }
  }

  const localEvents = readLocalEvents();
  return localEvents.find((e) => e.slug === slug) || null;
}

export async function getEventById(id: string): Promise<Event | null> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();
      const { data, error } = await supabase
        .from("events")
        .select(`
          id,
          slug,
          title,
          excerpt,
          body,
          location,
          starts_at,
          ends_at,
          status,
          published_at,
          cover_image_id
        `)
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        let cover_image = "/images/christmas celebration.jpg";
        if (data.cover_image_id) {
          const { data: media } = await supabase
            .from("media_assets")
            .select("path")
            .eq("id", data.cover_image_id)
            .maybeSingle();
          if (media) cover_image = `/${media.path}`;
        }

        return {
          id: data.id,
          slug: data.slug,
          title: data.title,
          excerpt: data.excerpt || "",
          body: typeof data.body === "string" ? data.body : JSON.stringify(data.body) || "",
          cover_image,
          location: data.location || "",
          starts_at: data.starts_at,
          ends_at: data.ends_at,
          status: data.status,
          published_at: data.published_at
        };
      }
    } catch (err) {
      console.warn("Supabase getById query failed, falling back to local storage:", err);
    }
  }

  const localEvents = readLocalEvents();
  return localEvents.find((e) => e.id === id) || null;
}

export async function createEvent(eventData: Omit<Event, "id">): Promise<Event> {
  const newId = crypto.randomUUID();
  const newEvent: Event = {
    ...eventData,
    id: newId,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();
      
      // Attempt to find or create a media asset for the cover image
      let cover_image_id: string | null = null;
      if (newEvent.cover_image) {
        // Strip leading slash if present
        const assetPath = newEvent.cover_image.replace(/^\//, "");
        const { data: media } = await supabase
          .from("media_assets")
          .select("id")
          .eq("path", assetPath)
          .maybeSingle();

        if (media) {
          cover_image_id = media.id;
        } else {
          // Insert a new media asset record
          const { data: newMedia, error: mediaErr } = await supabase
            .from("media_assets")
            .insert({
              bucket: "public-media",
              path: assetPath,
              alt_text: newEvent.title
            })
            .select("id")
            .single();
          if (!mediaErr && newMedia) {
            cover_image_id = newMedia.id;
          }
        }
      }

      const { data, error } = await supabase
        .from("events")
        .insert({
          id: newEvent.id,
          slug: newEvent.slug,
          title: newEvent.title,
          excerpt: newEvent.excerpt,
          body: newEvent.body,
          location: newEvent.location,
          starts_at: newEvent.starts_at,
          ends_at: newEvent.ends_at,
          status: newEvent.status,
          published_at: newEvent.published_at || (newEvent.status === "published" ? new Date().toISOString() : null),
          cover_image_id
        })
        .select()
        .single();

      if (error) throw error;
      if (data) {
        return newEvent;
      }
    } catch (err) {
      console.warn("Supabase create failed, falling back to local file:", err);
    }
  }

  // Local JSON fallback
  const localEvents = readLocalEvents();
  localEvents.push(newEvent);
  writeLocalEvents(localEvents);
  return newEvent;
}

export async function updateEvent(id: string, updatedFields: Partial<Event>): Promise<Event> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();

      let cover_image_id: string | undefined;
      if (updatedFields.cover_image !== undefined) {
        if (updatedFields.cover_image === "") {
          cover_image_id = undefined;
        } else {
          const assetPath = updatedFields.cover_image.replace(/^\//, "");
          const { data: media } = await supabase
            .from("media_assets")
            .select("id")
            .eq("path", assetPath)
            .maybeSingle();

          if (media) {
            cover_image_id = media.id;
          } else {
            const { data: newMedia, error: mediaErr } = await supabase
              .from("media_assets")
              .insert({
                bucket: "public-media",
                path: assetPath,
                alt_text: updatedFields.title || "Event Image"
              })
              .select("id")
              .single();
            if (!mediaErr && newMedia) {
              cover_image_id = newMedia.id;
            }
          }
        }
      }

      const dbUpdate: any = {
        updated_at: new Date().toISOString()
      };
      if (updatedFields.slug !== undefined) dbUpdate.slug = updatedFields.slug;
      if (updatedFields.title !== undefined) dbUpdate.title = updatedFields.title;
      if (updatedFields.excerpt !== undefined) dbUpdate.excerpt = updatedFields.excerpt;
      if (updatedFields.body !== undefined) dbUpdate.body = updatedFields.body;
      if (updatedFields.location !== undefined) dbUpdate.location = updatedFields.location;
      if (updatedFields.starts_at !== undefined) dbUpdate.starts_at = updatedFields.starts_at;
      if (updatedFields.ends_at !== undefined) dbUpdate.ends_at = updatedFields.ends_at;
      if (updatedFields.status !== undefined) {
        dbUpdate.status = updatedFields.status;
        if (updatedFields.status === "published") {
          dbUpdate.published_at = updatedFields.published_at || new Date().toISOString();
        }
      }
      if (cover_image_id !== undefined) dbUpdate.cover_image_id = cover_image_id;

      const { data, error } = await supabase
        .from("events")
        .update(dbUpdate)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
    } catch (err) {
      console.warn("Supabase update failed, falling back to local file:", err);
    }
  }

  // Local JSON fallback
  const localEvents = readLocalEvents();
  const index = localEvents.findIndex((e) => e.id === id);
  if (index === -1) {
    throw new Error(`Event with ID ${id} not found.`);
  }

  const updatedEvent: Event = {
    ...localEvents[index],
    ...updatedFields,
    updated_at: new Date().toISOString()
  };

  localEvents[index] = updatedEvent;
  writeLocalEvents(localEvents);
  return updatedEvent;
}

export async function deleteEvent(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) throw error;
      return true;
    } catch (err) {
      console.warn("Supabase delete failed, falling back to local file:", err);
    }
  }

  const localEvents = readLocalEvents();
  const filteredEvents = localEvents.filter((e) => e.id !== id);
  if (localEvents.length === filteredEvents.length) {
    return false;
  }
  writeLocalEvents(filteredEvents);
  return true;
}
