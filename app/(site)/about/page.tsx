import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "About Us | Eureka Residential Secondary School"
};

export const dynamic = "force-dynamic";

// Custom SVG Icons to avoid Lucide version conflicts
const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 11 2 2 4-4" />
  </svg>
);

const HeartHandshakeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    <path d="M12 11c.88.9 2.3.9 3.18 0a2.15 2.15 0 0 0 0-3.1" />
  </svg>
);

const AwardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

const container = "mx-auto max-w-[1140px] px-4";
const sectionPad = "py-[75px] max-md:py-14";
const title = "text-balance text-[clamp(28px,3.2vw,42px)] font-bold leading-tight text-[#10233f]";

const DEFAULT_ABOUT_DATA = {
  vision: "To be the leading educational institution in Eastern Nepal, nurturing confident, creative, and compassionate global citizens.",
  mission: "To provide quality education through a disciplined environment, innovative pedagogy, and holistic development programs that prepare students for life.",
  motto: "In Pursuit of Excellence",
  history_paragraphs: [
    "Eureka Residential Secondary School was established in 2050 B.S. (1994 A.D.) in Dharan-1, Laxmi Sadak, Sunsari. Founded with a vision to deliver premium educational opportunities in Eastern Nepal, we have spent over 30 years cultivating an environment where academic rigor blends with strict positive discipline.",
    "What began as a localized primary school has expanded into one of the top 10 schools in the Purbanchal region and is widely recognized as one of the leading educational centers in Dharan. Our curriculum has evolved from traditional rote formats to a comprehensive Project-Based Learning (PBL) methodology, helping students learn via inquiry, design, and practical execution.",
    "Today, Eureka currently educates over 1,600 students from Montessori / Pre-KG through Grade XII (+2), including specialized streams in Science, Management, and Computer Science. We remain dedicated to nurturing responsible, creative, and confident citizens prepared to face global challenges."
  ],
  principal: {
    name: "Mr. Kuran Chemjong",
    qualification: "Principal, B.Sc. (Physics, TU) | M.Ed. (ELT, KU)",
    message_paragraphs: [
      "Education at Eureka is viewed as a journey of growth, creativity, and personal construction, grounded in strong academic foundations and supported by confidence, discipline, and moral values.",
      "Our school’s signature Project-Based Learning (PBL) methodology emphasizes activity-based learning, critical thinking, and real-life application. We want to ensure that education remains meaningful and engaging for every child, rather than being confined to textbook memorization. A disciplined environment, guided by clearly defined rules and conduct, creates a campus that is safe, secure, friendly, respectful, and highly enjoyable.",
      "To support this mission, our recent infrastructure enhancements include two modern computer labs, high-quality physics, chemistry, and biology laboratories, a dedicated ICT smart hall, and two spacious seminar halls. Combined with transport fleets, hygiene canteen facilities, and boarding hostels, we provide a complete ecosystem for student success.",
      "We are extremely proud of our dedicated teaching team and appreciate the vital support of our parents in building a strong foundation for each student's success."
    ],
    image_url: "/images/principal.jpg"
  },
  coordinators: [
    {
      name: "Mr. Bijay Kumar Shrestha",
      role: "Secondary Level Coordinator",
      qualification: "Secondary Coordinator | M.Sc. (Biology)",
      message_paragraphs: [
        "Secondary level study at Eureka serves as the critical bridge for students transitioning into higher education and technical board exams. We actively update our curriculum to match modern standards, introducing coding and advanced computing modules for secondary students. Our students enjoy extensive practical periods inside our chemistry, biology, and physics laboratories to ground theoretical concepts in empirical observation.",
        "Through our continuous weekly test assessments, mock board evaluations, and focused counseling sessions, we guide secondary performers to achieve their maximum potential. We cooperate closely with educators to implement interactive seminars, project assignments, and co-curricular programs that mold students into competent academic aspirants."
      ],
      image_url: "/images/bijay kumar shrestha.png",
      level_label: "Secondary Level (Grade 9 - 12)"
    },
    {
      name: "Mr. Bhuwan Sanjel",
      role: "Basic Level Coordinator",
      qualification: "Basic Level Coordinator | BA Sociology / MA English",
      message_paragraphs: [
        "The basic level sets the bedrock of academic confidence, moral values, and socialization habits. At Eureka, we utilize a child-centric Montessori methodology in our pre-school wings to emphasize positive discipline and motor coordination. As students progress into basic levels, we introduce digital classrooms, interactive smart board halls, and logic puzzles inside our math laboratory to build conceptual clarity.",
        "We coordinate character development workshops, public speaking contests, and sports activities alongside core studies to support a well-rounded learning graph. We prioritize regular teacher training and parental interaction, creating a collaborative circle that guides every basic level child to grow in a safe, respect-driven environment."
      ],
      image_url: "/images/bhuwan sanjel.jpeg",
      level_label: "Basic Level (Montessori - Grade 8)"
    }
  ]
};

