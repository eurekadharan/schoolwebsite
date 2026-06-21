import Link from "next/link";
import { notFound } from "next/navigation";
import { getGalleryItemById } from "@/lib/gallery-store";
import { adminUpdateGalleryItem } from "../actions";
import { ImageUploader } from "@/components/admin/image-uploader";

const ChevronLeftIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const SaveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
    <polyline points="17 21 17 13 7 13 7 21"/>
    <polyline points="7 3 7 8 15 8"/>
  </svg>
);

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminEditGalleryItemPage({ params }: Props) {
  const { id } = await params;
  const item = await getGalleryItemById(id);

  if (!item) notFound();

  return (
    <>
      <div className="admin-topbar mb-8">
        <Link
          href="/admin/gallery"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-[#ff7b3b] transition mb-3"
        >
          <ChevronLeftIcon size={14} /> Back to List
        </Link>
        <h1 className="text-3xl font-black text-[#10233f]">Edit Gallery Photo</h1>
        <p className="text-slate-500 text-sm mt-1">Modify the existing details and cover image for &quot;{item.title}&quot;.</p>
      </div>

      <form action={adminUpdateGalleryItem} className="bg-white rounded-lg border border-slate-200 shadow-sm p-8 max-w-[800px]">
        <input type="hidden" name="id" value={item.id} />

        <div className="grid gap-6">
          {/* Title */}
          <div>
            <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">
              Photo Title <span className="text-[#b42318] font-bold">*</span>
            </label>
            <input
              type="text"
              name="title"
              defaultValue={item.title}
              placeholder="e.g. Science Fair Chemistry Experiment"
              className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-[#3eaea6] focus:bg-white transition"
              required
            />
          </div>

          {/* Category / Album */}
          <div>
            <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">
              Category / Album Name <span className="text-[#b42318] font-bold">*</span>
            </label>
            <input
              type="text"
              name="album"
              defaultValue={item.album}
              placeholder="e.g. Academics, Sports, Montessori, Celebrations"
              className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-[#3eaea6] focus:bg-white transition"
              required
            />
          </div>

          {/* Sort Order */}
          <div>
            <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">
              Sort Order
            </label>
            <input
              type="number"
              name="sort_order"
              defaultValue={item.sort_order}
              placeholder="e.g. 10"
              className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-[#3eaea6] focus:bg-white transition"
            />
          </div>

          {/* Image Uploader */}
          <div>
            <ImageUploader
              name="cover_image"
              defaultValue={item.cover_image}
              label="Gallery Image Photo"
              required={true}
            />
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <div>
              <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">
                Featured Photo
              </label>
              <select
                name="is_featured"
                className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-[#3eaea6] focus:bg-white transition"
                defaultValue={String(item.is_featured)}
              >
                <option value="false">No (Standard list item)</option>
                <option value="true">Yes (Featured highlight / Homepage slide)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">
                Active Status
              </label>
              <select
                name="is_active"
                className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-[#3eaea6] focus:bg-white transition"
                defaultValue={String(item.is_active)}
              >
                <option value="true">Active (Visible publicly)</option>
                <option value="false">Inactive (Hidden from lists)</option>
              </select>
            </div>
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
              href="/admin/gallery"
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
