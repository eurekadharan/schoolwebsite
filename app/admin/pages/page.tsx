import Link from "next/link";
import { getPages } from "@/lib/pages-store";

const FileIcon = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
    <polyline points="14 2 14 8 20 8"/>
  </svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9"/>
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
  </svg>
);

export const revalidate = 0;

export default async function AdminPagesPage() {
  const pages = await getPages();

  return (
    <>
      <div className="admin-topbar mb-8">
        <div>
          <span className="eyebrow text-xs uppercase text-slate-400 font-bold tracking-wider">Module</span>
          <h1 className="text-3xl font-black text-[#10233f]">Pages Management</h1>
          <p className="text-slate-500 text-sm mt-1">Manage core page content blocks like the About page (Vision, Mission, Leadership messages).</p>
        </div>
      </div>

      <section className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        {pages.length === 0 ? (
          <div className="p-16 text-center text-slate-400">
            <FileIcon className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="font-bold text-lg text-slate-700">No Editable Pages Found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-slate-500">
              <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-wider border-b border-slate-200">
                <tr>
                  <th scope="col" className="px-6 py-4">Title & Slug</th>
                  <th scope="col" className="px-6 py-4">Excerpt / Summary</th>
                  <th scope="col" className="px-6 py-4">Status</th>
                  <th scope="col" className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 border-t divide-slate-100">
                {pages.map((page) => {
                  return (
                    <tr key={page.id} className="hover:bg-slate-50/50 transition">
                      <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-3">
                        <FileIcon className="text-[#3eaea6]" size={20} />
                        <div>
                          <div className="font-bold text-[#10233f] text-sm">{page.title}</div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">/{page.slug}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 text-xs max-w-[400px] truncate">
                        {page.excerpt}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-black uppercase tracking-wider ${
                          page.status === "published" ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-700"
                        }`}>
                          {page.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2.5">
                          <Link
                            href={`/admin/pages/${page.slug}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-[#3eaea6] hover:text-white hover:border-transparent transition"
                            title="Edit Page Blocks"
                          >
                            <EditIcon />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
