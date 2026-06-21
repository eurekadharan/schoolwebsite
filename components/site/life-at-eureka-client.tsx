"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Trophy,
  Microscope,
  Check,
  MapPin,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Camera
} from "lucide-react";

// Custom SVG components to avoid Lucide version conflicts
const Cpu = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="16" height="16" x="4" y="4" rx="2"/>
    <rect width="6" height="6" x="9" y="9" rx="1"/>
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

const MessageSquare = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const Palette = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.63-.77 1.63-1.7 0-.42-.16-.82-.46-1.12-.29-.29-.48-.68-.48-1.11 0-.93.77-1.7 1.7-1.7h3.13c2.72 0 5-2.28 5-5 0-5.3-4.2-9.3-9.5-9.3Z"/>
  </svg>
);

const Play = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="6 3 20 12 6 21 6 3"/>
  </svg>
);

const Volume2 = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
  </svg>
);

const VolumeX = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <line x1="22" y1="9" x2="16" y2="15"/>
    <line x1="16" y1="9" x2="22" y2="15"/>
  </svg>
);

const Maximize2 = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="15 3 21 3 21 9"/>
    <polyline points="9 21 3 21 3 15"/>
    <line x1="21" y1="3" x2="14" y2="10"/>
    <line x1="3" y1="21" x2="10" y2="14"/>
  </svg>
);
import { school, getPageSummary } from "@/lib/site-data";

type PageSummary = NonNullable<ReturnType<typeof getPageSummary>>;

interface SchoolEvent {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover_image: string;
  location: string;
  starts_at: string;
  ends_at: string;
}

const container = "mx-auto max-w-[1140px] px-4";
const eyebrow = "mb-4 inline-flex min-h-7 items-center rounded-full bg-[#d9fffc] px-3 py-1 text-xs font-bold uppercase text-[#3eaea6]";
const titleClass = "text-balance text-[clamp(28px,3.2vw,42px)] font-bold leading-tight text-[#2e2c2c]";
const btnPrimary = "inline-flex min-h-[42px] items-center justify-center rounded-full bg-[#ff7b3b] px-6 py-3 text-xs font-bold uppercase text-white transition hover:-translate-y-0.5 hover:bg-[#3eaea6]";

// Sports Data
const sportsList = [
  {
    title: "Table Tennis Arena",
    category: "Indoor Sports",
    tag: "Daily Matches",
    desc: "Equipped with multiple professional tables, our indoor arena supports daily student challenges, coaching clinics, and terminal tournaments.",
    image: "/images/table tennis.jpg",
    details: ["Multiple pro tables", "Coaching guides", "Singles/Doubles matches", "Inter-House leagues"]
  },
  {
    title: "Volleyball Court",
    category: "Outdoor Athletics",
    tag: "Tournament Ready",
    desc: "A full-sized clay volleyball court hosts intense inter-house clashes and is the training ground for our HISSAN Sports Meet champions.",
    image: "/images/volleyball.jpg",
    details: ["Standard court size", "Clay play court", "Regular matches", "Annual championships"]
  },
  {
    title: "Futsal Ground",
    category: "Proposed Infrastructure",
    tag: "Modern Turf",
    desc: "Our planned modern turf futsal arena is designed to keep students fit, collaborative, and engaged in tactical team football.",
    image: "/images/eurekeans futsal.jpg",
    details: ["Planned turf field", "All-weather play", "Tactical sessions", "After-school tournaments"]
  },
  {
    title: "Yoga & Mindfulness",
    category: "Wellness & Focus",
    tag: "Daily Morning",
    desc: "To balance academic rigor, students practice daily yoga and meditation, improving flexibility, respiratory health, and cognitive concentration.",
    image: "/images/yoga programmes.jpg",
    details: ["Professional instructors", "Flexibility postures", "Guided breathing", "Morning routines"]
  }
];

