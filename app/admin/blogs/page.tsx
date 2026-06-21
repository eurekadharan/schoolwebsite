import Link from "next/link";
import { getPosts } from "@/lib/posts-store";
import { adminDeleteBlog, adminUpdateBlogOrder } from "./actions";

const NewspaperIcon = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
    <path d="M18 14h-8"/>
    <path d="M15 18h-5"/>
    <path d="M10 6h8v4h-8V6Z"/>
  </svg>
);

const CalendarIcon = ({ size = 14 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
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

export default async function AdminBlogsPage() {
  const blogs = await getPosts("blog", true); // include drafts

  return (
    <>
      <div className="admin-topbar flex items-center justify-between mb-8">
        <div>
          <span className="eyebrow text-xs uppercase text-slate-400 font-bold tracking-wider">Module</span>
          <h1 className="text-3xl font-black text-[#10233f]">Blogs Management</h1>
          <p className="text-slate-500 text-sm mt-1">Manage school articles, columns, and customize their home page presentation order.</p>
        </div>
        <Link className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-[#ff7b3b] px-5 py-2 text-xs font-black uppercase tracking-wider text-white hover:bg-[#3eaea6] transition" href="/admin/blogs/new">
          <PlusIcon /> New Blog
        </Link>
      </div>

      <section className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        {blogs.length === 0 ? (
          <div className="p-16 text-center text-slate-400">
            <NewspaperIcon className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="font-bold text-lg text-slate-700">No Blogs Discovered</p>
            <p className="text-sm text-slate-500 mt-1">Get started by creating your very first school blog column.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-slate-500">
              <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-wider border-b border-slate-200">
                <tr>
                  <th scope="col" className="px-6 py-4">Title & Excerpt</th>
                  <th scope="col" className="px-6 py-4">Publish Date</th>
                  <th scope="col" className="px-6 py-4">Homepage Order</th>
                  <th scope="col" className="px-6 py-4">Status</th>
                  <th scope="col" className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 border-t border-slate-100">
                {blogs.map((blog) => {
                  const blogDate = blog.published_at
                    ? new Date(blog.published_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })
                    : "Not set";

                  return (
                    <tr key={blog.id} className="hover:bg-slate-50/50 transition">
                      <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-3">
                        <div className="h-10 w-10 bg-slate-50 border rounded overflow-hidden flex items-center justify-center shrink-0">
                          <img
                            src={blog.cover_image}
                            alt="preview"
                            className="object-cover max-h-full max-w-full"
                            onError={(e) => {
                              e.currentTarget.src = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3D%2F%2Fwww.w3.org%2F2000%2Fsvg' width%3D'24' height%3D'24' fill%3D'none' stroke%3D'%23cbd5e0' stroke-width%3D'2'%3E%3Crect width%3D'18' height%3D'18' x%3D'3' y%3D'3' rx%3D'2'%2F%3E%3Ccircle cx%3D'8.5' cy%3D'8.5' r%3D'1.5'%2F%3E%3Cpath d%3D'm21 15-5-5L5 21'%2F%3E%3C%2Fsvg%3E";
                            }}
                          />
                        </div>
                        <div>
                          <div className="font-bold text-[#10233f] text-sm">{blog.title}</div>
                          <div className="text-[11px] text-slate-400 mt-0.5 max-w-[340px] truncate">{blog.excerpt}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 text-xs">
                        <span className="flex items-center gap-1">
                          <CalendarIcon size={12} /> {blogDate}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        <form
                          action={async (formData) => {
                            "use server";
                            const valStr = formData.get("homepage_order");
                            const order = valStr && valStr !== "" ? parseInt(String(valStr), 10) : null;
                            await adminUpdateBlogOrder(blog.id, isNaN(Number(order)) ? null : order);
                          }}
                          className="flex items-center gap-1.5"
                        >
                          <input
                            type="number"
                            name="homepage_order"
                            defaultValue={blog.homepage_order ?? ""}
                            placeholder="None"
                            className="w-16 bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-center text-xs text-slate-700 outline-none focus:bg-white focus:ring-1 focus:ring-[#3eaea6] transition"
                          />
                          <button
                            type="submit"
                            className="text-[10px] font-bold bg-[#3eaea6] text-white px-2 py-0.5 rounded hover:bg-[#ff7b3b] transition"
                          >
                            Set
                          </button>
                        </form>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-black uppercase tracking-wider ${
                          blog.status === "published"
                            ? "bg-green-50 text-green-700"
                            : blog.status === "draft"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-slate-100 text-slate-700"
                        }`}>
                          {blog.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2.5">
                          <Link
                            href={`/admin/blogs/${blog.id}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-[#3eaea6] hover:text-white hover:border-transparent transition"
                            title="Edit Blog"
                          >
                            <EditIcon />
                          </Link>
                          <form
                            action={async () => {
                              "use server";
                              await adminDeleteBlog(blog.id);
                            }}
                          >
                            <button
                              type="submit"
                              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-[#b42318] hover:bg-[#b42318] hover:text-white hover:border-transparent transition"
                              title="Delete Blog"
                              onClick={(e) => {
                                if (!confirm("Are you sure you want to delete this blog?")) {
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
