import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPosts } from "@/lib/posts-store";
import SafeImage from "@/components/safe-image";

export const metadata: Metadata = {
  title: "School Notices & Circulars | Eureka"
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

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function NoticesListPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams.page || "1", 10);
  const limit = 30;

  const allNotices = await getPosts("notice", false);
  
  // Pagination slice
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const notices = allNotices.slice(startIndex, endIndex);
  const totalPages = Math.ceil(allNotices.length / limit);

  return (
    <>
      {/* Hero Banner */}
      <section className="relative isolate flex min-h-[300px] items-center overflow-hidden text-white">
        <Image
          src="/images/school details.jpg"
          alt="Eureka Notices and Announcements"
          fill
          sizes="100vw"
          className="-z-20 object-cover object-center"
          priority
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#10233f]/90 to-[#10233f]/40" />
        <div className="mx-auto w-full max-w-[1140px] px-4">
          <span className="mb-3 inline-flex min-h-7 items-center rounded-full bg-[#ff7b3b]/20 px-3.5 py-1 text-xs font-bold uppercase text-[#ff7b3b]">
            Important Notices
          </span>
          <h1 className="max-w-[760px] text-balance text-[clamp(36px,5vw,54px)] font-black leading-tight text-white">
            School Notice Board
          </h1>
          <p className="mt-4 max-w-[660px] text-slate-200">
            Keep track of latest examinations, holidays, board results, and general circulars issued by Eureka administration.
          </p>
        </div>
      </section>

      {/* Notices Board */}
      <section className="bg-slate-50 py-[75px] max-md:py-14">
        <div className="mx-auto max-w-[1000px] px-4">
          {notices.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-slate-100">
              <p className="text-sm text-slate-500">No notices posted recently.</p>
            </div>
          ) : (
            <>
              <div className="grid gap-6">
                {notices.map((notice) => {
                  const dateStr = notice.published_at
                    ? new Date(notice.published_at).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                      })
                    : "Recent";

                  return (
                    <article
                      key={notice.id}
                      className="group bg-white rounded-lg p-6 shadow-sm border border-slate-100 transition hover:shadow-md flex gap-6 max-sm:flex-col"
                    >
                      {notice.cover_image && (
                        <div className="relative h-[120px] w-[180px] rounded overflow-hidden shrink-0 max-sm:w-full max-sm:h-[150px]">
                          <SafeImage
                            src={notice.cover_image}
                            alt={notice.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 text-xs text-[#ff7b3b] font-bold mb-2">
                            <CalendarIcon size={12} /> {dateStr}
                          </div>
                          <h2 className="text-lg font-bold text-[#10233f] mb-2 leading-snug group-hover:text-[#3eaea6] transition">
                            <Link href={`/notices/${notice.slug}`}>{notice.title}</Link>
                          </h2>
                          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                            {notice.excerpt}
                          </p>
                        </div>
                        <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between">
                          <Link
                            href={`/notices/${notice.slug}`}
                            className="inline-flex items-center text-xs font-bold text-[#3eaea6] hover:text-[#ff7b3b] transition"
                          >
                            View Details &rarr;
                          </Link>
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
                      href={`/notices?page=${page - 1}`}
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
                      href={`/notices?page=${page + 1}`}
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