// Clubs Data
const clubsList = [
  {
    title: "Robotics & AI Club",
    subtitle: "Coding & Engineering Hub",
    desc: "Students learn Arduino coding, microcontrollers, sensor integration, and basic artificial intelligence to design autonomous models.",
    image: "/images/robotic club.png",
    icon: Cpu,
    colorClass: "bg-[#3eaea6]/10 text-[#3eaea6]",
    borderColor: "hover:border-[#3eaea6]"
  },
  {
    title: "Youth Forum & Debate",
    subtitle: "Oratory & Social Forum",
    desc: "Fosters public speaking, debate capability, structural thinking, and local social initiatives to create confident tomorrow-ready leaders.",
    image: "/images/youth forum.jpg",
    icon: MessageSquare,
    colorClass: "bg-[#ff7b3b]/10 text-[#ff7b3b]",
    borderColor: "hover:border-[#ff7b3b]"
  },
  {
    title: "Science Practical Circle",
    subtitle: "Laboratory & Botany Field Research",
    desc: "Hands-on chemical experiments, physics models, biology microscopic studies, and collection of local herbarium specimens.",
    image: "/images/student in science  lab.JPG",
    icon: Microscope,
    colorClass: "bg-[#10233f]/10 text-[#10233f]",
    borderColor: "hover:border-[#10233f]"
  },
  {
    title: "Arts & Culture Club",
    subtitle: "Music, Dance & Fine Arts",
    desc: "Dedicated to training students in traditional, folk, and modern dances, classical music, dramatic theatre, and annual celebrations.",
    image: "/images/cultural programme.JPG",
    icon: Palette,
    colorClass: "bg-[#ffb03b]/10 text-[#ffb03b]",
    borderColor: "hover:border-[#ffb03b]"
  }
];

// Other Programmes Gallery
const galleryImagesList = [
  { src: "/images/plantation programme.jpg", category: "Outreach", title: "Eco Club Tree Plantation" },
  { src: "/images/world evironment day.jpg", category: "Exhibitions", title: "Environment Day Projects" },
  { src: "/images/christmas celebration.jpg", category: "Celebrations", title: "Christmas Winter Carnival" },
  { src: "/images/see results 2082.jpg", category: "Achievements", title: "SEE Success Celebration" },
  { src: "/images/alumnai students.JPG", category: "Community", title: "Alumni Interaction Panel" },
  { src: "/images/arts.JPG", category: "Exhibitions", title: "Fine Arts & Craft Exhibition" },
  { src: "/images/kids in library.jpg", category: "Academics", title: "Primary Reading Excursions" },
  { src: "/images/kids singing.jpeg", category: "Celebrations", title: "Music Class Performance" }
];

const iconMap: Record<string, any> = {
  Cpu: Cpu,
  MessageSquare: MessageSquare,
  Microscope: Microscope,
  Palette: Palette,
  Trophy: Trophy,
  Check: Check,
  Sparkles: Sparkles,
  Camera: Camera
};

function getClubIcon(iconName: any) {
  if (!iconName) return Trophy;
  if (typeof iconName === "function" || (iconName && typeof iconName === "object" && (iconName as any).$$typeof)) {
    return iconName;
  }
  if (typeof iconName === "string") {
    return iconMap[iconName] || Trophy;
  }
  return iconName;
}

