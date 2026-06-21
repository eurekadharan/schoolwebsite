import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize file name
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${timestamp}_${safeName}`;

    // 1. If Supabase is configured, upload to Supabase Storage
    if (isSupabaseConfigured()) {
      try {
        const supabase = await createSupabaseServerClient();
        
        // Upload file to 'public-media' bucket
        const { data, error } = await supabase.storage
          .from("public-media")
          .upload(`uploads/${filename}`, buffer, {
            contentType: file.type,
            upsert: true
          });

        if (error) throw error;

        // Register in media_assets table
        const { data: asset, error: dbErr } = await supabase
          .from("media_assets")
          .insert({
            bucket: "public-media",
            path: `uploads/${filename}`,
            alt_text: file.name
          })
          .select("id, path")
          .single();

        if (dbErr) throw dbErr;

        // Return path which gets resolved by the media resolution logic
        return NextResponse.json({
          id: asset.id,
          path: asset.path
        });
      } catch (dbError: any) {
        console.error("Supabase Storage upload failed, falling back to local filesystem:", dbError);
      }
    }

    // 2. Local Fallback (Save to /public/uploads/ folder)
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filePath = path.join(uploadsDir, filename);
    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      path: `uploads/${filename}`
    });
  } catch (error: any) {
    console.error("File upload API error:", error);
    return NextResponse.json({ error: error.message || "Failed to upload file" }, { status: 500 });
  }
}

// GET lists all media assets (needed for Media Explorer CRUD)
export async function GET() {
  try {
    if (isSupabaseConfigured()) {
      const supabase = await createSupabaseServerClient();
      const { data, error } = await supabase
        .from("media_assets")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return NextResponse.json(data);
      }
    }

    // Local fallback: read public/uploads directory
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      return NextResponse.json([]);
    }

    const files = fs.readdirSync(uploadsDir);
    const localMedia = files.map((file, index) => ({
      id: `local-media-${index}`,
      bucket: "public-media",
      path: `uploads/${file}`,
      alt_text: file,
      created_at: new Date().toISOString()
    }));

    return NextResponse.json(localMedia);
  } catch (error: any) {
    console.error("List media API error:", error);
    return NextResponse.json({ error: "Failed to load media assets" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const assetPath = searchParams.get("path");

    if (!id || !assetPath) {
      return NextResponse.json({ error: "Missing id or path parameter" }, { status: 400 });
    }

    if (isSupabaseConfigured()) {
      try {
        const supabase = await createSupabaseServerClient();
        await supabase.storage.from("public-media").remove([assetPath]);
        await supabase.from("media_assets").delete().eq("id", id);
      } catch (err: any) {
        console.warn("Supabase media deletion failed, trying local filesystem:", err);
      }
    }

    const filename = assetPath.replace(/^uploads\//, "");
    const localFilePath = path.join(process.cwd(), "public", "uploads", filename);
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Media deletion API error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete media" }, { status: 500 });
  }
}
