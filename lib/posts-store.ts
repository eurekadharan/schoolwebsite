import { isSupabaseConfigured } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import fs from "fs";
import path from "path";

export interface Post {
  id: string;
  type: "blog" | "notice" | "news";
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover_image: string; // URL/Path to image
  homepage_order?: number | null;
  status: "draft" | "published" | "archived";
  pinned: boolean;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
}

const LOCAL_FILE_PATH = path.join(process.cwd(), "lib", "posts-data.json");

// Helper to read local JSON
function readLocalPosts(): Post[] {
  try {
    if (!fs.existsSync(LOCAL_FILE_PATH)) {
      return [];
    }
    const fileContent = fs.readFileSync(LOCAL_FILE_PATH, "utf-8");
    return JSON.parse(fileContent);
  } catch (err) {
    console.error("Error reading local posts:", err);
    return [];
  }
}

// Helper to write local JSON
function writeLocalPosts(posts: Post[]): void {
  try {
    fs.writeFileSync(LOCAL_FILE_PATH, JSON.stringify(posts, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing local posts:", err);
  }
}

export async function getPosts(type?: "blog" | "notice" | "news", includeDrafts = false): Promise<Post[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();
      let query = supabase.from("posts").select(`
        id,
        type,
        slug,
        title,
        excerpt,
        body,
        status,
        pinned,
        published_at,
        homepage_order,
        cover_image_id
      `);

      if (type) {
        query = query.eq("type", type);
      }

      if (!includeDrafts) {
        query = query.eq("status", "published").lte("published_at", new Date().toISOString());
      }

      // Order resolution:
      // For blogs: we want to order by homepage_order ascending (nulls last) or published_at descending.
      // SQL: ORDER BY homepage_order ASC NULLS LAST, published_at DESC.
      // With Supabase client:
      if (type === "blog") {
        query = query
          .order("homepage_order", { ascending: true, nullsFirst: false })
          .order("published_at", { ascending: false });
      } else {
        query = query.order("published_at", { ascending: false });
      }

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
          if (item.cover_image_id && mediaMap.has(item.cover_image_id)) {
            const media = mediaMap.get(item.cover_image_id)!;
            cover_image = media.bucket === "external"
              ? media.path
              : (media.path.startsWith("/") ? media.path : `/${media.path}`);
          }

          // In case the body was saved as a serialized JSON string or double quoted string
          let rawBody = item.body;
          if (typeof rawBody !== "string") {
            rawBody = JSON.stringify(rawBody);
          }
          // Strip surrounding quotes if it is a JSON-encoded string
          if (rawBody.startsWith('"') && rawBody.endsWith('"')) {
            try {
              rawBody = JSON.parse(rawBody);
            } catch {
              // use as is
            }
          }

          return {
            id: item.id,
            type: item.type,
            slug: item.slug,
            title: item.title,
            excerpt: item.excerpt || "",
            body: rawBody,
            cover_image,
            homepage_order: item.homepage_order,
            status: item.status,
            pinned: item.pinned || false,
            published_at: item.published_at,
          };
        });
      }
    } catch (err) {
      console.warn("Supabase posts query failed, falling back to local storage:", err);
    }
  }

  // Local fallback
  let localPosts = readLocalPosts();
  if (type) {
    localPosts = localPosts.filter((p) => p.type === type);
  }
  if (!includeDrafts) {
    const now = new Date();
    localPosts = localPosts.filter(
      (p) => p.status === "published" && (!p.published_at || new Date(p.published_at) <= now)
    );
  }

  // Sorting
  if (type === "blog") {
    return localPosts.sort((a, b) => {
      // Sort homepage_order (nulls last)
      const aOrder = a.homepage_order != null ? a.homepage_order : Infinity;
      const bOrder = b.homepage_order != null ? b.homepage_order : Infinity;
      if (aOrder !== bOrder) {
        return aOrder - bOrder;
      }
      // Then publish date desc
      const aTime = a.published_at ? new Date(a.published_at).getTime() : 0;
      const bTime = b.published_at ? new Date(b.published_at).getTime() : 0;
      return bTime - aTime;
    });
  } else {
    return localPosts.sort((a, b) => {
      const aTime = a.published_at ? new Date(a.published_at).getTime() : 0;
      const bTime = b.published_at ? new Date(b.published_at).getTime() : 0;
      return bTime - aTime;
    });
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();
      const { data, error } = await supabase
        .from("posts")
        .select(`
          id,
          type,
          slug,
          title,
          excerpt,
          body,
          status,
          pinned,
          published_at,
          homepage_order,
          cover_image_id
        `)
        .eq("slug", slug)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        let cover_image = "/images/school details.jpg";
        if (data.cover_image_id) {
          const { data: media } = await supabase
            .from("media_assets")
            .select("bucket, path")
            .eq("id", data.cover_image_id)
            .maybeSingle();
          if (media) {
            cover_image = media.bucket === "external"
              ? media.path
              : (media.path.startsWith("/") ? media.path : `/${media.path}`);
          }
        }

        let rawBody = data.body;
        if (typeof rawBody !== "string") {
          rawBody = JSON.stringify(rawBody);
        }
        if (rawBody.startsWith('"') && rawBody.endsWith('"')) {
          try {
            rawBody = JSON.parse(rawBody);
          } catch {}
        }

        return {
          id: data.id,
          type: data.type,
          slug: data.slug,
          title: data.title,
          excerpt: data.excerpt || "",
          body: rawBody,
          cover_image,
          homepage_order: data.homepage_order,
          status: data.status,
          pinned: data.pinned || false,
          published_at: data.published_at,
        };
      }
    } catch (err) {
      console.warn("Supabase getPostBySlug failed, falling back to local storage:", err);
    }
  }

  const localPosts = readLocalPosts();
  return localPosts.find((p) => p.slug === slug) || null;
}

