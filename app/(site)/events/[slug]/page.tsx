import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEventBySlug, getEvents } from "@/lib/events-store";

const ChevronLeftIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const MapPinIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const CalendarDaysIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
  </svg>
);

// Custom SVG Icons to avoid Lucide version conflicts
const ShareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"/>
    <circle cx="6" cy="12" r="3"/>
    <circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);

const ClipboardListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
    <line x1="9" y1="12" x2="15" y2="12"/>
    <line x1="9" y1="16" x2="15" y2="16"/>
  </svg>
);

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  return {
    title: event ? `${event.title} | Eureka` : "School Event"
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) notFound();

  const startDate = new Date(event.starts_at);
  const endDate = event.ends_at ? new Date(event.ends_at) : null;

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit"
  };

  const formattedDate = startDate.toLocaleDateString("en-US", dateOptions);
  const formattedTime = `${startDate.toLocaleTimeString("en-US", timeOptions)} ${
    endDate ? ` - ${endDate.toLocaleTimeString("en-US", timeOptions)}` : ""
  }`;

  // Fetch sidebar recent events (excluding current)
  const allEvents = await getEvents(false);
  const recentEvents = allEvents.filter((e) => e.slug !== slug).slice(0, 3);

  return (
    <>
      {/* Event Header Banner */}
      <section className="relative isolate flex min-h-[360px] items-center overflow-hidden text-white max-md:min-h-[260px]">
        <Image
          src={event.cover_image || "/images/christmas celebration.jpg"}
          alt={event.title}
          fill
          sizes="100vw"
          className="-z-20 object-cover object-center"
          priority
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#10233f]/95 via-[#10233f]/75 to-[#10233f]/40" />
        <div className="mx-auto w-full max-w-[1140px] px-4">
          <div className="max-w-[840px]">
            <Link
              href="/events"
              className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#3eaea6] transition hover:text-[#ff7b3b]"
            >
              <ChevronLeftIcon size={14} /> Back to Events
            </Link>
            <h1 className="text-balance text-[clamp(28px,4.5vw,48px)] font-black leading-tight text-white mt-2">
              {event.title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-4 text-xs font-bold text-slate-300">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded">
                <CalendarDaysIcon size={13} /> {startDate.toLocaleDateString("en-US", { day: "numeric", month: "short" })}
              </span>
              {event.location && (
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded">
                  <MapPinIcon size={13} /> {event.location}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Details Grid */}
      <section className="bg-slate-50 py-[75px] max-md:py-14">
        <div className="mx-auto max-w-[1140px] px-4">
          <div className="grid grid-cols-[1.4fr_.8fr] gap-10 max-lg:grid-cols-1">
            {/* Left Column: Description & Metadata details */}
            <div className="grid gap-6">
              <article className="rounded-lg bg-white p-8 shadow-sm border border-slate-100">
                <div className="border-b pb-5 mb-6 border-slate-100 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-[#10233f]">Event Details</h2>
                  <button className="text-xs font-bold flex items-center gap-1.5 text-slate-400 hover:text-[#ff7b3b] transition">
                    <ShareIcon /> Share
                  </button>
                </div>

                {/* Event Schedule Info */}
                <div className="grid grid-cols-2 gap-4 border-b pb-6 mb-6 border-slate-100 max-sm:grid-cols-1">
                  <div>
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Date</span>
                    <p className="text-sm font-bold text-[#10233f] mt-1">{formattedDate}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Time</span>
                    <p className="text-sm font-bold text-[#10233f] mt-1">{formattedTime}</p>
                  </div>
                </div>

                {/* Event description body */}
                <div className="text-[15px] leading-7 text-slate-600 whitespace-pre-line">
                  {event.body}
                </div>
              </article>

              {/* Internal CTA Banner */}
              <article className="rounded-lg bg-gradient-to-r from-[#ff7b3b] to-[#f58220] p-8 text-white shadow-md flex items-center justify-between gap-6 max-md:flex-col max-md:text-center max-md:p-6">
                <div>
                  <h3 className="text-lg font-bold">Have questions about school programs?</h3>
                  <p className="text-xs text-white/95 mt-1">Our coordinators are available for consultation. Visit the office at Block A or submit an online query.</p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex min-h-[40px] shrink-0 items-center justify-center rounded bg-[#10233f] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-white hover:text-[#10233f]"
                >
                  Contact Office
                </Link>
              </article>
            </div>

            {/* Right Column: Sidebar recommendations */}
            <div className="grid gap-6 content-start">
              {/* Event Quick Card */}
              <div className="rounded-lg bg-white p-6 shadow-sm border border-slate-100">
                <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-4 flex items-center gap-1.5">
                  <ClipboardListIcon /> Logistics Summary
                </h4>
                <div className="grid gap-4 text-xs font-semibold text-slate-600">
                  <div className="flex gap-2.5">
                    <CalendarDaysIcon className="text-[#ff7b3b] shrink-0" size={16} />
                    <div>
                      <p className="text-slate-400">Date & Time</p>
                      <p className="text-slate-800 font-bold mt-0.5">{startDate.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}</p>
                    </div>
                  </div>
                  {event.location && (
                    <div className="flex gap-2.5">
                      <MapPinIcon className="text-[#3eaea6] shrink-0" size={16} />
                      <div>
                        <p className="text-slate-400">Location</p>
                        <p className="text-slate-800 font-bold mt-0.5">{event.location}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Other Events list */}
              {recentEvents.length > 0 && (
                <div className="rounded-lg bg-white p-6 shadow-sm border border-slate-100">
                  <h4 className="text-sm font-bold text-[#10233f] mb-4">Other School Events</h4>
                  <div className="grid gap-4">
                    {recentEvents.map((re) => {
                      const reDate = new Date(re.starts_at);
                      return (
                        <Link
                          href={`/events/${re.slug}`}
                          key={re.id}
                          className="group block border-b pb-3 last:border-b-0 last:pb-0"
                        >
                          <h5 className="text-xs font-bold text-slate-800 transition group-hover:text-[#3eaea6] leading-snug">
                            {re.title}
                          </h5>
                          <span className="text-[10px] text-slate-400 font-semibold mt-1 block">
                            {reDate.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
