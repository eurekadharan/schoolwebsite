import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
const AwardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7"/>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
  </svg>
);

const BookOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

export const metadata: Metadata = {
  title: "Our Facilities | Eureka"
};

const container = "mx-auto max-w-[1140px] px-4";
const title = "text-balance text-[clamp(28px,3.2vw,42px)] font-bold leading-tight text-[#10233f]";

// Custom inline SVG icons to prevent compile errors
const ActivityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
);

const CoffeeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 8h1a4 4 0 1 1 0 8h-1"/>
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/>
    <line x1="6" x2="6" y1="2" y2="4"/>
    <line x1="10" x2="10" y1="2" y2="4"/>
    <line x1="14" x2="14" y1="2" y2="4"/>
  </svg>
);

const CpuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2"/>
    <rect x="9" y="9" width="6" height="6" rx="1"/>
    <path d="M9 1v3"/>
    <path d="M15 1v3"/>
    <path d="M9 20v3"/>
    <path d="M15 20v3"/>
    <path d="M20 9h3"/>
    <path d="M20 15h3"/>
    <path d="M1 9h3"/>
    <path d="M1 15h3"/>
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const FilmIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
    <line x1="7" y1="2" x2="7" y2="22"/>
    <line x1="17" y1="2" x2="17" y2="22"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <line x1="2" y1="7" x2="7" y2="7"/>
    <line x1="2" y1="17" x2="7" y2="17"/>
    <line x1="17" y1="17" x2="22" y2="17"/>
    <line x1="17" y1="7" x2="22" y2="7"/>
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
  </svg>
);

const LaptopIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="2" y1="20" x2="22" y2="20"/>
    <line x1="12" y1="17" x2="12" y2="20"/>
  </svg>
);

const LibraryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m16 6 4 14"/>
    <path d="M12 6v14"/>
    <path d="M8 8v12"/>
    <path d="M4 4v16"/>
  </svg>
);

const MicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
    <path d="M19 10v1a7 7 0 0 1-14 0v-1"/>
    <line x1="12" x2="12" y1="19" y2="22"/>
  </svg>
);

const MusicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13"/>
    <circle cx="6" cy="18" r="3"/>
    <circle cx="18" cy="16" r="3"/>
  </svg>
);

const PaletteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C5.35857 19.5 5.5 20 5.5 20.5C5.5 21.3284 6.17157 22 7 22H12Z"/>
    <circle cx="7.5" cy="10.5" r="1.5"/>
    <circle cx="11.5" cy="7.5" r="1.5"/>
    <circle cx="16.5" cy="9.5" r="1.5"/>
    <circle cx="15.5" cy="14.5" r="1.5"/>
  </svg>
);

const ShieldAlertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const TreePineIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 2 10 12h-6l5 7H3l5-7H2Z"/>
    <path d="M12 18v4"/>
  </svg>
);

const TruckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13"/>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
    <circle cx="5.5" cy="18.5" r="2.5"/>
    <circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);

const VideoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 8-6 4 6 4V8Z"/>
    <rect x="2" y="6" width="14" height="12" rx="2" ry="2"/>
  </svg>
);

interface FacilityCard {
  title: string;
  description: string;
  icon: any;
  category: "Academic" | "Technology" | "Hostel & Canteen" | "Extracurricular" | "Support Services";
}