export async function getPostById(id: string): Promise<Post | null> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();
      const { data, error } = await supabase
        .from("posts")
        .select(`
          id,
          type,
          slug,
          title,
          excerpt,
          body,
          status,
          pinned,
          published_at,
          homepage_order,
          cover_image_id
        `)
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        let cover_image = "/images/school details.jpg";
        if (data.cover_image_id) {
          const { data: media } = await supabase
            .from("media_assets")
            .select("bucket, path")
            .eq("id", data.cover_image_id)
            .maybeSingle();
          if (media) {
            cover_image = media.bucket === "external"
              ? media.path
              : (media.path.startsWith("/") ? media.path : `/${media.path}`);
          }
        }

        let rawBody = data.body;
        if (typeof rawBody !== "string") {
          rawBody = JSON.stringify(rawBody);
        }
        if (rawBody.startsWith('"') && rawBody.endsWith('"')) {
          try {
            rawBody = JSON.parse(rawBody);
          } catch {}
        }

        return {
          id: data.id,
          type: data.type,
          slug: data.slug,
          title: data.title,
          excerpt: data.excerpt || "",
          body: rawBody,
          cover_image,
          homepage_order: data.homepage_order,
          status: data.status,
          pinned: data.pinned || false,
          published_at: data.published_at,
        };
      }
    } catch (err) {
      console.warn("Supabase getPostById failed, falling back to local storage:", err);
    }
  }

  const localPosts = readLocalPosts();
  return localPosts.find((p) => p.id === id) || null;
}

