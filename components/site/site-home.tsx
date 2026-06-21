"use client";

import Image from "next/image";
import Link from "next/link";
import { type FormEvent, useEffect, useState } from "react";
import SafeImage from "@/components/safe-image";
import {
  ArrowUp,
  BookOpen,
  CalendarDays,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  CirclePlus,
  FileText,
  Newspaper,
  Search,
  Users,
  X,
  Microscope,
  Home as HomeIcon,
  Trophy
} from "lucide-react";
import {
  aboutTabs,
  documents,
  faqs,
  galleryItems,
  programs,
  school,
  stats,
  testimonials,
  whyEureka,
  newsNotices,
  insightsBlogs
} from "@/lib/site-data";

interface SchoolEvent {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover_image: string;
  location: string;
  starts_at: string;
  ends_at: string;
  status: "draft" | "published" | "archived";
}

// Custom SVG Icons to avoid Lucide version conflicts
const LaptopIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="2" y1="20" x2="22" y2="20"/>
    <line x1="12" y1="17" x2="12" y2="20"/>
  </svg>
);

const ActivityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
);

const TvIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/>
    <polyline points="17 2 12 7 7 2"/>
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const Cpu = ({ size = 24, className = "" }) => (
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

function ECASlideshow({ images, altPrefix }: { images: string[]; altPrefix: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative h-[240px] w-full overflow-hidden bg-slate-900">
      {images.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            i === index ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105"
          }`}
        >
          <Image
            src={src}
            alt={`${altPrefix} slide ${i + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 550px"
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-4 right-4 z-30 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              i === index ? "bg-white w-5" : "bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
            type="button"
          />
        ))}
      </div>
    </div>
  );
}

const sectionPad = "py-[75px] max-md:py-14";
const container = "mx-auto max-w-[1140px] px-4";
const eyebrow =
  "mb-4 inline-flex min-h-7 items-center rounded-full bg-[#d9fffc] px-3 py-1 text-xs font-bold uppercase text-[#3eaea6]";
const title = "text-balance text-[clamp(28px,3.2vw,42px)] font-bold leading-tight text-[#2e2c2c]";
const btnPrimary =
  "inline-flex min-h-[42px] items-center justify-center rounded-full bg-[#ff7b3b] px-6 py-3 text-xs font-bold uppercase text-white transition hover:-translate-y-0.5 hover:bg-[#3eaea6]";
const btnSecondary =
  "inline-flex min-h-[42px] items-center justify-center rounded-full bg-[#d9fffc] px-6 py-3 text-xs font-bold uppercase text-[#2e2c2c] transition hover:-translate-y-0.5 hover:bg-[#2b2e3d] hover:text-white";

const documentIcons = {
  calendar: CalendarDays,
  file: FileText,
  book: BookOpen
};

const heroImages = [
  "/images/school building.jpg",
  "/images/yoga programmes.jpg",
  "/images/10+2 students groups.jpg",
  "/images/staffs.jpg"
];

