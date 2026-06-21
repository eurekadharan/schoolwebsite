import Link from "next/link";
import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/pages-store";
import { adminUpdateAboutPage } from "../actions";
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
  params: Promise<{ slug: string }>;
}

export const revalidate = 0;

export default async function AdminEditPageBlocks({ params }: Props) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) notFound();

  // We only support About Page blocks in this premium release
  if (slug !== "about") {
    return (
      <>
        <div className="admin-topbar mb-8">
          <Link href="/admin/pages" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-[#ff7b3b] transition mb-3">
            <ChevronLeftIcon size={14} /> Back to List
          </Link>
          <h1 className="text-3xl font-black text-[#10233f]">Edit Page: {page.title}</h1>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-8 text-center text-slate-500">
          <p>Editor layout for this page is currently under construction. Please use it to manage the **About Us** page blocks.</p>
        </div>
      </>
    );
  }

  const body = page.body || {};
  const history = body.history_paragraphs || [];
  const principal = body.principal || {};
  const coordinators = body.coordinators || [];
  const coordSec = coordinators[0] || {};
  const coordBas = coordinators[1] || {};

  return (
    <>
      <div className="admin-topbar mb-8">
        <Link
          href="/admin/pages"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-[#ff7b3b] transition mb-3"
        >
          <ChevronLeftIcon size={14} /> Back to List
        </Link>
        <h1 className="text-3xl font-black text-[#10233f]">Edit About Page blocks</h1>
        <p className="text-slate-500 text-sm mt-1">Configure Vision, Mission, History, and leadership message text blocks.</p>
      </div>

      <form action={adminUpdateAboutPage} className="grid gap-8 max-w-[1000px]">
        {/* Core Identity */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-8">
          <h2 className="text-lg font-bold text-[#10233f] mb-6 pb-2 border-b">1. Core Identity & Statements</h2>
          <div className="grid gap-6">
            <div>
              <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">School Motto</label>
              <input type="text" name="motto" defaultValue={body.motto || ""} className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2 text-sm text-slate-800 outline-none focus:ring-1 focus:ring-[#3eaea6] focus:bg-white transition" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">Vision Statement</label>
              <textarea name="vision" rows={3} defaultValue={body.vision || ""} className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2 text-sm text-slate-800 outline-none focus:ring-1 focus:ring-[#3eaea6] focus:bg-white transition resize-y" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">Mission Statement</label>
              <textarea name="mission" rows={3} defaultValue={body.mission || ""} className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2 text-sm text-slate-800 outline-none focus:ring-1 focus:ring-[#3eaea6] focus:bg-white transition resize-y" />
            </div>
          </div>
        </div>

        {/* History Paragraphs */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-8">
          <h2 className="text-lg font-bold text-[#10233f] mb-6 pb-2 border-b">2. History & Milestones (3 paragraphs)</h2>
          <div className="grid gap-6">
            <div>
              <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">Paragraph 1 (Establishment)</label>
              <textarea name="history_p1" rows={3} defaultValue={history[0] || ""} className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2 text-sm text-slate-800 outline-none focus:ring-1 focus:ring-[#3eaea6] focus:bg-white transition resize-y" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">Paragraph 2 (Evolution & PBL)</label>
              <textarea name="history_p2" rows={3} defaultValue={history[1] || ""} className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2 text-sm text-slate-800 outline-none focus:ring-1 focus:ring-[#3eaea6] focus:bg-white transition resize-y" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">Paragraph 3 (Modern Campus Today)</label>
              <textarea name="history_p3" rows={3} defaultValue={history[2] || ""} className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2 text-sm text-slate-800 outline-none focus:ring-1 focus:ring-[#3eaea6] focus:bg-white transition resize-y" />
            </div>
          </div>
        </div>

        {/* Principal's Desk */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-8">
          <h2 className="text-lg font-bold text-[#10233f] mb-6 pb-2 border-b">3. Principal&apos;s Desk Message</h2>
          <div className="grid gap-6">
            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <div>
                <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">Principal Name</label>
                <input type="text" name="principal_name" defaultValue={principal.name || ""} className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2 text-sm text-slate-800 outline-none focus:ring-1 focus:ring-[#3eaea6] focus:bg-white transition" />
              </div>
              <div>
                <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">Qualification Details</label>
                <input type="text" name="principal_qualification" defaultValue={principal.qualification || ""} className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2 text-sm text-slate-800 outline-none focus:ring-1 focus:ring-[#3eaea6] focus:bg-white transition" />
              </div>
            </div>

            <div>
              <ImageUploader name="principal_image" defaultValue={principal.image_url || "/images/principal.jpg"} label="Principal Photo" />
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">Message Paragraph 1</label>
              <textarea name="principal_p1" rows={3} defaultValue={principal.message_paragraphs?.[0] || ""} className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2 text-sm text-slate-800 outline-none focus:ring-1 focus:ring-[#3eaea6] focus:bg-white transition resize-y" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">Message Paragraph 2</label>
              <textarea name="principal_p2" rows={3} defaultValue={principal.message_paragraphs?.[1] || ""} className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2 text-sm text-slate-800 outline-none focus:ring-1 focus:ring-[#3eaea6] focus:bg-white transition resize-y" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">Message Paragraph 3</label>
              <textarea name="principal_p3" rows={3} defaultValue={principal.message_paragraphs?.[2] || ""} className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2 text-sm text-slate-800 outline-none focus:ring-1 focus:ring-[#3eaea6] focus:bg-white transition resize-y" />
            </div>
          </div>
        </div>

        {/* Secondary Coordinator */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-8">
          <h2 className="text-lg font-bold text-[#10233f] mb-6 pb-2 border-b">4. Secondary Level Coordinator (Grade 9 - 12)</h2>
          <div className="grid gap-6">
            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <div>
                <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">Coordinator Name</label>
                <input type="text" name="coord_sec_name" defaultValue={coordSec.name || ""} className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2 text-sm text-slate-800 outline-none focus:ring-1 focus:ring-[#3eaea6] focus:bg-white transition" />
              </div>
              <div>
                <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">Qualification</label>
                <input type="text" name="coord_sec_qualification" defaultValue={coordSec.qualification || ""} className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2 text-sm text-slate-800 outline-none focus:ring-1 focus:ring-[#3eaea6] focus:bg-white transition" />
              </div>
            </div>

            <div>
              <ImageUploader name="coord_sec_image" defaultValue={coordSec.image_url || "/images/bijay kumar shrestha.png"} label="Coordinator Photo" />
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">Message Paragraph 1</label>
              <textarea name="coord_sec_p1" rows={3} defaultValue={coordSec.message_paragraphs?.[0] || ""} className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2 text-sm text-slate-800 outline-none focus:ring-1 focus:ring-[#3eaea6] focus:bg-white transition resize-y" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">Message Paragraph 2</label>
              <textarea name="coord_sec_p2" rows={3} defaultValue={coordSec.message_paragraphs?.[1] || ""} className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2 text-sm text-slate-800 outline-none focus:ring-1 focus:ring-[#3eaea6] focus:bg-white transition resize-y" />
            </div>
          </div>
        </div>

        {/* Basic Coordinator */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-8">
          <h2 className="text-lg font-bold text-[#10233f] mb-6 pb-2 border-b">5. Basic Level Coordinator (Montessori - Grade 8)</h2>
          <div className="grid gap-6">
            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <div>
                <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">Coordinator Name</label>
                <input type="text" name="coord_bas_name" defaultValue={coordBas.name || ""} className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2 text-sm text-slate-800 outline-none focus:ring-1 focus:ring-[#3eaea6] focus:bg-white transition" />
              </div>
              <div>
                <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">Qualification</label>
                <input type="text" name="coord_bas_qualification" defaultValue={coordBas.qualification || ""} className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2 text-sm text-slate-800 outline-none focus:ring-1 focus:ring-[#3eaea6] focus:bg-white transition" />
              </div>
            </div>

            <div>
              <ImageUploader name="coord_bas_image" defaultValue={coordBas.image_url || "/images/bhuwan sanjel.jpeg"} label="Coordinator Photo" />
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">Message Paragraph 1</label>
              <textarea name="coord_bas_p1" rows={3} defaultValue={coordBas.message_paragraphs?.[0] || ""} className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2 text-sm text-slate-800 outline-none focus:ring-1 focus:ring-[#3eaea6] focus:bg-white transition resize-y" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">Message Paragraph 2</label>
              <textarea name="coord_bas_p2" rows={3} defaultValue={coordBas.message_paragraphs?.[1] || ""} className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2 text-sm text-slate-800 outline-none focus:ring-1 focus:ring-[#3eaea6] focus:bg-white transition resize-y" />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 flex gap-3">
          <button
            type="submit"
            className="inline-flex min-h-[42px] items-center gap-2 rounded bg-[#ff7b3b] px-6 py-2.5 text-xs font-black uppercase tracking-wider text-white hover:bg-[#3eaea6] transition"
          >
            <SaveIcon /> Save Page Blocks
          </button>
          <Link
            href="/admin/pages"
            className="inline-flex min-h-[42px] items-center justify-center rounded border border-slate-200 bg-slate-50 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-100 transition"
          >
            Cancel
          </Link>
        </div>
      </form>
    </>
  );
}
