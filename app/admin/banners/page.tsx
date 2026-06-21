import Link from "next/link";
import { getBanners } from "@/lib/banners-store";
import { adminDeleteBanner } from "./actions";

const ImageBackdropIcon = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
);

const LinkIcon = ({ size = 14 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
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

export const revalidate = 0;

export default async function AdminBannersPage() {
  const banners = await getBanners(true); // include inactive

  return (
    <>
      <div className="admin-topbar flex items-center justify-between mb-8">
        <div>
          <span className="eyebrow text-xs uppercase text-slate-400 font-bold tracking-wider">Module</span>
          <h1 className="text-3xl font-black text-[#10233f]">Banners Management</h1>
          <p className="text-slate-500 text-sm mt-1">Manage Home Hero slides and homepage sequential Popup notices.</p>
        </div>
        <Link className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-[#ff7b3b] px-5 py-2 text-xs font-black uppercase tracking-wider text-white hover:bg-[#3eaea6] transition" href="/admin/banners/new">
          <PlusIcon /> New Banner
        </Link>
      </div>

      <section className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        {banners.length === 0 ? (
          <div className="p-16 text-center text-slate-400">
            <ImageBackdropIcon className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="font-bold text-lg text-slate-700">No Banners Configured</p>
            <p className="text-sm text-slate-500 mt-1">Get started by creating a homepage slider or popup banner.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-slate-500">
              <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-wider border-b border-slate-200">
                <tr>
                  <th scope="col" className="px-6 py-4">Image & Title</th>
                  <th scope="col" className="px-6 py-4">Placement</th>
                  <th scope="col" className="px-6 py-4">Order</th>
                  <th scope="col" className="px-6 py-4">CTA Target</th>
                  <th scope="col" className="px-6 py-4">Status</th>
                  <th scope="col" className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 border-t border-slate-100">
                {banners.map((banner) => {
                  return (
                    <tr key={banner.id} className="hover:bg-slate-50/50 transition">
                      <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-3">
                        <div className="h-12 w-12 rounded bg-slate-50 border overflow-hidden flex items-center justify-center shrink-0">
                          <img
                            src={banner.cover_image}
                            alt="preview"
                            className="object-cover max-h-full max-w-full"
                            onError={(e) => {
                              e.currentTarget.src = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3D%2F%2Fwww.w3.org%2F2000%2Fsvg' width%3D'24' height%3D'24' fill%3D'none' stroke%3D'%23cbd5e0' stroke-width%3D'2'%3E%3Crect width%3D'18' height%3D'18' x%3D'3' y%3D'3' rx%3D'2'%2F%3E%3Ccircle cx%3D'8.5' cy%3D'8.5' r%3D'1.5'%2F%3E%3Cpath d%3D'm21 15-5-5L5 21'%2F%3E%3C%2Fsvg%3E";
                            }}
                          />
                        </div>
                        <div>
                          <div className="font-bold text-[#10233f] text-base">{banner.title}</div>
                          <div className="text-xs text-slate-400 mt-0.5">{banner.subtitle || <span className="italic text-slate-300">No subtitle</span>}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-semibold text-xs">
                        <span className={`px-2 py-0.5 rounded ${
                          banner.placement === "popup" ? "bg-[#ff7b3b]/10 text-[#ff7b3b]" : "bg-[#3eaea6]/10 text-[#3eaea6]"
                        }`}>
                          {banner.placement === "popup" ? "Popup sequential" : "Home Hero Slider"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-bold text-xs">
                        #{banner.sort_order}
                      </td>
                      <td className="px-6 py-4 text-slate-600 text-xs">
                        {banner.cta_label && banner.cta_href ? (
                          <span className="flex items-center gap-1">
                            <LinkIcon size={12} /> {banner.cta_label} &rarr; <span className="text-slate-400">{banner.cta_href}</span>
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">None</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-black uppercase tracking-wider ${
                          banner.is_active ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-700"
                        }`}>
                          {banner.is_active ? "active" : "inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2.5">
                          <Link
                            href={`/admin/banners/${banner.id}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-[#3eaea6] hover:text-white hover:border-transparent transition"
                            title="Edit Banner"
                          >
                            <EditIcon />
                          </Link>
                          <form
                            action={async () => {
                              "use server";
                              await adminDeleteBanner(banner.id);
                            }}
                          >
                            <button
                              type="submit"
                              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-[#b42318] hover:bg-[#b42318] hover:text-white hover:border-transparent transition"
                              title="Delete Banner"
                              onClick={(e) => {
                                if (!confirm("Are you sure you want to delete this banner?")) {
                                  e.preventDefault();
                                }
                              }}
                            >
                              <TrashIcon />
                            </button>
                          </form>
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