export async function createPost(postData: Omit<Post, "id">): Promise<Post> {
  const newId = crypto.randomUUID();
  const newPost: Post = {
    ...postData,
    id: newId,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();

      let cover_image_id: string | null = null;
      if (newPost.cover_image) {
        let bucket = "public-media";
        let pathStr = newPost.cover_image;
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
          cover_image_id = media.id;
        } else {
          const { data: newMedia, error: mediaErr } = await supabase
            .from("media_assets")
            .insert({
              bucket,
              path: pathStr,
              alt_text: newPost.title,
            })
            .select("id")
            .single();

          if (!mediaErr && newMedia) {
            cover_image_id = newMedia.id;
          }
        }
      }

      const { data, error } = await supabase
        .from("posts")
        .insert({
          id: newPost.id,
          type: newPost.type,
          slug: newPost.slug,
          title: newPost.title,
          excerpt: newPost.excerpt,
          body: newPost.body,
          status: newPost.status,
          pinned: newPost.pinned,
          published_at: newPost.published_at || (newPost.status === "published" ? new Date().toISOString() : null),
          homepage_order: newPost.homepage_order || null,
          cover_image_id,
        })
        .select()
        .single();

      if (error) throw error;
      if (data) {
        return newPost;
      }
    } catch (err) {
      console.warn("Supabase createPost failed, falling back to local file:", err);
    }
  }

  const localPosts = readLocalPosts();
  localPosts.push(newPost);
  writeLocalPosts(localPosts);
  return newPost;
}

export async function updatePost(id: string, updatedFields: Partial<Post>): Promise<Post> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();

      let cover_image_id: string | undefined | null;
      if (updatedFields.cover_image !== undefined) {
        if (updatedFields.cover_image === "") {
          cover_image_id = null;
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
            cover_image_id = media.id;
          } else {
            const { data: newMedia, error: mediaErr } = await supabase
              .from("media_assets")
              .insert({
                bucket,
                path: pathStr,
                alt_text: updatedFields.title || "Post Image",
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
        updated_at: new Date().toISOString(),
      };
      if (updatedFields.slug !== undefined) dbUpdate.slug = updatedFields.slug;
      if (updatedFields.title !== undefined) dbUpdate.title = updatedFields.title;
      if (updatedFields.excerpt !== undefined) dbUpdate.excerpt = updatedFields.excerpt;
      if (updatedFields.body !== undefined) dbUpdate.body = updatedFields.body;
      if (updatedFields.status !== undefined) {
        dbUpdate.status = updatedFields.status;
        if (updatedFields.status === "published" && !updatedFields.published_at) {
          dbUpdate.published_at = new Date().toISOString();
        }
      }
      if (updatedFields.published_at !== undefined) dbUpdate.published_at = updatedFields.published_at;
      if (updatedFields.pinned !== undefined) dbUpdate.pinned = updatedFields.pinned;
      if (updatedFields.homepage_order !== undefined) dbUpdate.homepage_order = updatedFields.homepage_order;
      if (cover_image_id !== undefined) dbUpdate.cover_image_id = cover_image_id;

      const { data, error } = await supabase
        .from("posts")
        .update(dbUpdate)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      if (data) {
        // Fetch full updated post to be sure
        const updatedPost = await getPostById(id);
        if (updatedPost) return updatedPost;
      }
    } catch (err) {
      console.warn("Supabase updatePost failed, falling back to local file:", err);
    }
  }

  const localPosts = readLocalPosts();
  const index = localPosts.findIndex((p) => p.id === id);
  if (index === -1) {
    throw new Error(`Post with ID ${id} not found.`);
  }

  const updatedPost: Post = {
    ...localPosts[index],
    ...updatedFields,
    updated_at: new Date().toISOString(),
  };

  localPosts[index] = updatedPost;
  writeLocalPosts(localPosts);
  return updatedPost;
}

export async function deletePost(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();
      const { error } = await supabase.from("posts").delete().eq("id", id);
      if (error) throw error;
      return true;
    } catch (err) {
      console.warn("Supabase deletePost failed, falling back to local file:", err);
    }
  }

  const localPosts = readLocalPosts();
  const filtered = localPosts.filter((p) => p.id !== id);
  if (localPosts.length === filtered.length) {
    return false;
  }
  writeLocalPosts(filtered);
  return true;
}
