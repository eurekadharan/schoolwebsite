import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPosts } from "@/lib/posts-store";

export const metadata: Metadata = {
  title: "School Blogs & Insights | Eureka"
};

export const dynamic = "force-dynamic";

const CalendarIcon = ({ size = 14, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const UserIcon = ({ size = 14, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogsListPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams.page || "1", 10);
  const limit = 30;

  const allBlogs = await getPosts("blog", false);
  
  // Pagination slice
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const blogs = allBlogs.slice(startIndex, endIndex);
  const totalPages = Math.ceil(allBlogs.length / limit);

  return (
    <>
      {/* Hero Banner */}
      <section className="relative isolate flex min-h-[300px] items-center overflow-hidden text-white">
        <Image
          src="/images/seminar in ai.jpg"
          alt="Eureka Blogs and Insights"
          fill
          sizes="100vw"
          className="-z-20 object-cover object-center"
          priority
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#10233f]/90 to-[#10233f]/40" />
        <div className="mx-auto w-full max-w-[1140px] px-4">
          <span className="mb-3 inline-flex min-h-7 items-center rounded-full bg-[#d9fffc] px-3.5 py-1 text-xs font-bold uppercase text-[#3eaea6]">
            Academic Insights
          </span>
          <h1 className="max-w-[760px] text-balance text-[clamp(36px,5vw,54px)] font-black leading-tight text-white">
            Eureka Blogs
          </h1>
          <p className="mt-4 max-w-[660px] text-slate-200">
            Read articles and perspectives from our coordinators, teachers, and staff on project-based learning, pedagogy, and student development.
          </p>
        </div>
      </section>

      {/* Blogs Listing */}
      <section className="bg-slate-50 py-[75px] max-md:py-14">
        <div className="mx-auto max-w-[1140px] px-4">
          {blogs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-slate-100">
              <p className="text-sm text-slate-500">No blogs published yet. Check back soon!</p>
            </div>
          ) : (
            <>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog) => {
                  const dateStr = blog.published_at
                    ? new Date(blog.published_at).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                      })
                    : "Recent";

                  return (
                    <article
                      key={blog.id}
                      className="group flex flex-col bg-white rounded-lg overflow-hidden shadow-sm border border-slate-100 transition hover:shadow-md"
                    >
                      <div className="relative h-[220px] w-full shrink-0">
                        {/* Safe rendering using raw img to support Drive link paste */}
                        <img
                          src={blog.cover_image || "/images/students with smart board.jpg"}
                          alt={blog.title}
                          className="h-full w-full object-cover transition group-hover:scale-105 duration-500"
                          onError={(e) => {
                            e.currentTarget.src = "/images/students with smart board.jpg";
                          }}
                        />
                      </div>
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                            <span className="flex items-center gap-1">
                              <CalendarIcon size={12} /> {dateStr}
                            </span>
                          </div>
                          <h2 className="text-lg font-bold text-[#10233f] mb-2 leading-snug group-hover:text-[#3eaea6] transition line-clamp-2">
                            <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                          </h2>
                          <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-3">
                            {blog.excerpt}
                          </p>
                        </div>
                        <div className="pt-2 border-t border-slate-50 mt-auto flex items-center justify-between">
                          <Link
                            href={`/blogs/${blog.slug}`}
                            className="inline-flex items-center text-xs font-bold text-[#3eaea6] hover:text-[#ff7b3b] transition"
                          >
                            Read Full Article &rarr;
                          </Link>
                          {blog.homepage_order != null && (
                            <span className="text-[10px] bg-[#d9fffc] text-[#3eaea6] font-bold px-2 py-0.5 rounded">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  {page > 1 && (
                    <Link
                      href={`/blogs?page=${page - 1}`}
                      className="px-3.5 py-1.5 rounded border border-slate-200 bg-white text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
                    >
                      &larr; Previous
                    </Link>
                  )}
                  <span className="text-xs text-slate-500 font-bold px-3">
                    Page {page} of {totalPages}
                  </span>
                  {page < totalPages && (
                    <Link
                      href={`/blogs?page=${page + 1}`}
                      className="px-3.5 py-1.5 rounded border border-slate-200 bg-white text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
                    >
                      Next &rarr;
                    </Link>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