function getVideoEmbedUrl(url: string): string {
  if (!url) return "";
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    let videoId = "";
    if (url.includes("youtube.com/watch")) {
      const match = url.match(/[?&]v=([^&#]+)/);
      if (match) videoId = match[1];
    } else if (url.includes("youtu.be/")) {
      const match = url.match(/youtu\.be\/([^?&#]+)/);
      if (match) videoId = match[1];
    } else if (url.includes("youtube.com/embed/")) {
      const match = url.match(/youtube\.com\/embed\/([^?&#]+)/);
      if (match) videoId = match[1];
    }
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0`;
    }
  }
  if (url.includes("drive.google.com")) {
    const match = url.match(/\/file\/d\/([^/]+)/);
    if (match) {
      const fileId = match[1];
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
  }
  return url;
}

export function LifeAtEurekaClient({ page }: { page: any }) {
  const sports = page?.body?.sports || sportsList;
  const clubs = page?.body?.clubs || clubsList;
  const gallery = page?.body?.gallery || galleryImagesList;
  const videos = page?.body?.videos || [
    {
      title: "Eureka Campus Video Tour",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
      title: "Holistic Sports and Futsal Match",
      url: "https://drive.google.com/file/d/1Xy8y_q2S9G_g_L-z_Ww_G7_v9w_P9G_/view"
    }
  ];

  const eyebrowText = page?.eyebrow || "Student Life";
  const heroImage = page?.image || "/images/christmas celebration.jpg";

  const [activeTab, setActiveTab] = useState("All");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [events, setEvents] = useState<SchoolEvent[]>([]);
  
  // Video Player states
  const [selectedVideo, setSelectedVideo] = useState(videos[0] || null);
  const [isClientPlaying, setIsClientPlaying] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  useEffect(() => {
    if (videos && videos.length > 0) {
      setSelectedVideo(videos[0]);
    }
  }, [videos]);

  // Gallery categories list
  const categories = ["All", "Celebrations", "Exhibitions", "Outreach", "Community"];

  // Filter gallery
  const filteredGallery = activeTab === "All" 
    ? gallery 
    : gallery.filter((item: any) => item.category === activeTab);

  // Fetch events
  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEvents(data.slice(0, 4));
        }
      })
      .catch((err) => console.error("Error loading events previews on life page:", err));
  }, []);

  const handlePrevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + filteredGallery.length) % filteredGallery.length);
    }
  };

  const handleNextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % filteredGallery.length);
    }
  };

  return (
    <>
      {/* Hero Banner Section */}
      <section className="relative isolate flex min-h-[380px] items-center overflow-hidden text-white max-md:min-h-[280px]">
        <Image 
          src={heroImage} 
          alt={page.title} 
          fill 
          sizes="100vw" 
          className="-z-20 object-cover object-center" 
          priority 
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#2b2e3d]/90 via-[#2b2e3d]/70 to-[#2b2e3d]/40" />
        <div className={container}>
          <div className="max-w-[760px]">
            <span className={eyebrow}>{eyebrowText}</span>
            <h1 className="text-balance text-[clamp(32px,5.5vw,56px)] font-black leading-tight text-white">{page.title}</h1>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-white/90">
              At Eureka, student life is vibrant, engaging, and holistic. Beyond academic excellence, we prioritize physical health, creativity, scientific inquiry, and social responsibility.
            </p>
          </div>
        </div>
      </section>

      {/* Overview Statistics Callout */}
      <section className="bg-white py-8 border-b border-slate-100">
        <div className={`${container} flex flex-wrap justify-between items-center gap-6 text-center md:text-left`}>
          <div className="flex items-center gap-4 max-md:flex-col max-md:w-full">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#d9fffc] text-[#3eaea6]">
              <Sparkles size={24} />
            </span>
            <div>
              <h3 className="text-sm font-bold text-[#2e2c2c]">Comprehensive ECA Module</h3>
              <p className="text-xs text-slate-500 mt-0.5">Balancing sports tournaments, digital AI coding, and public speaking drill sessions.</p>
            </div>
          </div>
          <div className="flex gap-8 justify-center max-md:w-full">
            <div>
              <span className="block text-2xl font-black text-[#ff7b3b]">4+</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Sports Areas</span>
            </div>
            <div className="border-l border-slate-200" />
            <div>
              <span className="block text-2xl font-black text-[#3eaea6]">6+</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Student-led Clubs</span>
            </div>
            <div className="border-l border-slate-200" />
            <div>
              <span className="block text-2xl font-black text-[#10233f]">100%</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Participation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sports & Wellness Hub Section */}
      <section className="py-[75px] max-md:py-14 bg-slate-50" id="sports">
        <div className={container}>
          <div className="mx-auto mb-14 max-w-[760px] text-center">
            <span className={eyebrow}>Physical Health & Agility</span>
            <h2 className={titleClass}>Sports Facilities & Athletics</h2>
            <p className="mt-4 text-[#4b4b4b] leading-relaxed text-[15px]">
              We believe a strong mind resides in a healthy body. Eureka offers standard courts, professional supervision, and regular competitive games to build teamwork, discipline, and physical strength.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-6 max-xl:grid-cols-2 max-md:grid-cols-1">
            {sports.map((sport: any) => (
              <article key={sport.title} className="group overflow-hidden rounded-xl bg-white border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition duration-300">
                <div>
                  <div className="relative h-[180px] w-full overflow-hidden">
                    <Image 
                      src={sport.image} 
                      alt={sport.title} 
                      fill 
                      sizes="(max-width:768px) 100vw, 270px" 
                      className="object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <span className="absolute left-3 top-3 bg-black/65 text-[10px] font-bold text-white px-2 py-0.5 rounded backdrop-blur-sm">
                      {sport.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <span className="inline-block text-[9px] font-black uppercase text-[#ff7b3b] tracking-wider mb-1">
                      {sport.tag}
                    </span>
                    <h3 className="text-lg font-bold text-[#2e2c2c] mt-0.5">{sport.title}</h3>
                    <p className="text-xs leading-relaxed text-slate-500 mt-2.5">
                      {sport.desc}
                    </p>
                  </div>
                </div>
                <div className="px-5 pb-5 pt-3 border-t border-slate-50 bg-slate-50/50">
                  <ul className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[10px] font-semibold text-[#2e2c2c]">
                    {sport.details.map((detail: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-1">
                        <Check size={11} className="text-[#3eaea6] shrink-0" />
                        <span className="truncate">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Student Clubs & Innovation Hub Section */}
      <section className="py-[75px] max-md:py-14 bg-white" id="clubs">
        <div className={container}>
          <div className="mx-auto mb-14 max-w-[760px] text-center">
            <span className={eyebrow}>Student Leadership</span>
            <h2 className={titleClass}>Clubs, Communities & Forums</h2>
            <p className="mt-4 text-[#4b4b4b] leading-relaxed text-[15px]">
              Our clubs empower students to explore robotics coding, environmental preservation, social service, and artistic dance. Student-led forums organize weekly sessions and term events.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 max-lg:grid-cols-1">
            {clubs.map((club: any) => {
              const ClubIcon = getClubIcon(club.icon);
              return (
                <article 
                  key={club.title} 
                  className={`group rounded-xl border border-slate-100 bg-white p-6 flex gap-6 items-start shadow-sm transition-all duration-300 ${club.borderColor} hover:shadow-md max-sm:flex-col`}
                >
                  <div className="relative h-[130px] w-[140px] rounded-lg overflow-hidden shrink-0 max-sm:w-full max-sm:h-[180px]">
                    <Image 
                      src={club.image} 
                      alt={club.title} 
                      fill 
                      sizes="140px" 
                      className="object-cover object-center group-hover:scale-105 transition duration-500" 
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className={`grid h-10 w-10 place-items-center rounded-lg ${club.colorClass}`}>
                        <ClubIcon size={20} />
                      </span>
                      <div>
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">{club.subtitle}</span>
                        <h3 className="text-base font-bold text-[#2e2c2c] mt-0.5">{club.title}</h3>
                      </div>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-500 mt-3.5">
                      {club.desc}
                    </p>
                    <div className="mt-4 flex gap-3 text-[10px] font-bold text-slate-400">
                      <span>• Weekly Meetings (Friday)</span>
                      <span>• Internal Exhibitions</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video Highlights Section */}
      <section className="py-[75px] max-md:py-14 bg-slate-900 text-white relative isolate overflow-hidden" id="video">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(62,174,166,0.15),transparent)] pointer-events-none" />
        <div className={container}>
          <div className="mx-auto mb-10 max-w-[760px] text-center">
            <span className="mb-4 inline-flex min-h-7 items-center rounded-full bg-[#3eaea6]/20 px-3 py-1 text-xs font-bold uppercase text-[#3eaea6]">
              Watch Us In Action
            </span>
            <h2 className="text-balance text-[clamp(28px,3.2vw,42px)] font-bold leading-tight text-white">Experience the energy of life at {school.shortName}</h2>
            <p className="mt-4 text-slate-300 leading-relaxed text-sm">
              Take a tour through our modern facilities, witness our annual fests, sports events, and see how classroom theories merge with practical student projects.
            </p>
          </div>

          <div className="grid grid-cols-[1.5fr_1fr] gap-8 items-start max-lg:grid-cols-1">
            {/* Active Video Player */}
            <div className="flex flex-col gap-4">
              <div className="relative overflow-hidden rounded-2xl bg-black border border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] aspect-[16/9] w-full">
                {isClientPlaying && selectedVideo ? (
                  <iframe 
                    src={getVideoEmbedUrl(selectedVideo.url)}
                    title={selectedVideo.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/45 hover:bg-black/60 transition duration-300 cursor-pointer" onClick={() => setIsClientPlaying(true)}>
                    <Image 
                      src="/images/kids singing.jpeg" 
                      alt="Video cover thumbnail" 
                      fill 
                      className="object-cover opacity-60"
                    />
                    <span className="grid h-16 w-16 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md shadow-xl border border-white/20 transition-all hover:scale-110 hover:bg-[#ff7b3b] hover:border-transparent duration-300 z-10">
                      <Play size={28} className="translate-x-0.5 text-white fill-white" />
                    </span>
                    <span className="mt-4 text-xs font-bold uppercase tracking-wider text-white bg-slate-900/80 backdrop-blur-sm px-4 py-1.5 rounded z-10 border border-slate-800">
                      Play: {selectedVideo?.title || "Video"}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Video Controls & Info */}
              {selectedVideo && (
                <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/80 flex justify-between items-center max-sm:flex-col max-sm:items-start gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#ff7b3b] shrink-0" />
                      {selectedVideo.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Playing from: {selectedVideo.url.includes("youtube") || selectedVideo.url.includes("youtu.be") ? "YouTube Video Embed" : "Google Drive Player"}
                    </p>
                  </div>
                  <button 
                    onClick={() => setVideoModalOpen(true)} 
                    className="hover:text-[#ff7b3b] text-slate-300 transition flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-slate-950 px-3 py-1.5 rounded border border-slate-800 shrink-0"
                  >
                    <Maximize2 size={12} /> Fullscreen
                  </button>
                </div>
              )}
            </div>

            {/* Playlist Sidebar */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 flex flex-col gap-4 self-stretch max-h-[380px] overflow-y-auto">
              <h3 className="text-xs font-black uppercase text-[#3eaea6] tracking-wider pb-2 border-b border-slate-800">
                Video Playlist ({videos.length})
              </h3>
              <div className="grid gap-2">
                {videos.map((vid: any, vIdx: number) => {
                  const isCurrent = selectedVideo?.url === vid.url;
                  return (
                    <button
                      key={vIdx}
                      onClick={() => {
                        setSelectedVideo(vid);
                        setIsClientPlaying(true);
                      }}
                      className={`w-full text-left p-3 rounded-lg border transition flex items-start gap-3 ${
                        isCurrent
                          ? "bg-[#ff7b3b]/10 border-[#ff7b3b] text-white"
                          : "bg-slate-900/40 border-slate-800 text-slate-300 hover:bg-slate-900/80 hover:text-white"
                      }`}
                    >
                      <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[10px] ${isCurrent ? "bg-[#ff7b3b] text-white" : "bg-slate-800 text-slate-400"}`}>
                        <Play size={8} className="translate-x-0.5 fill-current" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold truncate">{vid.title}</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5 truncate">{vid.url}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Video Fullscreen Modal Overlay */}
        {videoModalOpen && selectedVideo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4" role="dialog" aria-modal="true">
            <div className="relative w-full max-w-[940px] aspect-[16/9] bg-black rounded-lg overflow-hidden border border-slate-800 shadow-2xl">
              <button 
                onClick={() => setVideoModalOpen(false)}
                className="absolute right-4 top-4 z-50 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white hover:bg-black transition border border-slate-700"
                aria-label="Close video player"
              >
                <X size={18} />
              </button>
              
              <iframe 
                src={getVideoEmbedUrl(selectedVideo.url)}
                title={selectedVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </section>

      {/* Dynamic Events Timeline Section */}
      <section className="py-[75px] max-md:py-14 bg-white" id="events">
        <div className={container}>
          <div className="mx-auto mb-14 max-w-[760px] text-center">
            <span className={eyebrow}>Active Calendar</span>
            <h2 className={titleClass}>Upcoming & Recent events</h2>
            <p className="mt-4 text-[#4b4b4b] leading-relaxed text-[15px]">
              Stay updated with academic timelines, project exhibitions, and celebrations. Our events calendar is dynamically managed and synced.
            </p>
          </div>

          {events.length === 0 ? (
            <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
              {[
                { title: "Weekly Project-Based Learning Exhibition", desc: "Basic and secondary level students showcase their physics models and local botanical collection.", date: "July 02, 2026", location: "School Seminar Hall", image: "/images/students demonstrating art.JPG" },
                { title: "Annual Table Tennis League 2026", desc: "Exciting matches across primary and secondary groups in Table Tennis Arena.", date: "July 08, 2026", location: "ECA TT Zone", image: "/images/table tennis.jpg" },
                { title: "Science Practical Demonstration Day", desc: "A full day of laboratory practicals and botanical herbarium showcases.", date: "July 12, 2026", location: "Science Labs Block B", image: "/images/science students practical collecting herbium.jpg" },
                { title: "Koshi Province HISSAN Sports Meet Preparation", desc: "Selection and coaching camp for futsal and volleyball representatives.", date: "July 18, 2026", location: "Sports Grounds", image: "/images/eurekeans futsal.jpg" }
              ].map((ev, i) => (
                <article key={i} className="flex bg-slate-50 border border-slate-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 max-sm:flex-col">
                  <div className="relative w-[180px] shrink-0 max-sm:w-full max-sm:h-[160px]">
                    <Image src={ev.image} alt={ev.title} fill className="object-cover" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#ff7b3b] bg-[#ff7b3b]/10 px-2 py-0.5 rounded">
                        {ev.date}
                      </span>
                      <h3 className="font-bold text-sm text-[#2e2c2c] mt-2 leading-snug">{ev.title}</h3>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-2">{ev.desc}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-4">
                      <MapPin size={11} className="text-[#3eaea6]" /> {ev.location}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
              {events.map((event) => {
                const eventDate = new Date(event.starts_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric"
                });
                return (
                  <article key={event.id} className="flex bg-slate-50 border border-slate-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 max-sm:flex-col">
                    <div className="relative w-[180px] shrink-0 max-sm:w-full max-sm:h-[160px]">
                      <Image src={event.cover_image || "/images/christmas celebration.jpg"} alt={event.title} fill className="object-cover" />
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-[#ff7b3b] bg-[#ff7b3b]/10 px-2 py-0.5 rounded">
                          {eventDate}
                        </span>
                        <h3 className="font-bold text-sm text-[#2e2c2c] mt-2 leading-snug">
                          <Link href={`/events/${event.slug}`} className="hover:text-[#3eaea6] transition">
                            {event.title}
                          </Link>
                        </h3>
                        <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-2">{event.excerpt}</p>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-4">
                        <MapPin size={11} className="text-[#3eaea6]" /> {event.location || "Campus Ground"}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link className={btnPrimary} href="/events">View Complete Events Calendar</Link>
          </div>
        </div>
      </section>

      {/* Filterable Media Gallery Section */}
      <section className="py-[75px] max-md:py-14 bg-slate-50" id="gallery">
        <div className={container}>
          <div className="mx-auto mb-11 max-w-[760px] text-center">
            <span className={eyebrow}>Moments At Eureka</span>
            <h2 className={titleClass}>Co-Curricular & Outreach Gallery</h2>
            <p className="mt-4 text-[#4b4b4b] leading-relaxed text-[15px]">
              Take a look at how our students grow, collaborate, and celebrate outside the classroom. Select a category below to filter images.
            </p>
          </div>

          {/* Filtering Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 text-xs font-bold uppercase rounded-full tracking-wider transition ${
                  activeTab === cat 
                    ? "bg-[#ff7b3b] text-white shadow-sm" 
                    : "bg-white text-slate-600 border border-slate-200/80 hover:bg-[#d9fffc] hover:text-[#3eaea6] hover:border-transparent"
                }`}
                type="button"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-4 gap-6 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
            {filteredGallery.map((item: any, idx: number) => (
              <div 
                key={idx} 
                className="group relative aspect-square w-full rounded-xl overflow-hidden border border-slate-100 bg-white shadow-sm cursor-pointer"
                onClick={() => setSelectedImageIndex(idx)}
              >
                <Image 
                  src={item.src} 
                  alt={item.title} 
                  fill 
                  sizes="(max-width:768px) 100vw, 250px" 
                  className="object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                
                {/* Glow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-10" />
                
                {/* Caption Details */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                  <span className="bg-[#3eaea6] text-[8px] font-black uppercase text-white px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  <h4 className="text-xs font-bold text-white mt-1.5 leading-snug line-clamp-1">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Lightbox Modal Overlay */}
        {selectedImageIndex !== null && (
          <div className="fixed inset-0 z-[100] flex flex-col bg-black/95 p-4" role="dialog" aria-modal="true">
            {/* Header / Controls */}
            <div className="flex justify-between items-center px-4 py-2.5 text-white z-10">
              <span className="text-xs font-semibold text-slate-400">
                {selectedImageIndex + 1} of {filteredGallery.length} — {filteredGallery[selectedImageIndex].category}
              </span>
              <button 
                onClick={() => setSelectedImageIndex(null)}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition border border-white/10"
                aria-label="Close gallery viewer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Main Lightbox Content */}
            <div className="flex-1 flex items-center justify-between relative max-w-[1140px] mx-auto w-full">
              {/* Left Arrow */}
              <button 
                onClick={handlePrevImage}
                className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition border border-white/10 max-sm:absolute max-sm:left-2 max-sm:z-50"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Main Photo Card */}
              <div className="relative w-full h-[70vh] flex items-center justify-center p-4">
                <div className="relative w-full h-full max-w-[85vw] max-h-[65vh]">
                  <Image 
                    src={filteredGallery[selectedImageIndex].src} 
                    alt={filteredGallery[selectedImageIndex].title}
                    fill
                    className="object-contain"
                    sizes="85vw"
                    priority
                  />
                </div>
              </div>

              {/* Right Arrow */}
              <button 
                onClick={handleNextImage}
                className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition border border-white/10 max-sm:absolute max-sm:right-2 max-sm:z-50"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Bottom Caption detail */}
            <div className="text-center text-white py-4 z-10 max-w-[650px] mx-auto w-full">
              <h3 className="text-sm font-bold">{filteredGallery[selectedImageIndex].title}</h3>
              <p className="text-xs text-slate-400 mt-1">Co-curricular activities at {school.name}</p>
            </div>
          </div>
        )}
      </section>

      {/* Admissions Stripe Banner */}
      <section className="bg-[linear-gradient(297deg,#ff7b3b_14%,#3eaea6_70%)] py-[75px] text-white" id="admission">
        <div className={`${container} flex items-center justify-between gap-7 max-md:grid`}>
          <div>
            <span className="mb-4 inline-flex min-h-7 items-center rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase text-white">Admissions</span>
            <h2 className="text-balance text-[clamp(28px,3.2vw,42px)] font-bold leading-tight text-white">Shaping bright futures at Eureka</h2>
            <p className="mt-4 max-w-[760px] text-white/90">
              Admission is open for Montessori to Grade XII. Submit an inquiry today to begin your child&apos;s holistic development journey.
            </p>
          </div>
          <Link className="inline-flex min-h-[42px] items-center justify-center rounded-full bg-white px-6 py-3 text-xs font-bold uppercase text-[#2e2c2c] transition hover:-translate-y-0.5 hover:bg-[#10233f] hover:text-white shadow-md" href="/contact">Get Admission Info</Link>
        </div>
      </section>
    </>
  );
}