async function getAboutPageData() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();
      const { data, error } = await supabase
        .from("pages")
        .select("title, excerpt, body")
        .eq("slug", "about")
        .eq("status", "published")
        .maybeSingle();

      if (!error && data && data.body) {
        const body = typeof data.body === "string" ? JSON.parse(data.body) : data.body;
        return {
          vision: body.vision || DEFAULT_ABOUT_DATA.vision,
          mission: body.mission || DEFAULT_ABOUT_DATA.mission,
          motto: body.motto || DEFAULT_ABOUT_DATA.motto,
          history_paragraphs: Array.isArray(body.history_paragraphs) ? body.history_paragraphs : DEFAULT_ABOUT_DATA.history_paragraphs,
          principal: {
            name: body.principal?.name || DEFAULT_ABOUT_DATA.principal.name,
            qualification: body.principal?.qualification || DEFAULT_ABOUT_DATA.principal.qualification,
            message_paragraphs: Array.isArray(body.principal?.message_paragraphs) ? body.principal.message_paragraphs : DEFAULT_ABOUT_DATA.principal.message_paragraphs,
            image_url: body.principal?.image_url || DEFAULT_ABOUT_DATA.principal.image_url
          },
          coordinators: Array.isArray(body.coordinators) ? body.coordinators : DEFAULT_ABOUT_DATA.coordinators
        };
      }
    } catch (err) {
      console.warn("Failed to fetch about page from Supabase, using fallback data:", err);
    }
  }
  return DEFAULT_ABOUT_DATA;
}

