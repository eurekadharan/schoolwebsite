"use client";

import React, { useState, useEffect } from "react";

interface ImageUploaderProps {
  name: string;
  defaultValue?: string;
  label?: string;
  required?: boolean;
}

export function ImageUploader({
  name,
  defaultValue = "",
  label = "Cover Image",
  required = false
}: ImageUploaderProps) {
  const [imgUrl, setImgUrl] = useState(defaultValue);
  const [activeTab, setActiveTab] = useState<"link" | "upload">("link");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    if (defaultValue !== undefined) {
      setImgUrl(defaultValue);
    }
  }, [defaultValue]);

  // Handle file uploads
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/media", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to upload file");
      }

      const data = await response.json();
      if (data && data.path) {
        // Returned path could be local /uploads/filename or Supabase URL
        setImgUrl(data.path);
        // Switch back to link tab to show the path
        setActiveTab("link");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      setUploadError(err.message || "An error occurred during file upload.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="border border-slate-200 rounded-md p-4 bg-slate-50">
      <div className="flex items-center justify-between mb-3">
        <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide">
          {label} {required && <span className="text-[#b42318] font-bold">*</span>}
        </label>

        {/* Tab switcher */}
        <div className="flex bg-slate-200 p-0.5 rounded text-[10px]">
          <button
            type="button"
            onClick={() => setActiveTab("link")}
            className={`px-2 py-0.5 rounded-sm font-semibold transition ${
              activeTab === "link" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Drive Link / URL
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("upload")}
            className={`px-2 py-0.5 rounded-sm font-semibold transition ${
              activeTab === "upload" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Upload File
          </button>
        </div>
      </div>

      {/* Tabs Content */}
      {activeTab === "link" ? (
        <div>
          <input
            type="text"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            placeholder="Paste Google Drive link, external image URL, or local path (e.g. images/staffs.jpg)..."
            className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 outline-none focus:ring-1 focus:ring-[#3eaea6] transition"
          />
          <p className="text-[10px] text-slate-400 mt-1.5 leading-normal">
            Pasting a Google Drive link or external image URL is supported. It will automatically resolve on the home page and public wings.
          </p>
        </div>
      ) : (
        <div className="border border-dashed border-slate-300 rounded bg-white p-4 text-center">
          {uploading ? (
            <div className="text-xs text-slate-500 flex flex-col items-center gap-1.5">
              <span className="animate-spin inline-block h-4 w-4 border-2 border-[#ff7b3b] border-t-transparent rounded-full" />
              <span>Uploading asset to storage...</span>
            </div>
          ) : (
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id={`file-input-${name}`}
              />
              <label
                htmlFor={`file-input-${name}`}
                className="inline-flex items-center justify-center min-h-[32px] rounded border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                Choose Image File
              </label>
              <p className="text-[9px] text-slate-400 mt-1.5">
                PNG, JPG, JPEG, or WEBP up to 5MB.
              </p>
            </div>
          )}

          {uploadError && (
            <p className="text-[10px] text-[#b42318] mt-2 font-semibold">
              {uploadError}
            </p>
          )}
        </div>
      )}

      {/* Preview Thumbnail if image is set */}
      {imgUrl && (
        <div className="mt-3 flex items-center gap-3 bg-white p-2 border rounded border-slate-150">
          <div className="h-10 w-10 bg-slate-50 rounded border overflow-hidden flex items-center justify-center shrink-0">
            {/* Safe image display using raw img element since Drive links or custom paths may not be in next.config domain array */}
            <img
              src={imgUrl.startsWith("http") || imgUrl.startsWith("/") ? imgUrl : "/" + imgUrl}
              alt="Preview"
              className="object-contain max-h-full max-w-full"
              onError={(e) => {
                // If it fails to load (e.g. invalid URL or offline), show a fallback icon
                e.currentTarget.src = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3D%2F%2Fwww.w3.org%2F2000%2Fsvg' width%3D'24' height%3D'24' fill%3D'none' stroke%3D'%23cbd5e0' stroke-width%3D'2'%3E%3Crect width%3D'18' height%3D'18' x%3D'3' y%3D'3' rx%3D'2'%2F%3E%3Ccircle cx%3D'8.5' cy%3D'8.5' r%3D'1.5'%2F%3E%3Cpath d%3D'm21 15-5-5L5 21'%2F%3E%3C%2Fsvg%3E";
              }}
            />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] text-slate-400 block font-bold">ACTIVE VALUE:</span>
            <span className="text-[10px] text-slate-700 truncate block font-mono" title={imgUrl}>
              {imgUrl}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setImgUrl("")}
            className="text-[10px] font-bold text-[#b42318] hover:underline"
          >
            Clear
          </button>
        </div>
      )}

      {/* Hidden field to submit value in standard form actions */}
      <input type="hidden" name={name} value={imgUrl} />
    </div>
  );
}