function AdmissionPopup() {
  const [banners, setBanners] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("/api/banners?placement=popup")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // Filter to active ones only, just in case
          const activePopups = data.filter((b: any) => b.is_active !== false);
          if (activePopups.length > 0) {
            setBanners(activePopups);
            setCurrentIndex(0);
            setOpen(true);
          }
        }
      })
      .catch((err) => console.error("Error fetching popup banner:", err));
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  if (!open || banners.length === 0 || currentIndex >= banners.length) return null;

  const banner = banners[currentIndex];

  const handleClose = () => {
    if (currentIndex + 1 < banners.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center bg-black/45 px-5 pt-24" role="dialog" aria-modal="true" aria-label={banner.title}>
      <div className="relative w-[min(430px,94vw)] overflow-hidden bg-white shadow-[0_30px_80px_rgba(43,46,61,.34)]">
        <button className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-[#2b2e3d]/80 text-white" type="button" aria-label="Close notice" onClick={handleClose}>
          <X size={18} />
        </button>
        <div className="relative h-[330px] max-sm:h-[250px]">
          <img
            src={banner.cover_image}
            alt={banner.title}
            className="object-cover object-top h-full w-full"
            onError={(e) => {
              e.currentTarget.src = "/images/school details.jpg";
            }}
          />
        </div>
        <div className="px-6 py-5 text-center">
          <span className="mb-4 inline-flex min-h-7 items-center rounded-full bg-[#d9fffc] px-3 py-1 text-xs font-bold uppercase text-[#3eaea6]">Notice</span>
          <h2 className="m-0 text-2xl font-bold leading-tight text-[#2e2c2c]">{banner.title}</h2>
          {banner.subtitle ? (
            <p className="mx-auto mb-5 mt-3 max-w-[340px] text-sm text-[#4b4b4b]">
              {banner.subtitle}
            </p>
          ) : null}
          {banner.cta_label && banner.cta_href ? (
            <Link
              className="inline-flex min-h-[42px] items-center justify-center rounded-full bg-[#ff7b3b] px-6 py-3 text-xs font-bold uppercase text-white transition hover:-translate-y-0.5 hover:bg-[#3eaea6]"
              href={banner.cta_href}
              onClick={handleClose}
            >
              {banner.cta_label}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState("");

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus("Submitting...");

    const response = await fetch("/api/forms/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData.entries()))
    });

    setStatus(response.ok ? "Thank you. Eureka will contact you shortly." : "Please check the form and try again.");
    if (response.ok) form.reset();
  }

  return (
    <form className="grid grid-cols-2 gap-3 max-md:grid-cols-1" onSubmit={submitForm}>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" hidden />
      {[
        { label: "Your Name", name: "name", type: "text", required: true },
        { label: "Your Number", name: "phone", type: "tel", required: true },
        { label: "Your Email", name: "email", type: "email", required: false }
      ].map((field) => (
        <label className="grid gap-1.5 text-xs font-bold text-[#2e2c2c]" key={field.name}>
          {field.label}
          <input className="min-h-[46px] border-0 bg-[#f8fafa] px-4 text-[#2e2c2c] outline-none focus:ring-2 focus:ring-[#3eaea6]" name={field.name} type={field.type} required={field.required} />
        </label>
      ))}
      <label className="grid gap-1.5 text-xs font-bold text-[#2e2c2c]">
        Program
        <select className="min-h-[46px] border-0 bg-[#f8fafa] px-4 text-[#2e2c2c] outline-none focus:ring-2 focus:ring-[#3eaea6]" name="subject" defaultValue="Grade XI-XII">
          <option>Grade XI-XII</option>
          <option>Secondary Level</option>
          <option>Basic Level</option>
          <option>Primary Level</option>
          <option>Montessori Wing</option>
        </select>
      </label>
      <label className="col-span-2 grid gap-1.5 text-xs font-bold text-[#2e2c2c] max-md:col-span-1">
        Message
        <textarea className="min-h-[120px] resize-y border-0 bg-[#f8fafa] px-4 py-3 text-[#2e2c2c] outline-none focus:ring-2 focus:ring-[#3eaea6]" name="message" required />
      </label>
      <div className="col-span-2 max-md:col-span-1">
        <button className={btnPrimary} type="submit">
          Contact Us
        </button>
        {status ? <p className="mt-3 text-sm font-bold text-[#3eaea6]">{status}</p> : null}
      </div>
    </form>
  );
}

export function SiteHome() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const [heroIndex, setHeroIndex] = useState(0); // Starts with school building.jpg
  const [achievements, setAchievements] = useState<any[]>([]);
  const [banners, setBanners] = useState<any[]>([]);
  const [notices, setNotices] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);

  const activeGalleryItems = gallery.length > 0 ? gallery : galleryItems;
  const currentGallery = activeGalleryItems[galleryIndex % activeGalleryItems.length];

  const activeHeroImages = banners.length > 0
    ? banners.map((b) => b.cover_image)
    : heroImages;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setGalleryIndex((index) => (index + 1) % activeGalleryItems.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [activeGalleryItems.length]);

  useEffect(() => {
    fetch("/api/banners?placement=home_hero")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setBanners(data);
        }
      })
      .catch((err) => console.error("Error loading home hero banners:", err));
  }, []);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setGallery(data);
        }
      })
      .catch((err) => console.error("Error loading gallery photos:", err));
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      // Scroll left-to-right by decrementing index
      setHeroIndex((index) => (index - 1 + activeHeroImages.length) % activeHeroImages.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [activeHeroImages.length]);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEvents(data);
        }
      })
      .catch((err) => console.error("Error loading events previews:", err));
  }, []);

  useEffect(() => {
    fetch("/api/hall-of-fame")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAchievements(data);
        }
      })
      .catch((err) => console.error("Error loading hall of fame:", err));
  }, []);

  useEffect(() => {
    fetch("/api/posts?type=notice")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setNotices(data.slice(0, 3));
        }
      })
      .catch((err) => console.error("Error loading notices previews:", err));
  }, []);

  useEffect(() => {
    fetch("/api/posts?type=blog")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBlogs(data.slice(0, 3));
        }
      })
      .catch((err) => console.error("Error loading blogs previews:", err));
  }, []);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = String(new FormData(event.currentTarget).get("query") || "").trim();
    if (query) window.location.href = `/blogs?q=${encodeURIComponent(query)}`;
  }

  // Segment programs for layout structure
  const basicLevelPrograms = programs.filter((p) =>
    ["montessori", "primary", "basic-level"].includes(p.slug)
  );
  const plusTwoStreams = programs.filter((p) =>
    ["science", "management", "computer-science"].includes(p.slug)
  );

  return (
    <>
      <AdmissionPopup />

      {/* Hero Section */}
      <section className="relative isolate flex min-h-[668px] items-center overflow-hidden max-md:min-h-[590px]" id="home" aria-labelledby="hero-title">
        {/* Background Image Carousel (scrolling left to right) */}
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <div
            className="flex h-full transition-transform duration-1000 ease-in-out"
            style={{ 
              width: `${activeHeroImages.length * 100}%`,
              transform: `translateX(-${(heroIndex * 100) / activeHeroImages.length}%)` 
            }}
          >
            {activeHeroImages.map((src, i) => (
              <div key={src} style={{ width: `${100 / activeHeroImages.length}%` }} className="relative h-full flex-shrink-0">
                <Image
                  src={src}
                  alt={`Eureka hero image ${i + 1}`}
                  fill
                  sizes="100vw"
                  className="object-cover object-center"
                  priority={true}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/75 via-white/45 to-transparent max-md:bg-white/80" />
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 xl:px-32">
          <div className="max-w-[690px] py-[75px] max-md:py-14">
            <p className="mb-5 border-l-[3px] border-[#ff7b3b] pl-3 text-xl font-semibold leading-tight text-[#2e2c2c] max-md:text-base">
              Eureka Residential Secondary School • Dharan-1
            </p>
            <h1 id="hero-title" className="mb-5 max-w-[720px] text-balance text-[clamp(34px,5vw,60px)] font-bold leading-[1.05] text-[#2e2c2c]">
              Helping students pursue excellence with discipline and confidence
            </h1>
            <p className="mb-6 max-w-[560px] text-[15px] leading-7 text-[#4b4b4b]">
              From Montessori to Grade XII, Eureka blends strong academics, Project-Based Learning,
              technology, culture, and character formation.
            </p>
            <form className="mb-5 flex min-h-11 w-[min(100%,520px)] rounded bg-[#d9fffc]" onSubmit={handleSearch} role="search">
              <label className="sr-only" htmlFor="site-search">Search Eureka</label>
              <input className="min-w-0 flex-1 bg-transparent px-4 text-[#2e2c2c] outline-none" id="site-search" name="query" type="search" placeholder="Search programs, admissions, notices" />
              <button className="grid w-12 place-items-center text-[#777]" type="submit" aria-label="Search">
                <Search size={18} />
              </button>
            </form>
            <div className="flex flex-wrap gap-3">
              <Link className={btnPrimary} href="/about">Discover Us</Link>
              <Link className={btnSecondary} href="/admission">Enroll Now</Link>
            </div>
          </div>
        </div>
        <div className="absolute left-3 top-1/2 grid -translate-y-1/2 gap-2 max-md:hidden" aria-label="Social links">
          {[Users, Newspaper, Camera].map((Icon, index) => (
            <Link className="grid h-6 w-6 place-items-center rounded-full bg-[#d9fffc] text-[#3eaea6]" href={["/", "/news", "/gallery"][index]} aria-label={["Community", "News", "Gallery"][index]} key={index}>
              <Icon size={13} />
            </Link>
          ))}
        </div>
      </section>

      {/* Statistics */}
      <section className="py-12 bg-white" id="results">
        <div className={`${container} grid grid-cols-4 gap-5 text-center max-lg:grid-cols-2 max-md:grid-cols-1`}>
          {stats.map((stat) => (
            <div className="grid min-h-[130px] place-items-center rounded-[10px] bg-white p-5 shadow-eureka" key={stat.label}>
              <strong className="text-[42px] leading-none text-[#ff7b3b]">{stat.value}</strong>
              <span className="text-xs font-bold uppercase text-[#2e2c2c]">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* About Eureka Section */}
      <section className={`bg-[#d9fffc] ${sectionPad}`} id="about">
        <div className={`${container} grid grid-cols-[1fr_1.05fr] items-center gap-16 max-lg:grid-cols-1`}>
          <div>
            <span className={eyebrow}>About Eureka</span>
            <h2 className={title}>Pave your path forward with Eureka Residential Secondary School</h2>
            <p className="mt-5 text-[#4b4b4b]">
              Founded in 1994, Eureka is one of Dharan&apos;s leading schools, educating {school.students}
              students in a disciplined, safe, and student-centered environment.
            </p>
            <Link className={`${btnPrimary} mt-4`} href="/about">Learn More</Link>
          </div>
          <div className="grid gap-3">
            {aboutTabs.map((tab, index) => {
              const expanded = activeFeature === index;
              return (
                <article className="overflow-hidden rounded-[5px] bg-white shadow-eureka" key={tab.title}>
                  <button
                    className={`flex min-h-[58px] w-full items-center justify-between px-6 py-4 text-left font-bold ${
                      expanded ? "bg-[#ff7b3b] text-white" : "bg-white text-[#2e2c2c]"
                    }`}
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => setActiveFeature(index)}
                  >
                    {tab.title}
                    <CirclePlus size={18} />
                  </button>
                  {expanded ? (
                    <div className="px-6 py-5 text-sm leading-6 text-[#4b4b4b]">
                      <p>{tab.body}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {tab.ctas.map((cta, ctaIndex) => (
                          <Link className={ctaIndex === 0 ? btnPrimary : btnSecondary} href={cta.href} key={cta.label}>{cta.label}</Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Programs Section */}
      <section className={sectionPad} id="programs">
        <div className={container}>
          <div className="mx-auto mb-11 max-w-[760px] text-center">
            <span className={eyebrow}>Our Programs</span>
            <h2 className={title}>Learn Today, Lead Tomorrow with Eureka</h2>
            <p className="mx-auto mt-4 max-w-[650px] text-[#4b4b4b]">
              A complete school journey from early childhood to Grade XII, designed for confident,
              disciplined, and capable learners.
            </p>
          </div>

          {/* Three Basic Cards */}
          <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
            {basicLevelPrograms.map((program) => (
              <article className="overflow-hidden rounded-[10px] bg-white shadow-eureka flex flex-col justify-between" key={program.slug}>
                <div>
                  <div className="relative h-[240px]">
                    <Image src={program.image} alt={program.title} fill sizes="(max-width:768px) 100vw, 360px" className="object-cover" />
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] font-black uppercase text-[#3eaea6] tracking-wide">{program.level}</span>
                    <h3 className="mb-2 mt-1 text-xl font-semibold text-[#2e2c2c]">{program.title}</h3>
                    <p className="mb-5 text-sm leading-6 text-[#4b4b4b]">{program.summary}</p>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <Link className="inline-flex min-h-[42px] items-center justify-center rounded-full bg-[#3eaea6] px-5 py-3 text-xs font-bold uppercase text-white transition hover:bg-[#ff7b3b]" href={`/programs/${program.slug}`}>
                    Get Started
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* 10+2 Section Below the Three Cards */}
          <div className="mt-16 border-t pt-16 border-slate-200/60">
            <div className="mx-auto mb-10 max-w-[760px] text-center">
              <span className="mb-3 inline-flex min-h-7 items-center rounded-full bg-[#ff7b3b]/10 px-3 py-1 text-xs font-bold uppercase text-[#ff7b3b]">
                Secondary Streams
              </span>
              <h3 className="text-3xl font-bold text-[#2e2c2c]">Pre-University 10+2 Academic Streams</h3>
              <p className="mx-auto mt-3 max-w-[620px] text-[#4b4b4b] text-sm">
                Specialize in physics, accountancy, or IT coding. Highly-equipped labs, computer systems, and experienced educators prepare students for board examinations.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
              {plusTwoStreams.map((program) => (
                <article className="overflow-hidden rounded-[10px] bg-white shadow-eureka flex flex-col justify-between" key={program.slug}>
                  <div>
                    <div className="relative h-[240px]">
                      <Image src={program.image} alt={program.title} fill sizes="(max-width:768px) 100vw, 360px" className="object-cover" />
                    </div>
                    <div className="p-6">
                      <span className="text-[10px] font-black uppercase text-[#ff7b3b] tracking-wide">{program.level}</span>
                      <h4 className="mb-2 mt-1 text-lg font-bold text-[#2e2c2c]">{program.title}</h4>
                      <p className="mb-5 text-sm leading-6 text-[#4b4b4b]">{program.summary}</p>
                    </div>
                  </div>
                  <div className="px-6 pb-6">
                    <Link className="inline-flex min-h-[42px] items-center justify-center rounded-full bg-[#ff7b3b] px-5 py-3 text-xs font-bold uppercase text-white transition hover:bg-[#3eaea6]" href={`/programs/${program.slug}`}>
                      View Details
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link className={btnPrimary} href="/programs">Explore All Programs</Link>
          </div>
        </div>
      </section>

      {/* Our Facilities Section */}
      <section className={`bg-slate-50 ${sectionPad}`} id="facilities">
        <div className={container}>
          <div className="mx-auto mb-11 max-w-[760px] text-center">
            <span className={eyebrow}>Campus Assets</span>
            <h2 className={title}>Our Facilities</h2>
            <p className="mt-4 text-[#4b4b4b]">
              A glance at the modern academic, technological, and residential resources provided to ensure academic growth.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
            {[
              { title: "Science Laboratories", icon: Microscope, desc: "Fully equipped Physics, Chemistry, and Biology labs for practical learning." },
              { title: "Computer Labs (2)", icon: LaptopIcon, desc: "High-speed internet computing labs for IT coding and digital literacy." },
              { title: "ICT Smart Hall", icon: TvIcon, desc: "Dedicated interactive smart classrooms supporting modern multimedia lessons." },
              { title: "Digital Library", icon: BookOpen, desc: "E-resource terminals providing students with online research assets." },
              { title: "Hostel Block", icon: HomeIcon, desc: "Safe, supportive boarding facilities with wardens and guided study hours." },
              { title: "Proposed Futsal Ground", icon: ActivityIcon, desc: "Planned turf futsal court to keep students fit, healthy, and collaborative." }
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div className="rounded-lg bg-white p-6 shadow-sm border border-slate-100 flex items-start gap-4" key={i}>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded bg-[#d9fffc] text-[#3eaea6]">
                    <Icon />
                  </span>
                  <div>
                    <h4 className="font-bold text-[#2e2c2c] text-[15px]">{f.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-9 text-center">
            <Link className={btnPrimary} href="/facilities">View All 20+ Facilities</Link>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className={sectionPad} id="team">
        <div className={`${container} grid grid-cols-[1.1fr_.9fr] gap-12 items-center max-lg:grid-cols-1`}>
          <div>
            <span className={eyebrow}>Highly Qualified Staff</span>
            <h2 className={title}>Our Dedicated Team</h2>
            <p className="mt-5 text-[#4b4b4b] leading-7 text-[15px]">
              Eureka Residential Secondary School is proud of its team of educators catering from <strong>Montessori to 10+2</strong> levels.
              Our educators are highly qualified, certified, and experienced in utilizing modern student-centered pedagogies.
            </p>
            <p className="mt-3 text-[#4b4b4b] leading-7 text-[15px]">
              Under the active supervision of Principal <strong>Mr. Kuran Chemjong</strong> (B.Sc. in Physics from Tribhuvan University, M.Ed. in ELT from Kathmandu University),
              Basic Level Coordinator <strong>Mr. Bhuwan Sanjel</strong> (BA Sociology / MA English), and Secondary Coordinator <strong>Mr. Bijay Kumar Shrestha</strong> (M.Sc. Biology),
              our teaching staff coordinates weekly tests, project-based learning tasks, and character development workshops to guide student outcomes.
            </p>
            <Link className={`${btnPrimary} mt-5`} href="/about">Meet Leadership</Link>
          </div>

          {/* Single Team Photo */}
          <div className="relative h-[380px] w-full overflow-hidden rounded-xl shadow-lg border border-slate-100 max-sm:h-[240px]">
            <Image
              src="/images/staffs.jpg"
              alt="Eureka Staff Team"
              fill
              sizes="(max-width: 1024px) 100vw, 550px"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* ECA Section */}
      <section className={`bg-[#f8fafa] ${sectionPad}`} id="eca">
        <div className={container}>
          <div className="mx-auto mb-14 max-w-[760px] text-center">
            <span className={eyebrow}>Beyond Academics</span>
            <h2 className={title}>Extra-Curricular Activities (ECA)</h2>
            <p className="mt-4 text-[#4b4b4b] leading-relaxed">
              At Eureka, we foster holistic development. Our comprehensive ECA program blends sports training, physical wellness, and creative student-led clubs, encouraging students to build leadership, explore innovation, and learn teamwork.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 max-lg:grid-cols-1">
            {/* Sports & Athletics Card */}
            <article className="overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(43,46,61,0.06)] border border-slate-100 flex flex-col h-full hover:shadow-[0_8px_30px_rgba(43,46,61,0.1)] transition-shadow duration-300">
              <ECASlideshow
                images={[
                  "/images/volleyball.jpg",
                  "/images/table tennis.jpg",
                  "/images/eurekeans futsal.jpg",
                  "/images/yoga programmes.jpg"
                ]}
                altPrefix="Eureka Sports"
              />
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#ff7b3b]/10 text-[#ff7b3b]">
                      <Trophy size={24} />
                    </span>
                    <div>
                      <span className="text-[11px] font-black uppercase text-[#ff7b3b] tracking-wider">Physical Excellence</span>
                      <h3 className="text-xl font-bold text-[#2e2c2c] mt-0.5">Sports Facilities & Athletics</h3>
                    </div>
                  </div>
                  <p className="text-sm leading-6 text-[#4b4b4b] mb-6">
                    We believe physical fitness and competitive play are crucial for building resilience and team spirit. Eureka offers specialized coaching, structured inter-house events, and modern play areas for all students.
                  </p>
                  
                  {/* Facilities Grid */}
                  <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                    <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100/50">
                      <span className="text-[#3eaea6] mt-0.5 shrink-0">
                        <Check size={16} />
                      </span>
                      <div>
                        <h4 className="font-bold text-[#2e2c2c] text-xs">Proposed Futsal Ground</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">Upcoming modern turf arena for futsal matches.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100/50">
                      <span className="text-[#3eaea6] mt-0.5 shrink-0">
                        <Check size={16} />
                      </span>
                      <div>
                        <h4 className="font-bold text-[#2e2c2c] text-xs">Table Tennis Zone</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">Multiple TT boards with professional guides.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100/50">
                      <span className="text-[#3eaea6] mt-0.5 shrink-0">
                        <Check size={16} />
                      </span>
                      <div>
                        <h4 className="font-bold text-[#2e2c2c] text-xs">Volleyball Court</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">Full-sized volleyball arena for tournament play.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100/50">
                      <span className="text-[#3eaea6] mt-0.5 shrink-0">
                        <Check size={16} />
                      </span>
                      <div>
                        <h4 className="font-bold text-[#2e2c2c] text-xs">Yoga & Mindfulness</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">Daily practice sessions for wellness and focus.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Regular tournaments & events</span>
                  <Link href="/facilities" className="inline-flex items-center gap-1 text-xs font-bold text-[#ff7b3b] hover:text-[#3eaea6] transition">
                    View Sports Amenities &rarr;
                  </Link>
                </div>
              </div>
            </article>

            {/* Clubs & Forums Card */}
            <article className="overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(43,46,61,0.06)] border border-slate-100 flex flex-col h-full hover:shadow-[0_8px_30px_rgba(43,46,61,0.1)] transition-shadow duration-300">
              <ECASlideshow
                images={[
                  "/images/robotic club.png",
                  "/images/youth forum.jpg",
                  "/images/student in science  lab.JPG",
                  "/images/seminar in ai.jpg"
                ]}
                altPrefix="Eureka Clubs"
              />
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#3eaea6]/10 text-[#3eaea6]">
                      <Cpu size={24} />
                    </span>
                    <div>
                      <span className="text-[11px] font-black uppercase text-[#3eaea6] tracking-wider">Innovation & Leadership</span>
                      <h3 className="text-xl font-bold text-[#2e2c2c] mt-0.5">Student Clubs & Societies</h3>
                    </div>
                  </div>
                  <p className="text-sm leading-6 text-[#4b4b4b] mb-6">
                    Our vibrant student clubs provide practical exposure, intellectual challenge, and creative freedom. Through peer learning, exhibitions, and social action, students learn to innovate and lead.
                  </p>
                  
                  {/* Clubs Grid */}
                  <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                    <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100/50">
                      <span className="text-[#3eaea6] mt-0.5 shrink-0">
                        <Check size={16} />
                      </span>
                      <div>
                        <h4 className="font-bold text-[#2e2c2c] text-xs">Robotics & AI Club</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">Coding, smart boards, and hardware experiments.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100/50">
                      <span className="text-[#3eaea6] mt-0.5 shrink-0">
                        <Check size={16} />
                      </span>
                      <div>
                        <h4 className="font-bold text-[#2e2c2c] text-xs">Youth Forum</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">Debates, speaking drills, and leadership tasks.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100/50">
                      <span className="text-[#3eaea6] mt-0.5 shrink-0">
                        <Check size={16} />
                      </span>
                      <div>
                        <h4 className="font-bold text-[#2e2c2c] text-xs">Science Practical Circle</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">Lab experiments and field herbarium collection.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100/50">
                      <span className="text-[#3eaea6] mt-0.5 shrink-0">
                        <Check size={16} />
                      </span>
                      <div>
                        <h4 className="font-bold text-[#2e2c2c] text-xs">Arts & Culture Club</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">Dance, vocal music, drama, and festival stages.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Weekly meets & showcases</span>
                  <Link href="/life-at-eureka" className="inline-flex items-center gap-1 text-xs font-bold text-[#3eaea6] hover:text-[#ff7b3b] transition">
                    Explore Student Life &rarr;
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Notices Section */}
      <section className={`bg-[#d9fffc] ${sectionPad}`} id="notices">
        <div className={container}>
          <div className="mx-auto mb-11 max-w-[760px] text-center">
            <span className={eyebrow}>Bulletin Board</span>
            <h2 className={title}>Notice</h2>
            <p className="mt-4 text-[#4b4b4b]">
              Stay informed with recent results, entrance exam dates, holidays, and school announcements.
            </p>
          </div>

          {notices.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              No recent notices posted.
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
              {notices.map((post, i) => {
                const dateStr = post.published_at
                  ? new Date(post.published_at).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    })
                  : "Recent";

                return (
                  <article className="rounded-lg bg-white p-6 shadow-sm border border-slate-100 flex flex-col justify-between" key={post.id}>
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold text-slate-400">{dateStr}</span>
                        <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#ff7b3b]/10 text-[#ff7b3b]">
                          {post.type}
                        </span>
                      </div>
                      <h4 className="font-bold text-[#2e2c2c] text-base leading-snug mb-3 hover:text-[#3eaea6] transition line-clamp-2">
                        <Link href={`/notices/${post.slug}`}>{post.title}</Link>
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                    </div>
                    <Link href={`/notices/${post.slug}`} className="text-xs font-bold text-[#ff7b3b] hover:text-[#3eaea6] transition">
                      Read Notice &rarr;
                    </Link>
                  </article>
                );
              })}
            </div>
          )}

          <div className="mt-8 text-center">
            <Link className={btnPrimary} href="/notices">
              View All Notices
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Blogs Section */}
      <section className={sectionPad} id="blogs">
        <div className={container}>
          <div className="mx-auto mb-11 max-w-[760px] text-center">
            <span className={eyebrow}>From Our Educators</span>
            <h2 className={title}>Latest Blogs</h2>
            <p className="mt-4 text-[#4b4b4b]">
              Read columns from our coordinators and teaching staff on pedagogy, technology, and childhood development.
            </p>
          </div>

          {blogs.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              No blogs published yet.
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
              {blogs.map((blog, i) => {
                const dateStr = blog.published_at
                  ? new Date(blog.published_at).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    })
                  : "Recent";

                return (
                  <article className="rounded-lg bg-white p-6 shadow-sm border border-slate-100 flex flex-col justify-between" key={blog.id}>
                    <div>
                      <div className="flex items-center justify-between mb-3 text-[10px] font-semibold text-slate-400">
                        <span>Published on {dateStr}</span>
                      </div>
                      <h4 className="font-bold text-[#2e2c2c] text-base leading-snug mb-3 hover:text-[#3eaea6] transition line-clamp-2">
                        <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-3">{blog.excerpt}</p>
                    </div>
                    <Link href={`/blogs/${blog.slug}`} className="text-xs font-bold text-[#3eaea6] hover:text-[#ff7b3b] transition">
                      Read Column &rarr;
                    </Link>
                  </article>
                );
              })}
            </div>
          )}

          <div className="mt-8 text-center">
            <Link className={btnPrimary} href="/blogs">
              View All Blogs
            </Link>
          </div>
        </div>
      </section>
      {/* Hall of Fame Section */}
      <section className={`bg-slate-50 ${sectionPad}`} id="hall-of-fame">
        <div className={container}>
          <div className="mx-auto mb-11 max-w-[760px] text-center">
            <span className={eyebrow}>Wall of Toppers</span>
            <h2 className={title}>Hall of Fame</h2>
            <p className="mt-4 text-[#4b4b4b]">
              Celebrating our outstanding graduates who have excelled in the SLC and SEE examinations and are now leading as professionals worldwide.
            </p>
          </div>

          {achievements.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              No achievements updated yet.
            </div>
          ) : (
            <>
              {/* Desktop view: Horizontal Scroll */}
              <div className="hidden md:flex flex-row overflow-x-auto gap-6 pb-6 scroll-smooth">
                {achievements.map((item) => (
                  <div
                    key={item.id}
                    className="w-[280px] shrink-0 bg-white rounded-xl border border-slate-100 p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition duration-300"
                  >
                    {/* Fixed Size Portrait Box (PP Size, object-contain to show full photo) */}
                    <div className="relative h-32 w-28 bg-white border border-slate-200 overflow-hidden flex items-center justify-center mb-4 shrink-0 shadow-sm rounded">
                      <Image
                        src={item.cover_image || "/images/staffs.jpg"}
                        alt={item.title}
                        fill
                        sizes="112px"
                        className="object-contain"
                      />
                    </div>
                    <span className="text-[10px] font-black uppercase text-[#ff7b3b] tracking-wider px-2 py-0.5 rounded bg-[#ff7b3b]/10 mb-2">
                      {item.category}
                    </span>
                    <h4 className="font-extrabold text-[#10233f] text-base leading-snug mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs font-semibold text-[#3eaea6] mb-3">
                      {item.summary}
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed whitespace-normal">
                      {item.body ? (item.body.length > 80 ? `${item.body.slice(0, 80)}...` : item.body) : ""}
                    </p>
                  </div>
                ))}
              </div>

              {/* Mobile view: Vertical Scroll within section */}
              <div className="flex flex-col md:hidden overflow-y-auto max-h-[500px] gap-4 p-4 border border-slate-200/50 rounded-xl bg-white">
                {achievements.map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-50 rounded-lg p-5 flex flex-col items-center text-center border border-slate-100"
                  >
                    {/* Fixed Size Portrait Box (PP Size, object-contain to show full photo) */}
                    <div className="relative h-32 w-28 bg-white border border-slate-200 overflow-hidden flex items-center justify-center mb-3 shrink-0 shadow-sm rounded">
                      <Image
                        src={item.cover_image || "/images/staffs.jpg"}
                        alt={item.title}
                        fill
                        sizes="112px"
                        className="object-contain"
                      />
                    </div>
                    <span className="text-[10px] font-black uppercase text-[#ff7b3b] tracking-wider px-2 py-0.5 rounded bg-[#ff7b3b]/10 mb-1.5">
                      {item.category}
                    </span>
                    <h4 className="font-extrabold text-[#10233f] text-base leading-snug mb-0.5">
                      {item.title}
                    </h4>
                    <p className="text-xs font-semibold text-[#3eaea6] mb-2">
                      {item.summary}
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Link className={btnPrimary} href="/hall-of-fame">
                  View All Alumni Toppers
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Events Preview Section */}
      <section className={`bg-[#d9fffc] ${sectionPad}`} id="events-preview">
        <div className={container}>
          <div className="mx-auto mb-11 max-w-[760px] text-center">
            <span className={eyebrow}>School Calendar</span>
            <h2 className={title}>Upcoming & Recent Events</h2>
            <p className="mt-4 text-[#4b4b4b]">
              Catch up on student events, AI seminars, camping programs, and sports competitions.
            </p>
          </div>

          {events.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              No recent events available.
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
              {events.map((event) => {
                const eventDate = new Date(event.starts_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric"
                });
                return (
                  <article className="overflow-hidden rounded-lg bg-white shadow-sm border border-slate-100 flex flex-col justify-between" key={event.id}>
                    <div>
                      <div className="relative h-[180px]">
                        <Image src={event.cover_image} alt={event.title} fill className="object-cover" />
                      </div>
                      <div className="p-5">
                        <span className="text-[10px] font-bold text-[#ff7b3b]">{eventDate}</span>
                        <h4 className="font-bold text-[#2e2c2c] text-base leading-snug mt-1.5 mb-2 hover:text-[#3eaea6] transition">
                          <Link href={`/events/${event.slug}`}>{event.title}</Link>
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed">{event.excerpt}</p>
                      </div>
                    </div>
                    <div className="px-5 pb-5">
                      <Link href={`/events/${event.slug}`} className="text-xs font-bold text-[#3eaea6] hover:text-[#ff7b3b] transition">
                        View Event Details &rarr;
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          <div className="mt-9 text-center">
            <Link className={btnPrimary} href="/events">View Complete Events Calendar</Link>
          </div>
        </div>
      </section>





      {/* Why Choose Eureka */}
      <section className={sectionPad} id="why">
        <div className={container}>
          <div className="mx-auto mb-11 max-w-[760px] text-center">
            <span className={eyebrow}>Why Eureka?</span>
            <h2 className={title}>Eureka has been shaping disciplined, creative, and confident learners</h2>
            <p className="mt-4 text-[#4b4b4b]">Our program focuses on strong academics, values, technology, wellness, and global readiness.</p>
          </div>
          <div className="grid grid-cols-[.95fr_1.4fr] gap-9 max-lg:grid-cols-1">
            <article className="rounded-[10px] bg-[#ff7b3b] p-8 text-white">
              <h3 className="mb-5 text-xl font-semibold text-white">Education Is The Key</h3>
              <ul className="grid gap-3">
                {whyEureka.slice(0, 5).map((point) => (
                  <li className="flex gap-3 text-sm" key={point}>
                    <Check size={17} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
            <div className="relative min-h-[360px] overflow-hidden rounded-[10px]">
              <Image src="/images/students in house dress.jpg" alt="Eureka students in house dress" fill sizes="760px" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className={`bg-[#d9fffc] ${sectionPad}`} id="gallery">
        <div className={container}>
          <div className="mx-auto mb-11 max-w-[760px] text-center">
            <span className={eyebrow}>Gallery</span>
            <h2 className={title}>Capturing Eureka Students&apos; Journey</h2>
            <p className="mt-4 text-[#4b4b4b]">Step into our gallery and witness moments from academics, sports, culture, and community.</p>
          </div>
          <div className="relative mx-auto max-w-[940px]">
            <div className="relative h-[520px] overflow-hidden rounded-[10px] shadow-eureka max-md:h-[300px]">
              <SafeImage
                src={currentGallery.cover_image || currentGallery.image}
                alt={currentGallery.title}
                className="h-full w-full object-cover"
              />
              <span className="absolute bottom-4 left-4 bg-white/90 px-3 py-2 text-xs font-bold text-[#2e2c2c]">{currentGallery.title}</span>
            </div>
            <button className="absolute left-[-21px] top-1/2 grid h-[42px] w-[42px] -translate-y-1/2 place-items-center rounded-full bg-[#ff7b3b] text-white max-md:left-2" type="button" aria-label="Previous gallery image" onClick={() => setGalleryIndex((index) => (index - 1 + activeGalleryItems.length) % activeGalleryItems.length)}>
              <ChevronLeft size={18} />
            </button>
            <button className="absolute right-[-21px] top-1/2 grid h-[42px] w-[42px] -translate-y-1/2 place-items-center rounded-full bg-[#ff7b3b] text-white max-md:right-2" type="button" aria-label="Next gallery image" onClick={() => setGalleryIndex((index) => (index + 1) % activeGalleryItems.length)}>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Admission Stripe Banner */}
      <section className="bg-[linear-gradient(297deg,#ff7b3b_14%,#3eaea6_70%)] py-[75px] text-white" id="admission">
        <div className={`${container} flex items-center justify-between gap-7 max-md:grid`}>
          <div>
            <span className="mb-4 inline-flex min-h-7 items-center rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase text-white">Admissions</span>
            <h2 className="text-balance text-[clamp(28px,3.2vw,42px)] font-bold leading-tight text-white">Admissions open for Academic Session</h2>
            <p className="mt-4 max-w-[760px] text-white/95 text-sm md:text-base">
              Join the school that helps students pursue excellence. Submit your admissions inquiry online or contact our office for details.
            </p>
          </div>
          <Link className={btnPrimary} href="/admission">Apply Now</Link>
        </div>
      </section>



      {/* FAQs Section */}
      <section className={sectionPad} id="faqs">
        <div className={`${container} max-w-[980px]`}>
          <div className="mx-auto mb-11 max-w-[760px] text-center">
            <span className={eyebrow}>FAQs</span>
            <h2 className={title}>Explore More About Eureka</h2>
            <p className="mt-4 text-[#4b4b4b]">Eureka is ready to make your pathway clear and successful.</p>
          </div>
          <div className="grid gap-3">
            {faqs.map((faq, index) => (
              <details className="overflow-hidden rounded-[5px] border border-[#e6e6e6] bg-white" key={faq.question} open={index === 0}>
                <summary className="flex min-h-[54px] cursor-pointer items-center justify-between px-5 py-4 font-semibold text-[#2e2c2c] marker:content-none open:bg-[#ff7b3b]">
                  {faq.question}
                </summary>
                <p className="m-0 px-5 py-4 text-sm leading-6 text-[#4b4b4b]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={sectionPad} id="contact">
        <div className={`${container} grid grid-cols-[1fr_1.25fr] items-center gap-14 max-lg:grid-cols-1`}>
          <div className="relative h-[480px] w-full overflow-hidden rounded-xl shadow-md max-lg:h-[300px]">
            <Image
              src="/images/10+2 students.jpg"
              alt="Eureka 10+2 students"
              fill
              sizes="(max-width: 1024px) 100vw, 500px"
              className="object-cover"
            />
          </div>
          <ContactForm />
        </div>
      </section>

      <button className="fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full bg-[#ff7b3b] text-white shadow-eureka" type="button" aria-label="Scroll to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <ArrowUp size={18} />
      </button>
    </>
  );
}