const facilitiesList: FacilityCard[] = [
  {
    title: "Physics Laboratory",
    description: "Fully equipped laboratory for Grade XI & XII Science practicals, allowing students to conduct experiments in mechanics, optics, and electromagnetism.",
    icon: AwardIcon,
    category: "Academic"
  },
  {
    title: "Chemistry Laboratory",
    description: "Equipped with modern apparatus and a wide variety of chemical reagents, prioritizing safety and hands-on experiments for secondary and +2 streams.",
    icon: AwardIcon,
    category: "Academic"
  },
  {
    title: "Biology Laboratory",
    description: "Features compound microscopes, preserved specimens, botanical collections, and anatomical charts to support botanical and zoological experiments.",
    icon: ActivityIcon,
    category: "Academic"
  },
  {
    title: "Computer Lab A (Primary/Basic)",
    description: "Equipped with modern desktop computers and student monitoring software. Used for teaching basic computing, digital literacy, and logic-building.",
    icon: LaptopIcon,
    category: "Technology"
  },
  {
    title: "Computer Lab B (Secondary/+2)",
    description: "High-spec computers with programming tools (C++, Python, web tech) and fast internet for software development, coding exams, and computer science projects.",
    icon: CpuIcon,
    category: "Technology"
  },
  {
    title: "ICT Smart Board Hall",
    description: "Dedicated multimedia room featuring interactive Smart Boards and high-definition projectors to facilitate audio-visual learning and seminar classes.",
    icon: VideoIcon,
    category: "Technology"
  },
  {
    title: "General Library",
    description: "An extensive physical catalog of text references, dictionaries, encyclopedias, children's storybooks, and major magazines to build a strong reading habit.",
    icon: LibraryIcon,
    category: "Academic"
  },
  {
    title: "Digital Library",
    description: "Offers student terminals for e-resources, online encyclopedias, research journals, and downloadable educational PDFs to support study and research.",
    icon: BookOpenIcon,
    category: "Technology"
  },
  {
    title: "Mathematics Laboratory",
    description: "Equipped with mathematical models, geometric kits, and puzzles. Helps students understand complex mathematical concepts through shapes and dimensions.",
    icon: PaletteIcon,
    category: "Academic"
  },
  {
    title: "Seminar Hall A (Block A)",
    description: "A large conference hall used for public speaking events, debates, guest lectures, coordinator briefings, and inter-class competitions.",
    icon: FilmIcon,
    category: "Academic"
  },
  {
    title: "Seminar Hall B (Block B)",
    description: "Equipped with sound systems and interactive displays. Used primarily for NEB terminal exams, larger seminars, and parent-teacher interactive sessions.",
    icon: MicIcon,
    category: "Academic"
  },
  {
    title: "Improved Canteen",
    description: "A hygienic cafeteria serving healthy, freshly prepared meals, school-approved snacks, tea, and bakery items monitored regularly for quality standards.",
    icon: CoffeeIcon,
    category: "Hostel & Canteen"
  },
  {
    title: "Hostel (Semi-Boarding)",
    description: "Allows local students to stay on campus during study hours. Features supervised study sessions, homework help, and nutritional afternoon meals.",
    icon: HomeIcon,
    category: "Hostel & Canteen"
  },
  {
    title: "Hostel (Full Boarder)",
    description: "Fully residential wing for outstation students, with secure dormitories, dedicated wardens, morning yoga classes, evening tuition, and weekend hikes.",
    icon: HomeIcon,
    category: "Hostel & Canteen"
  },
  {
    title: "Proposed Futsal Facility",
    description: "A state-of-the-art synthetic turf futsal ground planned to encourage physical fitness, soccer coordination, teamwork, and school tournaments.",
    icon: ActivityIcon,
    category: "Extracurricular"
  },
  {
    title: "School Transportation Fleet",
    description: "A fleet of safe, well-maintained school buses and vans covering all major routes and neighborhoods of Dharan to ensure timely pick-up and drop-off.",
    icon: TruckIcon,
    category: "Support Services"
  },
  {
    title: "Robotics & AI Lab",
    description: "Equipped with Arduino kits, microcontrollers, sensor nodes, and 3D design software. Managed by the Roboflics & AI Club for student STEM activities.",
    icon: CpuIcon,
    category: "Extracurricular"
  },
  {
    title: "Music Studio & Practice Room",
    description: "Equipped with keyboards, drums, acoustic guitars, and audio systems. Provides a dedicated space for vocal and instrumental practice.",
    icon: MusicIcon,
    category: "Extracurricular"
  },
  {
    title: "Dance & Performing Arts Room",
    description: "Spacious studio with wooden floors and mirrors for practicing traditional folk, classical Nepalese, and modern choreography for Foundation Day.",
    icon: FilmIcon,
    category: "Extracurricular"
  },
  {
    title: "Health & Care Unit",
    description: "A dedicated first-aid room staffed by trained staff. Collaborates with local medical institutions to run annual health checkups and vaccination camps.",
    icon: HeartIcon,
    category: "Support Services"
  },
  {
    title: "CCTV Surveillance Network",
    description: "High-definition security cameras covering corridors, gates, and open fields to ensure safety, positive discipline, and quick response times.",
    icon: EyeIcon,
    category: "Support Services"
  },
  {
    title: "Garden & Green Areas",
    description: "Landscaped yards with trees and seating arrangements, offering a serene, fresh environment for student relaxation and nature study.",
    icon: TreePineIcon,
    category: "Extracurricular"
  }
];

