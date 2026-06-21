import Link from "next/link";
import { notFound } from "next/navigation";
import { getAchievementById } from "@/lib/achievements-store";
import { adminUpdateAchievement } from "../actions";
import { ImageUploader } from "@/components/admin/image-uploader";

const ChevronLeftIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const TrophyIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
  </svg>
);

const SaveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
    <polyline points="17 21 17 13 7 13 7 21"/>
    <polyline points="7 3 7 8 15 8"/>
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const ImageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
);

const AlignLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="17" y1="10" x2="3" y2="10"/>
    <line x1="21" y1="6" x2="3" y2="6"/>
    <line x1="21" y1="14" x2="3" y2="14"/>
    <line x1="17" y1="18" x2="3" y2="18"/>
  </svg>
);

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminEditAchievementPage({ params }: Props) {
  const { id } = await params;
  const item = await getAchievementById(id);

  if (!item) notFound();

  return (
    <>
      <div className="admin-topbar mb-8">
        <Link
          href="/admin/achievements"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-[#ff7b3b] transition mb-3"
        >
          <ChevronLeftIcon size={14} /> Back to List
        </Link>
        <h1 className="text-3xl font-black text-[#10233f]">Edit Achievement</h1>
        <p className="text-slate-500 text-sm mt-1">Modify the existing achievement details for {item.title}.</p>
      </div>

      <form action={adminUpdateAchievement} className="bg-white rounded-lg border border-slate-200 shadow-sm p-8 max-w-[800px]">
        <input type="hidden" name="id" value={item.id} />

        <div className="grid gap-6">
          {/* Title */}
          <div>
            <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">
              Student Name <span className="text-[#b42318] font-bold">*</span>
            </label>
            <input
              type="text"
              name="title"
              defaultValue={item.title}
              placeholder="e.g. Ms. Suva Ratna Rai"
              className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-[#3eaea6] focus:bg-white transition"
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">
              Custom Slug <span className="text-slate-400 font-normal">(Required for page routing)</span>
            </label>
            <input
              type="text"
              name="slug"
              defaultValue={item.slug}
              placeholder="e.g. suva-ratna-rai"
              className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-[#3eaea6] focus:bg-white transition"
              required
            />
          </div>

          {/* Batch & Summary */}
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <div>
              <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2 flex items-center gap-1.5">
                <TrophyIcon size={14} className="text-[#ff7b3b]" /> Batch / Category <span className="text-[#b42318] font-bold">*</span>
              </label>
              <input
                type="text"
                name="category"
                defaultValue={item.category}
                placeholder="e.g. Batch 2056"
                className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-[#3eaea6] focus:bg-white transition"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2 flex items-center gap-1.5">
                <AlignLeftIcon /> Success Details / Role <span className="text-[#b42318] font-bold">*</span>
              </label>
              <input
                type="text"
                name="summary"
                defaultValue={item.summary}
                placeholder="e.g. Registered Nurse, UK"
                className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-[#3eaea6] focus:bg-white transition"
                required
              />
            </div>
          </div>

          {/* Date & Photo */}
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <div>
              <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2 flex items-center gap-1.5">
                <CalendarIcon /> Date of Achievement
              </label>
              <input
                type="date"
                name="achievement_date"
                defaultValue={item.achievement_date ? item.achievement_date.split("T")[0] : ""}
                className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-[#3eaea6] focus:bg-white transition"
              />
            </div>
            <div>
              <ImageUploader
                name="cover_image"
                defaultValue={item.cover_image}
                label="Student Photo"
                required={true}
              />
            </div>
          </div>

          {/* Body */}
          <div>
            <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">
              Full Success Story / Details
            </label>
            <textarea
              name="body"
              defaultValue={item.body}
              rows={6}
              placeholder="Enter details about their path, university education, current position, and comments on how Eureka shaped their future..."
              className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-[#3eaea6] focus:bg-white transition resize-y"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">
              Publish Status
            </label>
            <select
              name="status"
              className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-[#3eaea6] focus:bg-white transition"
              defaultValue={item.status}
            >
              <option value="draft">Draft (Visible in admin only)</option>
              <option value="published">Published (Visible on public site)</option>
              <option value="archived">Archived (Hidden from public wall)</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-4 border-t pt-6 border-slate-100">
            <button
              type="submit"
              className="inline-flex min-h-[42px] items-center gap-2 rounded bg-[#ff7b3b] px-6 py-2.5 text-xs font-black uppercase tracking-wider text-white hover:bg-[#3eaea6] transition"
            >
              <SaveIcon /> Save Changes
            </button>
            <Link
              href="/admin/achievements"
              className="inline-flex min-h-[42px] items-center justify-center rounded border border-slate-200 bg-slate-50 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-100 transition"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
