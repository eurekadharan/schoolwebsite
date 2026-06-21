"use client";

import React, { useState, useEffect } from "react";

interface MediaAsset {
  id: string;
  bucket: string;
  path: string;
  alt_text?: string;
  created_at: string;
}

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18"/>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
  </svg>
);

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);

const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);

export default function AdminMediaPage() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load media assets
  const fetchMedia = async () => {
    try {
      const res = await fetch("/api/media");
      if (res.ok) {
        const data = await res.json();
        setAssets(data);
      }
    } catch (err) {
      console.error("Failed to load media:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  // Handle file upload
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const file = files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/media", {
        method: "POST",
        body: formData
      });
      if (res.ok) {
        await fetchMedia();
      } else {
        alert("Upload failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading media asset.");
    } finally {
      setUploading(false);
    }
  };

  // Handle delete
  const handleDelete = async (asset: MediaAsset) => {
    if (!confirm(`Are you sure you want to delete this media asset?`)) return;

    try {
      const res = await fetch(`/api/media?id=${asset.id}&path=${encodeURIComponent(asset.path)}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setAssets((prev) => prev.filter((a) => a.id !== asset.id));
      } else {
        alert("Failed to delete asset.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting asset.");
    }
  };

  const copyPath = (asset: MediaAsset) => {
    navigator.clipboard.writeText(asset.path);
    setCopiedId(asset.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      <div className="admin-topbar flex items-center justify-between mb-8">
        <div>
          <span className="eyebrow text-xs uppercase text-slate-400 font-bold tracking-wider">Module</span>
          <h1 className="text-3xl font-black text-[#10233f]">Media Explorer</h1>
          <p className="text-slate-500 text-sm mt-1">Upload and manage school image assets. Copy paths to paste into headers, banners, or notice forms.</p>
        </div>

        <div>
          <input
            type="file"
            accept="image/*"
            id="media-uploader-input"
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
          <label
            htmlFor="media-uploader-input"
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-[#ff7b3b] px-5 py-2 text-xs font-black uppercase tracking-wider text-white hover:bg-[#3eaea6] transition cursor-pointer select-none"
          >
            {uploading ? (
              <>
                <span className="animate-spin inline-block h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full" />
                Uploading...
              </>
            ) : (
              <>
                <UploadIcon /> Upload Photo
              </>
            )}
          </label>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-lg border p-16 text-center text-slate-400">
          <span className="animate-spin inline-block h-8 w-8 border-4 border-[#ff7b3b] border-t-transparent rounded-full mb-4" />
          <p className="font-semibold">Loading media assets...</p>
        </div>
      ) : assets.length === 0 ? (
        <div className="bg-white rounded-lg border border-slate-200 p-16 text-center text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto text-slate-300 mb-4">
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
            <circle cx="9" cy="9" r="2"/>
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
          </svg>
          <p className="font-bold text-lg text-slate-700">No Media Discovered</p>
          <p className="text-sm text-slate-500 mt-1">Upload a photo to start building your media assets library.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {assets.map((asset) => {
            const previewUrl = asset.path.startsWith("http") ? asset.path : `/${asset.path}`;
            return (
              <div
                key={asset.id}
                className="group relative bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col justify-between hover:shadow-md transition"
              >
                {/* Image Box */}
                <div className="relative aspect-square w-full bg-slate-50 border-b overflow-hidden flex items-center justify-center">
                  <img
                    src={previewUrl}
                    alt={asset.alt_text || "media"}
                    className="object-contain max-h-full max-w-full"
                    onError={(e) => {
                      e.currentTarget.src = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3D%2F%2Fwww.w3.org%2F2000%2Fsvg' width%3D'24' height%3D'24' fill%3D'none' stroke%3D'%23cbd5e0' stroke-width%3D'2'%3E%3Crect width%3D'18' height%3D'18' x%3D'3' y%3D'3' rx%3D'2'%2F%3E%3Ccircle cx%3D'8.5' cy%3D'8.5' r%3D'1.5'%2F%3E%3Cpath d%3D'm21 15-5-5L5 21'%2F%3E%3C%2Fsvg%3E";
                    }}
                  />
                </div>

                {/* Metadata & Actions */}
                <div className="p-3">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">PATH:</span>
                  <span
                    className="text-[10px] text-slate-700 font-mono truncate block mt-0.5"
                    title={asset.path}
                  >
                    {asset.path}
                  </span>
                  
                  <div className="mt-3 flex gap-2 border-t pt-2 border-slate-100">
                    <button
                      type="button"
                      onClick={() => copyPath(asset)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 min-h-[26px] text-[10px] font-bold rounded border border-slate-200 bg-slate-50 hover:bg-slate-100 transition text-slate-600"
                    >
                      <CopyIcon /> {copiedId === asset.id ? "Copied!" : "Copy Path"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(asset)}
                      className="inline-flex items-center justify-center h-[26px] w-[26px] text-[#b42318] hover:bg-[#b42318] hover:text-white rounded border border-slate-200 transition"
                      title="Delete Asset"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