export default function FacilitiesPage() {
  return (
    <>
      {/* Banner Section */}
      <section className="relative isolate flex min-h-[300px] items-center overflow-hidden text-white">
        <Image
          src="/images/school building.jpg"
          alt="Eureka school building"
          fill
          sizes="100vw"
          className="-z-20 object-cover object-center"
          priority
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#10233f]/90 to-[#10233f]/40" />
        <div className={container}>
          <span className="mb-3 inline-flex min-h-7 items-center rounded-full bg-[#d9fffc] px-3.5 py-1 text-xs font-bold uppercase text-[#3eaea6]">
            Campus Amenities
          </span>
          <h1 className="max-w-[760px] text-balance text-[clamp(36px,5vw,54px)] font-black leading-tight text-white">
            Our Facilities
          </h1>
          <p className="mt-4 max-w-[660px] text-slate-200">
            Eureka provides students with modern laboratory networks, extensive libraries, sport assets, residential facilities, and safe transportation.
          </p>
        </div>
      </section>

      {/* Facilities Grid Section */}
      <section className="bg-slate-50 py-[75px] max-md:py-14">
        <div className={container}>
          <div className="mb-12 text-center max-w-[690px] mx-auto">
            <span className="mb-3 inline-flex min-h-7 items-center rounded-full bg-[#d9fffc] px-3 py-1 text-xs font-bold uppercase text-[#3eaea6]">
              Resource Directory
            </span>
            <h2 className={title}>World-Class Infrastructure for Holistic Growth</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              Explore the detailed catalog of 20+ infrastructures built to keep learning activity-driven, safe, and modern from Montessori to Grade XII.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
            {facilitiesList.map((facility) => {
              const Icon = facility.icon;
              return (
                <article
                  className="group flex flex-col justify-between rounded-lg bg-white p-6 shadow-sm border border-slate-100 transition hover:-translate-y-1 hover:shadow-md"
                  key={facility.title}
                >
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <span className="grid h-10 w-10 place-items-center rounded bg-[#d9fffc] text-[#3eaea6] group-hover:bg-[#ff7b3b] group-hover:text-white transition">
                        <Icon />
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-100 px-2.5 py-1 rounded">
                        {facility.category}
                      </span>
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-[#10233f] group-hover:text-[#3eaea6] transition">
                      {facility.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#4b4b4b] text-slate-600">
                      {facility.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Core Admissions Call-out */}
          <div className="mt-16 rounded-xl bg-gradient-to-r from-[#3eaea6] to-[#2fb7a9] p-10 text-white shadow-md flex items-center justify-between gap-6 max-md:flex-col max-md:text-center max-md:p-8">
            <div className="max-w-[620px]">
              <span className="text-xs font-black uppercase tracking-wider text-teal-100 bg-white/20 px-3 py-1 rounded-full">
                Admissions 2083
              </span>
              <h3 className="text-2xl font-bold mt-3 mb-2 text-white">Experience our campus first-hand</h3>
              <p className="text-sm text-teal-50 text-slate-200">
                Schedule a school tour with our coordinator. We welcome parents and prospective students to inspect our science laboratories, library, and interact with academic faculties.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-full bg-[#ff7b3b] px-7 py-3 text-xs font-black uppercase text-white shadow hover:bg-[#10233f] hover:text-white transition"
            >
              Book a Tour Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