export default async function AboutPage() {
  const data = await getAboutPageData();

  return (
    <>
      {/* Banner */}
      <section className="relative isolate flex min-h-[360px] items-center overflow-hidden text-white">
        <Image
          src="/images/school building.jpg"
          alt="Eureka school campus"
          fill
          sizes="100vw"
          className="-z-20 object-cover object-center"
          priority
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#10233f]/90 to-[#10233f]/40" />
        <div className={container}>
          <span className="mb-3 inline-flex min-h-7 items-center rounded-full bg-[#d9fffc] px-3.5 py-1 text-xs font-bold uppercase text-[#3eaea6]">
            About Our Institute
          </span>
          <h1 className="max-w-[760px] text-balance text-[clamp(36px,5vw,54px)] font-black leading-tight text-white mt-2">
            About Eureka
          </h1>
          <p className="mt-4 max-w-[660px] text-slate-200">
            Founded in 1994, Eureka has spent over three decades establishing a celebrated history of academic excellence and disciplined campus culture.
          </p>
        </div>
      </section>

      {/* Vision, Mission, Motto Cards */}
      <section className={sectionPad}>
        <div className={container}>
          <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-1">
            <article className="rounded-lg bg-white p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[#d9fffc] text-[#3eaea6] mb-4">
                <ShieldCheckIcon />
              </span>
              <h3 className="text-lg font-bold text-[#10233f] mb-3">Our Vision</h3>
              <p className="text-sm leading-relaxed text-slate-600">
                {data.vision}
              </p>
            </article>

            <article className="rounded-lg bg-white p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[#d9fffc] text-[#ff7b3b] mb-4">
                <HeartHandshakeIcon />
              </span>
              <h3 className="text-lg font-bold text-[#10233f] mb-3">Our Mission</h3>
              <p className="text-sm leading-relaxed text-slate-600">
                {data.mission}
              </p>
            </article>

            <article className="rounded-lg bg-white p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[#d9fffc] text-[#3eaea6] mb-4">
                <AwardIcon />
              </span>
              <h3 className="text-lg font-bold text-[#10233f] mb-3">Our Motto</h3>
              <strong className="text-base italic text-[#ff7b3b] font-bold mb-2">
                &ldquo;{data.motto}&rdquo;
              </strong>
              <p className="text-sm leading-relaxed text-slate-600">
                Guiding every action, study program, and assessment benchmark at Eureka since our foundation in 2050 B.S.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* History / Evolution Section (In Full) */}
      <section className="bg-slate-50 py-[75px] border-t border-slate-200/50">
        <div className={container}>
          <div className="grid grid-cols-[1.2fr_0.8fr] gap-12 items-center max-lg:grid-cols-1">
            <div>
              <span className="mb-3 inline-flex min-h-7 items-center rounded-full bg-[#ff7b3b]/10 px-3 py-0.5 text-xs font-bold uppercase text-[#ff7b3b]">
                Our Evolution
              </span>
              <h2 className={`${title} mb-6`}>Our Story & Historical Evolution (30+ Years)</h2>
              <div className="text-sm leading-8 text-slate-600 space-y-4">
                {data.history_paragraphs.map((p: string, idx: number) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg border border-slate-200">
              <Image
                src="/images/10+2 students groups.jpg"
                alt="Eureka students group"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Principal's Message (In Full, Text Left, Photo Right) */}
      <section className="py-[85px] bg-white border-t border-slate-100">
        <div className={container}>
          <div className="grid grid-cols-[1.2fr_0.8fr] gap-12 items-center max-lg:grid-cols-1">
            {/* Text on Left */}
            <div>
              <span className="mb-3 inline-flex min-h-7 items-center rounded-full bg-[#3eaea6]/10 px-3 py-0.5 text-xs font-bold uppercase text-[#3eaea6]">
                Principal's Message
              </span>
              <h2 className={`${title} mb-2`}>Message from {data.principal.name}</h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-6">
                {data.principal.qualification}
              </p>
              
              <div className="text-sm leading-8 text-slate-600 space-y-4">
                {data.principal.message_paragraphs.map((p: string, idx: number) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            {/* Photo on Right - Contain in Box with Teal Border */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-[360px] aspect-[3/4] rounded-xl bg-white border-[6px] border-[#3eaea6] shadow-xl p-2 flex flex-col justify-between">
                <div className="relative w-full h-[85%]">
                  <Image
                    src={data.principal.image_url}
                    alt={`Principal ${data.principal.name}`}
                    fill
                    className="object-contain object-center rounded-lg"
                  />
                </div>
                <div className="bg-slate-50/80 rounded-lg p-2.5 text-center border-t border-slate-100">
                  <h4 className="font-bold text-sm text-[#10233f]">{data.principal.name}</h4>
                  <p className="text-[11px] font-semibold text-[#ff7b3b]">Principal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coordinators Section (Alternating Photo Placements, Big & Full Photos) */}
      <section className="py-[85px] bg-slate-50 border-t border-slate-200/50">
        <div className={container}>
          <div className="mb-14 text-center max-w-[650px] mx-auto">
            <span className="mb-3 inline-flex min-h-7 items-center rounded-full bg-[#d9fffc] px-3 py-1 text-xs font-bold uppercase text-[#3eaea6]">
              Academic Leadership
            </span>
            <h2 className={title}>Coordinators' Messages</h2>
            <p className="mt-3 text-sm text-slate-500">
              Meet the coordinators managing academic quality and student-centric workflows.
            </p>
          </div>

          <div className="space-y-20">
            {data.coordinators.map((coord: any, idx: number) => {
              const isEven = idx % 2 === 0;
              return (
                <article 
                  key={coord.name} 
                  className={`grid gap-12 items-center max-lg:grid-cols-1 ${isEven ? 'grid-cols-[0.8fr_1.2fr]' : 'grid-cols-[1.2fr_0.8fr]'}`}
                >
                  {/* Photo Side */}
                  <div className={`flex justify-center ${isEven ? 'order-1 max-lg:order-2' : 'order-2 max-lg:order-2'}`}>
                    <div className="relative w-full max-w-[360px] aspect-[3/4] rounded-lg overflow-hidden shadow-xl border border-slate-200 bg-white">
                      <Image
                        src={coord.image_url}
                        alt={`${coord.role} ${coord.name}`}
                        fill
                        className="object-cover object-top"
                      />
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 text-white">
                        <h4 className="font-bold text-base">{coord.name}</h4>
                        <p className="text-xs text-slate-300">{coord.role}</p>
                      </div>
                    </div>
                  </div>

                  {/* Text Side */}
                  <div className={isEven ? 'order-2 max-lg:order-1' : 'order-1 max-lg:order-1'}>
                    <span className={`text-xs font-black uppercase tracking-wider mb-2 block ${isEven ? 'text-[#ff7b3b]' : 'text-[#3eaea6]'}`}>
                      {coord.level_label || coord.role}
                    </span>
                    <h3 className="text-2xl font-bold text-[#10233f] mb-1">{coord.name}</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-6">
                      {coord.qualification}
                    </p>
                    <div className="text-sm leading-8 text-slate-600 space-y-4">
                      {coord.message_paragraphs.map((p: string, pIdx: number) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Admission call */}
      <section className="bg-[#10233f] py-14 text-white text-center">
        <div className={container}>
          <h2 className="text-3xl font-bold mb-4">Admissions open for Academic Session</h2>
          <p className="text-sm text-slate-300 max-w-[620px] mx-auto mb-6">
            Join the school that helps students pursue excellence. Submit your admissions inquiry online or contact our office for details.
          </p>
          <div className="flex justify-center gap-3">
            <Link href="/admission" className="inline-flex min-h-[42px] items-center justify-center rounded bg-[#ff7b3b] px-6 py-2.5 text-xs font-bold uppercase text-white hover:bg-[#3eaea6] transition">
              Apply Now
            </Link>
            <Link href="/contact" className="inline-flex min-h-[42px] items-center justify-center rounded border border-white/20 bg-white/5 px-6 py-2.5 text-xs font-bold uppercase text-white hover:bg-white/10 transition">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
