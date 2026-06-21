import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostById } from "@/lib/posts-store";
import { adminUpdateNotice } from "../actions";
import { ImageUploader } from "@/components/admin/image-uploader";
import { RichTextEditor } from "@/components/admin/rich-text-editor";

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

export default async function AdminEditNoticePage({ params }: Props) {
  const { id } = await params;
  const notice = await getPostById(id);

  if (!notice || notice.type !== "notice") notFound();

  return (
    <>
      <div className="admin-topbar mb-8">
        <Link
          href="/admin/notices"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-[#ff7b3b] transition mb-3"
        >
          <ChevronLeftIcon size={14} /> Back to List
        </Link>
        <h1 className="text-3xl font-black text-[#10233f]">Edit Notice</h1>
        <p className="text-slate-500 text-sm mt-1">Modify details for notice &quot;{notice.title}&quot;.</p>
      </div>

      <form action={adminUpdateNotice} className="bg-white rounded-lg border border-slate-200 shadow-sm p-8 max-w-[900px]">
        <input type="hidden" name="id" value={notice.id} />
        <div className="grid gap-6">
          {/* Title */}
          <div>
            <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">
              Notice Title <span className="text-[#b42318] font-bold">*</span>
            </label>
            <input
              type="text"
              name="title"
              defaultValue={notice.title}
              placeholder="e.g. Terminal Examinations Schedule 2083"
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
              defaultValue={notice.slug}
              placeholder="e.g. terminal-exams-schedule-2083"
              className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-[#3eaea6] focus:bg-white transition"
            />
          </div>

          {/* Pin */}
          <div>
            <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">
              Pin to top?
            </label>
            <select
              name="pinned"
              className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-[#3eaea6] focus:bg-white transition"
              defaultValue={notice.pinned ? "true" : "false"}
            >
              <option value="false">No</option>
              <option value="true">Yes (Pin to top)</option>
            </select>
          </div>

          {/* Image Uploader */}
          <div>
            <ImageUploader
              name="cover_image"
              defaultValue={notice.cover_image}
              label="Notice Cover Image / Drive Link Document / Banner"
              required={false}
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">
              Short Excerpt / Preview Summary
            </label>
            <textarea
              name="excerpt"
              defaultValue={notice.excerpt}
              rows={3}
              placeholder="Enter a brief, engaging summary of the notice for listings..."
              className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-[#3eaea6] focus:bg-white transition resize-y"
            />
          </div>

          {/* Body Rich Text Editor */}
          <div>
            <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">
              Notice Details (Rich Text / Markdown Toolbar supported)
            </label>
            <RichTextEditor
              name="body"
              defaultValue={notice.body}
              placeholder="Write notice details here..."
              rows={12}
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
              defaultValue={notice.status}
            >
              <option value="draft">Draft (Visible in admin only)</option>
              <option value="published">Published (Visible on public notice board)</option>
              <option value="archived">Archived</option>
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
              href="/admin/notices"
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
