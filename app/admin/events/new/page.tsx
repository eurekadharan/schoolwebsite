import Link from "next/link";
import { adminCreateEvent } from "../actions";
import { ImageUploader } from "@/components/admin/image-uploader";

const ChevronLeftIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const MapPinIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const BookOpenIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

// Custom SVG Icons to avoid Lucide version conflicts
const SaveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
    <polyline points="17 21 17 13 7 13 7 21"/>
    <polyline points="7 3 7 8 15 8"/>
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const ImageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
);

const AlignLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="17" y1="10" x2="3" y2="10"/>
    <line x1="21" y1="6" x2="3" y2="6"/>
    <line x1="21" y1="14" x2="3" y2="14"/>
    <line x1="17" y1="18" x2="3" y2="18"/>
  </svg>
);

export default function AdminNewEventPage() {
  return (
    <>
      <div className="admin-topbar mb-8">
        <Link
          href="/admin/events"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-[#ff7b3b] transition mb-3"
        >
          <ChevronLeftIcon size={14} /> Back to List
        </Link>
        <h1 className="text-3xl font-black text-[#10233f]">Create New Event</h1>
        <p className="text-slate-500 text-sm mt-1">Fill out the details below to add a new event or camp announcement.</p>
      </div>

      <form action={adminCreateEvent} className="bg-white rounded-lg border border-slate-200 shadow-sm p-8 max-w-[800px]">
        <div className="grid gap-6">
          {/* Title */}
          <div>
            <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">
              Event Title <span className="text-[#b42318] font-bold">*</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="e.g. 33rd Annual LitArt Festival"
              className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-[#3eaea6] focus:bg-white transition"
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">
              Custom Slug <span className="text-slate-400 font-normal">(Optional - generated from title)</span>
            </label>
            <input
              type="text"
              name="slug"
              placeholder="e.g. annual-litart-fest-2083"
              className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-[#3eaea6] focus:bg-white transition"
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <div>
              <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2 flex items-center gap-1.5">
                <CalendarIcon /> Start Date & Time <span className="text-[#b42318] font-bold">*</span>
              </label>
              <input
                type="datetime-local"
                name="starts_at"
                className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-[#3eaea6] focus:bg-white transition"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2 flex items-center gap-1.5">
                <CalendarIcon /> End Date & Time <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                type="datetime-local"
                name="ends_at"
                className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-[#3eaea6] focus:bg-white transition"
              />
            </div>
          </div>

          {/* Location & Cover Image */}
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <div>
              <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2 flex items-center gap-1.5">
                <MapPinIcon size={14} className="text-[#3eaea6]" /> Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Block B Seminar Hall"
                className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-[#3eaea6] focus:bg-white transition"
              />
            </div>
            <div>
              <ImageUploader
                name="cover_image"
                defaultValue="/images/christmas celebration.jpg"
                label="Cover Image"
                required={true}
              />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2 flex items-center gap-1.5">
              <AlignLeftIcon /> Short Summary / Excerpt
            </label>
            <textarea
              name="excerpt"
              rows={3}
              placeholder="Enter a brief one-sentence summary for previews..."
              className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-[#3eaea6] focus:bg-white transition resize-y"
            />
          </div>

          {/* Body */}
          <div>
            <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2 flex items-center gap-1.5">
              <BookOpenIcon size={14} className="text-slate-400" /> Event Description Body
            </label>
            <textarea
              name="body"
              rows={6}
              placeholder="Enter full details and descriptions of the event..."
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
              defaultValue="draft"
            >
              <option value="draft">Draft (Visible in admin only)</option>
              <option value="published">Published (Visible on public site)</option>
              <option value="archived">Archived (Hidden from public calendar)</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-4 border-t pt-6 border-slate-100">
            <button
              type="submit"
              className="inline-flex min-h-[42px] items-center gap-2 rounded bg-[#ff7b3b] px-6 py-2.5 text-xs font-black uppercase tracking-wider text-white hover:bg-[#3eaea6] transition"
            >
              <SaveIcon /> Save Event
            </button>
            <Link
              href="/admin/events"
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
