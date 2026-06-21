import Link from "next/link";
import { getGalleryItems } from "@/lib/gallery-store";
import { adminDeleteGalleryItem } from "./actions";
import SafeImage from "@/components/safe-image";
import ConfirmDeleteForm from "@/components/admin/confirm-delete-form";

const ImageIcon = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9"/>
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18"/>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

export const revalidate = 0; // Fresh list always

export default async function AdminGalleryPage() {
  const items = await getGalleryItems(true); // include inactive

  return (
    <>
      <div className="admin-topbar flex items-center justify-between mb-8">
        <div>
          <span className="eyebrow text-xs uppercase text-slate-400 font-bold tracking-wider">Module</span>
          <h1 className="text-3xl font-black text-[#10233f]">Gallery Management</h1>
          <p className="text-slate-500 text-sm mt-1">Upload and organize campus photos, academic events, and student life into categories.</p>
        </div>
        <Link className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-[#ff7b3b] px-5 py-2 text-xs font-black uppercase tracking-wider text-white hover:bg-[#3eaea6] transition" href="/admin/gallery/new">
          <PlusIcon /> Add Photo
        </Link>
      </div>

      <section className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        {items.length === 0 ? (
          <div className="p-16 text-center text-slate-400">
            <ImageIcon className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="font-bold text-lg text-slate-700">No Gallery Photos Discovered</p>
            <p className="text-sm text-slate-500 mt-1">Get started by uploading your first school gallery photo.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-slate-500">
              <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-wider border-b border-slate-200">
                <tr>
                  <th scope="col" className="px-6 py-4">Image & Title</th>
                  <th scope="col" className="px-6 py-4">Category (Album)</th>
                  <th scope="col" className="px-6 py-4">Sort Order</th>
                  <th scope="col" className="px-6 py-4">Featured</th>
                  <th scope="col" className="px-6 py-4">Status</th>
                  <th scope="col" className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 border-t border-slate-100">
                {items.map((item) => {
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition">
                      <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-3">
                        <div className="h-12 w-12 rounded bg-slate-50 border overflow-hidden flex items-center justify-center shrink-0">
                          <SafeImage
                            src={item.cover_image}
                            alt="preview"
                            className="object-cover max-h-full max-w-full"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-[#10233f] text-base">{item.title}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-semibold text-xs">
                        <span className="px-2.5 py-0.5 rounded bg-slate-100 text-[#10233f]">
                          {item.album}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-bold text-xs">
                        #{item.sort_order}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-black uppercase tracking-wider ${
                          item.is_featured ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-700"
                        }`}>
                          {item.is_featured ? "featured" : "no"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-black uppercase tracking-wider ${
                          item.is_active ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-700"
                        }`}>
                          {item.is_active ? "active" : "inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2.5">
                          <Link
                            href={`/admin/gallery/${item.id}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-[#3eaea6] hover:text-white hover:border-transparent transition"
                            title="Edit Photo"
                          >
                            <EditIcon />
                          </Link>
                          <ConfirmDeleteForm
                            action={async () => {
                              "use server";
                              await adminDeleteGalleryItem(item.id);
                            }}
                            confirmMessage="Are you sure you want to delete this gallery photo?"
                          >
                            <button
                              type="submit"
                              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-[#b42318] hover:bg-[#b42318] hover:text-white hover:border-transparent transition"
                              title="Delete Photo"
                            >
                              <TrashIcon />
                            </button>
                          </ConfirmDeleteForm>
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
