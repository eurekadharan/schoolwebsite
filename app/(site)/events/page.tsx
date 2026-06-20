import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getEvents } from "@/lib/events-store";

const ChevronRightIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
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

export const metadata: Metadata = {
  title: "School Events | Eureka"
};

export const revalidate = 0; // Disable caching so new events added in admin show up instantly

export default async function EventsListPage() {
  const events = await getEvents(false);

  return (
    <>
      {/* Banner */}
      <section className="relative isolate flex min-h-[300px] items-center overflow-hidden text-white">
        <Image
          src="/images/christmas celebration.jpg"
          alt="Eureka events and celebrations"
          fill
          sizes="100vw"
          className="-z-20 object-cover object-center"
          priority
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#10233f]/90 to-[#10233f]/40" />
        <div className="mx-auto w-full max-w-[1140px] px-4">
          <span className="mb-3 inline-flex min-h-7 items-center rounded-full bg-[#d9fffc] px-3.5 py-1 text-xs font-bold uppercase text-[#3eaea6]">
            Campus Activities
          </span>
          <h1 className="max-w-[760px] text-balance text-[clamp(36px,5vw,54px)] font-black leading-tight text-white">
            Events & Festivals
          </h1>
          <p className="mt-4 max-w-[660px] text-slate-200">
            Discover upcoming activities, winter camps, literature festivals, and student achievements at Eureka Residential Secondary School.
          </p>
        </div>
      </section>

      {/* Events Listing */}
      <section className="bg-slate-50 py-[75px] max-md:py-14">
        <div className="mx-auto max-w-[1140px] px-4">
          {events.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-slate-100">
              <CalendarDaysIcon className="mx-auto text-slate-300 mb-4" size={48} />
              <h2 className="text-xl font-bold text-[#10233f]">No Events Found</h2>
              <p className="text-sm text-slate-500 mt-2">Check back later for exciting upcoming activities and school announcements.</p>
            </div>
          ) : (
            <div className="grid gap-8">
              {events.map((event) => {
                const startDate = new Date(event.starts_at);
                const dateString = startDate.toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                });
                const timeString = startDate.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit"
                });

                return (
                  <article
                    key={event.id}
                    className="group bg-white rounded-lg overflow-hidden shadow-sm border border-slate-100 grid grid-cols-[380px_1fr] max-md:grid-cols-1 transition hover:shadow-md"
                  >
                    <div className="relative min-h-[250px] max-md:h-[200px]">
                      <Image
                        src={event.cover_image || "/images/christmas celebration.jpg"}
                        alt={event.title}
                        fill
                        className="object-cover transition group-hover:scale-105 duration-500"
                        sizes="(max-width: 768px) 100vw, 380px"
                      />
                    </div>
                    <div className="p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-400 mb-3">
                          <span className="flex items-center gap-1 text-[#ff7b3b]">
                            <CalendarDaysIcon size={14} /> {dateString} at {timeString}
                          </span>
                          {event.location && (
                            <span className="flex items-center gap-1">
                              <MapPinIcon size={14} /> {event.location}
                            </span>
                          )}
                        </div>
                        <h2 className="text-2xl font-bold text-[#10233f] mb-3 group-hover:text-[#3eaea6] transition">
                          <Link href={`/events/${event.slug}`}>{event.title}</Link>
                        </h2>
                        <p className="text-sm leading-relaxed text-slate-600 mb-6">
                          {event.excerpt}
                        </p>
                      </div>
                      <div>
                        <Link
                          href={`/events/${event.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#3eaea6] hover:text-[#ff7b3b] transition"
                        >
                          View Details <ChevronRightIcon size={14} />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
