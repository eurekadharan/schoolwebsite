import { isSupabaseConfigured } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import fs from "fs";
import path from "path";

export interface Page {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: any; // Dynamic JSON structure
  status: "draft" | "published" | "archived";
  published_at?: string;
  created_at?: string;
  updated_at?: string;
}

const LOCAL_FILE_PATH = path.join(process.cwd(), "lib", "pages-data.json");

// Helper to read local JSON
function readLocalPages(): Page[] {
  try {
    if (!fs.existsSync(LOCAL_FILE_PATH)) {
      return [];
    }
    const fileContent = fs.readFileSync(LOCAL_FILE_PATH, "utf-8");
    return JSON.parse(fileContent);
  } catch (err) {
    console.error("Error reading local pages:", err);
    return [];
  }
}

// Helper to write local JSON
function writeLocalPages(pages: Page[]): void {
  try {
    fs.writeFileSync(LOCAL_FILE_PATH, JSON.stringify(pages, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing local pages:", err);
  }
}

export async function getPages(): Promise<Page[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();
      const { data, error } = await supabase
        .from("pages")
        .select(`
          id,
          slug,
          title,
          excerpt,
          body,
          status,
          published_at
        `);

      if (error) throw error;
      if (data) {
        return data.map((item: any) => ({
          id: item.id,
          slug: item.slug,
          title: item.title,
          excerpt: item.excerpt || "",
          body: typeof item.body === "string" ? JSON.parse(item.body) : item.body,
          status: item.status,
          published_at: item.published_at,
        }));
      }
    } catch (err) {
      console.warn("Supabase pages query failed, falling back to local storage:", err);
    }
  }

  return readLocalPages();
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();
      const { data, error } = await supabase
        .from("pages")
        .select(`
          id,
          slug,
          title,
          excerpt,
          body,
          status,
          published_at
        `)
        .eq("slug", slug)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        return {
          id: data.id,
          slug: data.slug,
          title: data.title,
          excerpt: data.excerpt || "",
          body: typeof data.body === "string" ? JSON.parse(data.body) : data.body,
          status: data.status,
          published_at: data.published_at,
        };
      }
    } catch (err) {
      console.warn(`Supabase getPageBySlug for '${slug}' failed, falling back to local storage:`, err);
    }
  }

  const localPages = readLocalPages();
  return localPages.find((p) => p.slug === slug) || null;
}

export async function updatePage(slug: string, fields: Partial<Page>): Promise<Page> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();

      const dbUpdate: any = {
        updated_at: new Date().toISOString(),
      };
      if (fields.title !== undefined) dbUpdate.title = fields.title;
      if (fields.excerpt !== undefined) dbUpdate.excerpt = fields.excerpt;
      if (fields.body !== undefined) dbUpdate.body = fields.body;
      if (fields.status !== undefined) dbUpdate.status = fields.status;

      const { data, error } = await supabase
        .from("pages")
        .update(dbUpdate)
        .eq("slug", slug)
        .select()
        .single();

      if (error) throw error;
      if (data) {
        return {
          id: data.id,
          slug: data.slug,
          title: data.title,
          excerpt: data.excerpt || "",
          body: typeof data.body === "string" ? JSON.parse(data.body) : data.body,
          status: data.status,
          published_at: data.published_at,
        };
      }
    } catch (err) {
      console.warn(`Supabase updatePage for '${slug}' failed, falling back to local file:`, err);
    }
  }

  const localPages = readLocalPages();
  const index = localPages.findIndex((p) => p.slug === slug);
  if (index === -1) {
    throw new Error(`Page with slug '${slug}' not found.`);
  }

  const updatedPage: Page = {
    ...localPages[index],
    ...fields,
    updated_at: new Date().toISOString(),
  };

  localPages[index] = updatedPage;
  writeLocalPages(localPages);
  return updatedPage;
}
