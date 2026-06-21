"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { adminUpdateLifeAtEurekaPage } from "@/app/admin/pages/actions";

interface SportsItem {
  title: string;
  category: string;
  tag: string;
  desc: string;
  image: string;
  details: string[];
}

interface ClubsItem {
  title: string;
  subtitle: string;
  desc: string;
  image: string;
  icon: string;
  colorClass: string;
  borderColor: string;
}

interface GalleryItem {
  src: string;
  category: string;
  title: string;
}

interface VideoItem {
  title: string;
  url: string;
}

interface Props {
  page: {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    body: {
      sports?: SportsItem[];
      clubs?: ClubsItem[];
      gallery?: GalleryItem[];
      videos?: VideoItem[];
    };
  };
}

export default function LifeAtEurekaEditor({ page }: Props) {
  const [activeTab, setActiveTab] = useState<"sports" | "clubs" | "gallery" | "videos">("sports");
  
  // States for lists
  const [sports, setSports] = useState<SportsItem[]>(page.body.sports || []);
  const [clubs, setClubs] = useState<ClubsItem[]>(page.body.clubs || []);
  const [gallery, setGallery] = useState<GalleryItem[]>(page.body.gallery || []);
  const [videos, setVideos] = useState<VideoItem[]>(page.body.videos || []);

  // Hidden field values serialized to JSON
  const [sportsJson, setSportsJson] = useState("");
  const [clubsJson, setClubsJson] = useState("");
  const [galleryJson, setGalleryJson] = useState("");
  const [videosJson, setVideosJson] = useState("");

  useEffect(() => {
    setSportsJson(JSON.stringify(sports));
  }, [sports]);

  useEffect(() => {
    setClubsJson(JSON.stringify(clubs));
  }, [clubs]);

  useEffect(() => {
    setGalleryJson(JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    setVideosJson(JSON.stringify(videos));
  }, [videos]);

  // SPORTS HANDLERS
  const addSportsItem = () => {
    setSports([
      ...sports,
      {
        title: "New Sports Facility",
        category: "Athletics",
        tag: "Daily Sessions",
        desc: "Description of the sports facility or activity.",
        image: "/images/volleyball.jpg",
        details: ["Detail point 1", "Detail point 2"]
      }
    ]);
  };

  const updateSportsItem = (index: number, field: keyof SportsItem, value: any) => {
    const updated = [...sports];
    if (field === "details") {
      updated[index] = { ...updated[index], details: typeof value === "string" ? value.split(",").map(s => s.trim()).filter(Boolean) : value };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setSports(updated);
  };

  const removeSportsItem = (index: number) => {
    setSports(sports.filter((_, i) => i !== index));
  };

  // CLUBS HANDLERS
  const addClubsItem = () => {
    setClubs([
      ...clubs,
      {
        title: "New Club",
        subtitle: "Club Subtitle",
        desc: "Description of the student-led club and activities.",
        image: "/images/robotic club.png",
        icon: "Cpu",
        colorClass: "bg-[#3eaea6]/10 text-[#3eaea6]",
        borderColor: "hover:border-[#3eaea6]"
      }
    ]);
  };

  const updateClubsItem = (index: number, field: keyof ClubsItem, value: string) => {
    const updated = [...clubs];
    updated[index] = { ...updated[index], [field]: value };
    
    // Automatically keep colorClass and borderColor in sync if color is selected or custom typed
    if (field === "colorClass") {
      const match = value.match(/#([0-9a-fA-F]{6})/);
      if (match) {
        const hex = match[1];
        updated[index].borderColor = `hover:border-[#${hex}]`;
      }
    }
    
    setClubs(updated);
  };

  const removeClubsItem = (index: number) => {
    setClubs(clubs.filter((_, i) => i !== index));
  };

  // GALLERY HANDLERS
  const addGalleryItem = () => {
    setGallery([
      ...gallery,
      {
        src: "/images/plantation programme.jpg",
        category: "Community",
        title: "New Event Activity"
      }
    ]);
  };

  const updateGalleryItem = (index: number, field: keyof GalleryItem, value: string) => {
    const updated = [...gallery];
    updated[index] = { ...updated[index], [field]: value };
    setGallery(updated);
  };

  const removeGalleryItem = (index: number) => {
    setGallery(gallery.filter((_, i) => i !== index));
  };

  // VIDEOS HANDLERS
  const addVideoItem = () => {
    setVideos([
      ...videos,
      {
        title: "New Event Video Clip",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      }
    ]);
  };

  const updateVideoItem = (index: number, field: keyof VideoItem, value: string) => {
    const updated = [...videos];
    updated[index] = { ...updated[index], [field]: value };
    setVideos(updated);
  };

  const removeVideoItem = (index: number) => {
    setVideos(videos.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-[1100px]">
      {/* Form submits to server action */}
      <form action={adminUpdateLifeAtEurekaPage} className="grid gap-6">
        <input type="hidden" name="sports_json" value={sportsJson} />
        <input type="hidden" name="clubs_json" value={clubsJson} />
        <input type="hidden" name="gallery_json" value={galleryJson} />
        <input type="hidden" name="videos_json" value={videosJson} />

        {/* Tab Selection Navigation */}
        <div className="flex border-b border-slate-200 bg-white p-2 rounded-t-lg shadow-sm gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("sports")}
            className={`flex-1 py-3 px-4 text-xs font-black uppercase tracking-wider rounded transition ${
              activeTab === "sports"
                ? "bg-[#10233f] text-white"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            Sports & Wellness ({sports.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("clubs")}
            className={`flex-1 py-3 px-4 text-xs font-black uppercase tracking-wider rounded transition ${
              activeTab === "clubs"
                ? "bg-[#10233f] text-white"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            Student Clubs ({clubs.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("gallery")}
            className={`flex-1 py-3 px-4 text-xs font-black uppercase tracking-wider rounded transition ${
              activeTab === "gallery"
                ? "bg-[#10233f] text-white"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            Photo Gallery ({gallery.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("videos")}
            className={`flex-1 py-3 px-4 text-xs font-black uppercase tracking-wider rounded transition ${
              activeTab === "videos"
                ? "bg-[#10233f] text-white"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            Videos ({videos.length})
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="bg-white border border-slate-200 border-t-0 p-8 rounded-b-lg shadow-sm">
          {/* SPORTS PANEL */}
          {activeTab === "sports" && (
            <div className="grid gap-8">
              <div className="flex justify-between items-center pb-4 border-b">
                <div>
                  <h3 className="text-lg font-bold text-[#10233f]">Sports Facilities & wellness</h3>
                  <p className="text-slate-400 text-xs mt-0.5">Manage sports categories, descriptions, images and bullet point details.</p>
                </div>
                <button
                  type="button"
                  onClick={addSportsItem}
                  className="bg-[#3eaea6] text-white text-xs font-black uppercase tracking-wider px-4 py-2 rounded hover:bg-[#10233f] transition"
                >
                  + Add Sports Section
                </button>
              </div>

              {sports.length === 0 ? (
                <p className="text-center py-8 text-slate-400 text-sm">No sports items configured. Click the button to add one.</p>
              ) : (
                <div className="grid gap-6">
                  {sports.map((item, idx) => (
                    <div key={idx} className="p-6 border border-slate-200 rounded-lg bg-slate-50/50 relative">
                      <button
                        type="button"
                        onClick={() => removeSportsItem(idx)}
                        className="absolute top-4 right-4 bg-red-50 hover:bg-red-100 text-red-600 p-1.5 rounded transition text-xs font-bold"
                        title="Delete Sports Section"
                      >
                        Delete
                      </button>

                      <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1">Title</label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => updateSportsItem(idx, "title", e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-sm"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1">Category</label>
                          <input
                            type="text"
                            value={item.category}
                            onChange={(e) => updateSportsItem(idx, "category", e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-sm"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1">Tag</label>
                          <input
                            type="text"
                            value={item.tag}
                            onChange={(e) => updateSportsItem(idx, "tag", e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-sm"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1">Image Path</label>
                          <input
                            type="text"
                            value={item.image}
                            onChange={(e) => updateSportsItem(idx, "image", e.target.value)}
                            placeholder="e.g. /images/volleyball.jpg"
                            className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-sm text-slate-600"
                            required
                          />
                        </div>
                        <div className="col-span-2 max-md:col-span-1">
                          <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1">Description</label>
                          <textarea
                            value={item.desc}
                            rows={2}
                            onChange={(e) => updateSportsItem(idx, "desc", e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-sm resize-y"
                            required
                          />
                        </div>
                        <div className="col-span-2 max-md:col-span-1">
                          <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1">
                            Key Details (Comma-separated points)
                          </label>
                          <input
                            type="text"
                            value={item.details.join(", ")}
                            onChange={(e) => updateSportsItem(idx, "details", e.target.value)}
                            placeholder="e.g. Clay play court, Stand net, Inter-house matches"
                            className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* CLUBS PANEL */}
          {activeTab === "clubs" && (
            <div className="grid gap-8">
              <div className="flex justify-between items-center pb-4 border-b">
                <div>
                  <h3 className="text-lg font-bold text-[#10233f]">Student-Run Clubs</h3>
                  <p className="text-slate-400 text-xs mt-0.5">Manage educational, speaking, scientific and artistic clubs.</p>
                </div>
                <button
                  type="button"
                  onClick={addClubsItem}
                  className="bg-[#3eaea6] text-white text-xs font-black uppercase tracking-wider px-4 py-2 rounded hover:bg-[#10233f] transition"
                >
                  + Add Club
                </button>
              </div>

              {clubs.length === 0 ? (
                <p className="text-center py-8 text-slate-400 text-sm">No clubs configured. Click the button to add one.</p>
              ) : (
                <div className="grid gap-6">
                  {clubs.map((item, idx) => (
                    <div key={idx} className="p-6 border border-slate-200 rounded-lg bg-slate-50/50 relative">
                      <button
                        type="button"
                        onClick={() => removeClubsItem(idx)}
                        className="absolute top-4 right-4 bg-red-50 hover:bg-red-100 text-red-600 p-1.5 rounded transition text-xs font-bold"
                        title="Delete Club"
                      >
                        Delete
                      </button>

                      <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1">Club Name</label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => updateClubsItem(idx, "title", e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-sm"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1">Subtitle / Focus</label>
                          <input
                            type="text"
                            value={item.subtitle}
                            onChange={(e) => updateClubsItem(idx, "subtitle", e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-sm"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1">Image Path</label>
                          <input
                            type="text"
                            value={item.image}
                            onChange={(e) => updateClubsItem(idx, "image", e.target.value)}
                            placeholder="e.g. /images/robotic club.png"
                            className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-sm text-slate-600"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1">Lucide Icon name</label>
                          <select
                            value={item.icon}
                            onChange={(e) => updateClubsItem(idx, "icon", e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-sm"
                          >
                            <option value="Cpu">Cpu (Robotics/CS)</option>
                            <option value="MessageSquare">MessageSquare (Debate/Speaking)</option>
                            <option value="Microscope">Microscope (Science)</option>
                            <option value="Palette">Palette (Arts/Culture)</option>
                            <option value="BookOpen">BookOpen (Literature)</option>
                            <option value="Trophy">Trophy (Sports)</option>
                            <option value="Globe">Globe (Eco/Outreach)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1">Color Theme Class</label>
                          <input
                            type="text"
                            value={item.colorClass}
                            onChange={(e) => updateClubsItem(idx, "colorClass", e.target.value)}
                            placeholder="e.g. bg-[#3eaea6]/10 text-[#3eaea6]"
                            className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-sm text-slate-500 font-mono"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1">Hover Border Color Class</label>
                          <input
                            type="text"
                            value={item.borderColor}
                            onChange={(e) => updateClubsItem(idx, "borderColor", e.target.value)}
                            placeholder="e.g. hover:border-[#3eaea6]"
                            className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-sm text-slate-500 font-mono"
                            required
                          />
                        </div>
                        <div className="col-span-2 max-md:col-span-1">
                          <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1">Description</label>
                          <textarea
                            value={item.desc}
                            rows={2}
                            onChange={(e) => updateClubsItem(idx, "desc", e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-sm resize-y"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* GALLERY PANEL */}
          {activeTab === "gallery" && (
            <div className="grid gap-8">
              <div className="flex justify-between items-center pb-4 border-b">
                <div>
                  <h3 className="text-lg font-bold text-[#10233f]">Photo Gallery Showcase</h3>
                  <p className="text-slate-400 text-xs mt-0.5">Manage photo categories and title tags in the Life at Eureka gallery.</p>
                </div>
                <button
                  type="button"
                  onClick={addGalleryItem}
                  className="bg-[#3eaea6] text-white text-xs font-black uppercase tracking-wider px-4 py-2 rounded hover:bg-[#10233f] transition"
                >
                  + Add Photo Item
                </button>
              </div>

              {gallery.length === 0 ? (
                <p className="text-center py-8 text-slate-400 text-sm">No gallery photos configured. Click the button to add one.</p>
              ) : (
                <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                  {gallery.map((item, idx) => (
                    <div key={idx} className="p-4 border border-slate-200 rounded-lg bg-slate-50/30 relative">
                      <button
                        type="button"
                        onClick={() => removeGalleryItem(idx)}
                        className="absolute top-2 right-2 text-[10px] font-bold text-red-600 bg-red-50 hover:bg-red-100 py-1 px-2 rounded transition"
                      >
                        Delete
                      </button>

                      <div className="grid gap-2">
                        <div>
                          <label className="block text-[9px] font-black uppercase text-slate-500 tracking-wider">Photo Title</label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => updateGalleryItem(idx, "title", e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-black uppercase text-slate-500 tracking-wider">Category Category</label>
                          <select
                            value={item.category}
                            onChange={(e) => updateGalleryItem(idx, "category", e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs"
                          >
                            <option value="Outreach">Outreach</option>
                            <option value="Exhibitions">Exhibitions</option>
                            <option value="Celebrations">Celebrations</option>
                            <option value="Achievements">Achievements</option>
                            <option value="Community">Community</option>
                            <option value="Academics">Academics</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[9px] font-black uppercase text-slate-500 tracking-wider">Image Src Path</label>
                          <input
                            type="text"
                            value={item.src}
                            onChange={(e) => updateGalleryItem(idx, "src", e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-500"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* VIDEOS PANEL */}
          {activeTab === "videos" && (
            <div className="grid gap-8">
              <div className="flex justify-between items-center pb-4 border-b">
                <div>
                  <h3 className="text-lg font-bold text-[#10233f]">Video Gallery</h3>
                  <p className="text-slate-400 text-xs mt-0.5">Add YouTube links or Google Drive preview links. They will automatically be converted to inline frame embeds.</p>
                </div>
                <button
                  type="button"
                  onClick={addVideoItem}
                  className="bg-[#3eaea6] text-white text-xs font-black uppercase tracking-wider px-4 py-2 rounded hover:bg-[#10233f] transition"
                >
                  + Add Video
                </button>
              </div>

              {videos.length === 0 ? (
                <p className="text-center py-8 text-slate-400 text-sm">No videos configured. Click the button to add one.</p>
              ) : (
                <div className="grid gap-6">
                  {videos.map((item, idx) => (
                    <div key={idx} className="p-5 border border-slate-200 rounded-lg bg-slate-50/50 relative">
                      <button
                        type="button"
                        onClick={() => removeVideoItem(idx)}
                        className="absolute top-4 right-4 bg-red-50 hover:bg-red-100 text-red-600 p-1.5 rounded transition text-xs font-bold"
                      >
                        Delete
                      </button>

                      <div className="grid gap-4 pr-16">
                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1">Video Title</label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => updateVideoItem(idx, "title", e.target.value)}
                            placeholder="e.g. Eureka Annual Sports Meet Highlights"
                            className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-sm"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1">Link URL (YouTube or Google Drive)</label>
                          <input
                            type="url"
                            value={item.url}
                            onChange={(e) => updateVideoItem(idx, "url", e.target.value)}
                            placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ or https://drive.google.com/file/d/.../view"
                            className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-sm text-slate-600 font-mono"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 flex gap-3">
          <button
            type="submit"
            className="inline-flex min-h-[42px] items-center gap-2 rounded bg-[#ff7b3b] px-6 py-2.5 text-xs font-black uppercase tracking-wider text-white hover:bg-[#3eaea6] transition"
          >
            Save Life at Eureka Page
          </button>
          <Link
            href="/admin/pages"
            className="inline-flex min-h-[42px] items-center justify-center rounded border border-slate-200 bg-slate-50 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-100 transition"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
