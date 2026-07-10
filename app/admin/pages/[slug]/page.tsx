import Link from "next/link";
import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/pages-store";
import { adminUpdateAboutPage } from "../actions";
import { ImageUploader } from "@/components/admin/image-uploader";
import LifeAtEurekaEditor from "@/components/admin/life-at-eureka-editor";

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

function renderPersonnelSection(
  titleNumber: number,
  sectionTitle: string,
  prefix: string,
  data: any,
  defaultName: string,
  defaultQual: string,
  defaultImg: string,
  hasMessage: boolean = false,
  pNames: string[] = []
) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-8" key={prefix}>
      <h2 className="text-lg font-bold text-[#10233f] mb-6 pb-2 border-b">{titleNumber}. {sectionTitle}</h2>
      <div className="grid gap-6">
        <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
          <div>
            <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">Name</label>
            <input 
              type="text" 
              name={`${prefix}_name`} 
              defaultValue={data.name || defaultName} 
              className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2 text-sm text-slate-800 outline-none focus:ring-1 focus:ring-[#3eaea6] focus:bg-white transition" 
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase text-[#10233f] tracking-wide mb-2">Qualification / Short Subtitle</label>
            <input 
              type="text" 
              name={`${prefix}_qualification`} 
              defaultValue={data.qualification || defaultQual} 
              className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2 text-sm text-slate-800 outline-none focus:ring-1 focus:ring-[#3eaea6] focus:bg-white transition" 
            />
          </div>
        </div>

        <div>
          <ImageUploader 
            name={`${prefix}_image`} 
            defaultValue={data.image_url || defaultImg} 
            label="Photo" 
          />
        </div>

        {hasMessage && pNames.length > 0 && (
          <div className="grid gap-4 border-t border-slate-100 pt-4">
            <h4 className="text-xs font-bold text-[#10233f] uppercase tracking-wider">Message Paragraphs</h4>
            <div>
              <label className="block text-xs font-black uppercase text-slate-400 tracking-wide mb-2">Paragraph 1</label>
              <textarea 
                name={pNames[0]} 
                rows={3} 
                defaultValue={data.message_paragraphs?.[0] || ""} 
                className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2 text-sm text-slate-800 outline-none focus:ring-1 focus:ring-[#3eaea6] focus:bg-white transition resize-y" 
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase text-slate-400 tracking-wide mb-2">Paragraph 2</label>
              <textarea 
                name={pNames[1]} 
                rows={3} 
                defaultValue={data.message_paragraphs?.[1] || ""} 
                className="w-full bg-[#f8fafa] border border-slate-200 rounded px-4 py-2 text-sm text-slate-800 outline-none focus:ring-1 focus:ring-[#3eaea6] focus:bg-white transition resize-y" 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default async function AdminEditPageBlocks({ params }: Props) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) notFound();

  if (slug === "life-at-eureka") {
    return (
      <>
        <div className="admin-topbar mb-8">
          <Link
            href="/admin/pages"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-[#ff7b3b] transition mb-3"
          >
            <ChevronLeftIcon size={14} /> Back to List
          </Link>
          <h1 className="text-3xl font-black text-[#10233f]">Edit Life at Eureka blocks</h1>
          <p className="text-slate-500 text-sm mt-1">Configure Sports facilities, Clubs, Photo Gallery, and Video Gallery showcase.</p>
        </div>

        <LifeAtEurekaEditor page={page} />
      </>
    );
  }

  // We only support About Page and Life at Eureka page blocks in this premium release
  if (slug !== "about" && slug !== "life-at-eureka") {
    return (
      <>
        <div className="admin-topbar mb-8">
          <Link href="/admin/pages" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-[#ff7b3b] transition mb-3">
            <ChevronLeftIcon size={14} /> Back to List
          </Link>
          <h1 className="text-3xl font-black text-[#10233f]">Edit Page: {page.title}</h1>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-8 text-center text-slate-500">
          <p>Editor layout for this page is currently under construction. Please use it to manage the **About Us** or **Life at Eureka** page blocks.</p>
        </div>
      </>
    );
  }

  const body = page.body || {};
  const history = body.history_paragraphs || [];
  const principal = body.principal || {};
  const coordinators = body.coordinators || [];

  const getCoordData = (roleLabel: string, alternateLabel?: string) => {
    return coordinators.find((c: any) => c.role === roleLabel || (alternateLabel && c.role === alternateLabel)) || {};
  };

  const directorData = getCoordData("Director");
  const academicDirectorData = getCoordData("Academic Director");
  const plusTwoData = getCoordData("+2 Coordinator");
  const coord910Data = getCoordData("Coordinator 9-10", "Secondary Level Coordinator");
  const coord68Data = getCoordData("Coordinator 6-8", "Basic Level Coordinator");
  const coord15Data = getCoordData("Coordinator 1-5");
  const incharge12Data = getCoordData("Incharge 1-2");
  const montessoriData = getCoordData("Montessori Coordinator");

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

        {/* Leadership & Coordinators Directory */}
        {renderPersonnelSection(4, "Director", "director", directorData, "Mr. Chandra Deep Lama", "Director", "")}
        {renderPersonnelSection(5, "Academic Director", "academic_director", academicDirectorData, "Mr. Sudip Yalmo Tamang", "Academic Director", "")}
        {renderPersonnelSection(6, "Plus Two Coordinator", "plus_two", plusTwoData, "Mr. Rajat Sampang", "+2 Level Coordinator", "")}
        {renderPersonnelSection(7, "Coordinator 9-10 (Secondary Level)", "coord_sec", coord910Data, "Mr. Bijay Kumar Shrestha", "Secondary Coordinator | M.Sc. (Biology)", "/images/bijay kumar shrestha.png", true, ["coord_sec_p1", "coord_sec_p2"])}
        {renderPersonnelSection(8, "Coordinator 6-8 (Basic Level)", "coord_bas", coord68Data, "Mr. Bhuwan Sanjel", "Basic Level Coordinator | BA Sociology / MA English", "/images/bhuwan sanjel.jpeg", true, ["coord_bas_p1", "coord_bas_p2"])}
        {renderPersonnelSection(9, "Coordinator 1-5 (Primary Level)", "coord_1_5", coord15Data, "Mr. K. B. Rai", "Primary Level Coordinator", "/images/KB Rai.jpg")}
        {renderPersonnelSection(10, "Incharge 1-2", "incharge_1_2", incharge12Data, "Mrs. Anu Shakya", "Primary Level Incharge", "/images/Anu Shakya.jpg")}
        {renderPersonnelSection(11, "Montessori Coordinator", "montessori", montessoriData, "Mrs. Indu Rai", "Montessori Coordinator", "/images/Indu Rai.jpg")}

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
