import Link from "next/link";
import { notFound } from "next/navigation";
import { getBannerById } from "@/lib/banners-store";
import { adminUpdateBanner } from "../actions";
import { ImageUploader } from "@/components/admin/image-uploader";

const ChevronLeftIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const SaveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
    <polyline points="17 21 17 13 7 13 7 21"/>
    <polyline points="7 3 7 8 15 8"/>
  </svg>
);

interface Props {
  params: Promise<{ id: string }>;
}

export const revalidate = 0;

export default async function AdminEditBannerPage({ params }: Props) {
  const { id } = await params;
  const banner = await getBannerById(id);

  if (!banner) notFound();

  // Helper to format iso to local datetime input string (YYYY-MM-DDTHH:MM)
  const formatDatetimeLocal = (isoString?: string) => {
    if (!isoString) return "";
    try {
      const d = new Date(isoString);
      const pad = (num: number) => String(num).padStart(2, "0");
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    } catch {
      return "";
    }
  };

  return (
    <>
      <div className="admin-topbar mb-8">
        <Link
          href="/admin/banners"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-[#ff7b3b] transition mb-3"
        >
          <ChevronLeftIcon size={14} /> Back to List
        </Link>
        <h1 className="text-3xl font-black text-[#10233f]">Edit Banner</h1>
        <p className="text-slate-500 text-sm mt-1">Modify details for banner &quot;{banner.title}&quot;.</p>
      </div>

      <form action={adminUpdateBanner} className="bg-white rounded-lg border border-slate-200 shadow-sm p-8 max-w-[800px]">
        <input type="hidden" name="id" value={banner.id} />
        <div className="grid gap-6">
          {/* Title */}
          <div>
            <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">
              Banner Title <span className="text-[#b42318] font-bold">*</span>
            </label>
            <input
              type="text"
              name="title"
              defaultValue={banner.title}
              placeholder="e.g. Admissions Open for Academic Session 2083"
              className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-[#3eaea6] focus:bg-white transition"
              required
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">
              Subtitle / Small Text
            </label>
            <input
              type="text"
              name="subtitle"
              defaultValue={banner.subtitle}
              placeholder="e.g. Science, Management and Computer Science streams available"
              className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-[#3eaea6] focus:bg-white transition"
            />
          </div>

          {/* Placement & Sort Order */}
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <div>
              <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">
                Placement Type
              </label>
              <select
                name="placement"
                className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-[#3eaea6] focus:bg-white transition"
                defaultValue={banner.placement}
              >
                <option value="home_hero">Home Hero Slider</option>
                <option value="popup">Homepage Popup Notice</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">
                Sort Order / Sequence
              </label>
              <input
                type="number"
                name="sort_order"
                defaultValue={banner.sort_order}
                className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-[#3eaea6] focus:bg-white transition"
                required
              />
            </div>
          </div>

          {/* CTA Link Configuration */}
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <div>
              <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">
                CTA Button Label
              </label>
              <input
                type="text"
                name="cta_label"
                defaultValue={banner.cta_label}
                placeholder="e.g. Apply Now"
                className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-[#3eaea6] focus:bg-white transition"
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">
                CTA Target Href / Link
              </label>
              <input
                type="text"
                name="cta_href"
                defaultValue={banner.cta_href}
                placeholder="e.g. /admission"
                className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-[#3eaea6] focus:bg-white transition"
              />
            </div>
          </div>

          {/* Active Windows / Scheduling (Optional) */}
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <div>
              <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">
                Starts At (Optional)
              </label>
              <input
                type="datetime-local"
                name="starts_at"
                defaultValue={formatDatetimeLocal(banner.starts_at)}
                className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-[#3eaea6] focus:bg-white transition"
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">
                Ends At (Optional)
              </label>
              <input
                type="datetime-local"
                name="ends_at"
                defaultValue={formatDatetimeLocal(banner.ends_at)}
                className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-[#3eaea6] focus:bg-white transition"
              />
            </div>
          </div>

          {/* Image Uploader */}
          <div>
            <ImageUploader
              name="cover_image"
              defaultValue={banner.cover_image}
              label="Banner Cover Photo"
              required={true}
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">
              Status
            </label>
            <select
              name="is_active"
              className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-[#3eaea6] focus:bg-white transition"
              defaultValue={banner.is_active ? "true" : "false"}
            >
              <option value="true">Active (Visible)</option>
              <option value="false">Inactive (Hidden)</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-4 border-t pt-6 border-slate-100">
            <button
              type="submit"
              className="inline-flex min-h-[42px] items-center gap-2 rounded bg-[#ff7b3b] px-6 py-2.5 text-xs font-black uppercase tracking-wider text-white hover:bg-[#3eaea6] transition"
            >
              <SaveIcon /> Update Banner
            </button>
            <Link
              href="/admin/banners"
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
