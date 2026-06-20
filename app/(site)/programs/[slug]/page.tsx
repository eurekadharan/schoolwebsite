import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { programs } from "@/lib/site-data";

// Custom SVG Icons to bypass Lucide version and compilation conflicts
const ChevronLeft = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const GraduationCap = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
  </svg>
);

const BookOpen = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const Award = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

const Clock = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ClipboardCheck = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <path d="m9 14 2 2 4-4" />
  </svg>
);

const Check = ({ size = 12, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ArrowRight = ({ size = 14, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const Sparkles = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5z" />
    <path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z" />
  </svg>
);

const Brain = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-4.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-4.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2Z" />
  </svg>
);

const Lightbulb = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5.5 5.5 0 0 0 12.5 2.5C9.2 2.5 6.5 5.2 6.5 8.5c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6" />
    <path d="M10 22h4" />
  </svg>
);

const Compass = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

const Laptop = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="4" width="20" height="12" rx="2" ry="2" />
    <line x1="2" y1="20" x2="22" y2="20" />
    <line x1="12" y1="16" x2="12" y2="20" />
  </svg>
);

const CheckCircle = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const Target = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const AtomIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="1" />
    <path d="M20.2 20.2c2.4-2.4 2.4-6.2 0-8.5-2.4-2.4-6.2-2.4-8.5 0-2.4 2.4-2.4 6.2 0 8.5 2.4 2.4 6.2 2.4 8.5 0z" />
    <path d="M15.8 8.2c-2.4-2.4-6.2-2.4-8.5 0-2.4 2.4-2.4 6.2 0 8.5 2.4 2.4 6.2 2.4 8.5 0 2.4-2.4 2.4-6.2 0-8.5z" />
    <path d="M12 2a15.3 15.3 0 0 1 4 9.75M12 2a15.3 15.3 0 0 0-4 9.75M12 22a15.3 15.3 0 0 1-4-9.75M12 22a15.3 15.3 0 0 0 4-9.75" />
  </svg>
);

const TrendingUpIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

const CodeIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

// Program specific galleries (mapped to matching assets in public/images)
const programGalleries: Record<string, { src: string; caption: string }[]> = {
  "montessori": [
    { src: "/images/montessori.jpg", caption: "Sensory Learning Activities" },
    { src: "/images/monterssori 2.jpg", caption: "Creative Play Area" },
    { src: "/images/monterosri 3.jpg", caption: "Group Reading & Storytelling" },
    { src: "/images/montersorri 4.jpg", caption: "Joyful Playgroup Discoveries" }
  ],
  "primary": [
    { src: "/images/primary kids.jpg", caption: "Primary Classroom Collaboration" },
    { src: "/images/pre primary.jpg", caption: "Guided Activity Sessions" },
    { src: "/images/kids with pictures.jpg", caption: "Creative Drawing & Arts" },
    { src: "/images/kids in library.jpg", caption: "Guided Reading in Library" }
  ],
  "basic-level": [
    { src: "/images/secondary level.jpg", caption: "Interactive Classroom Studies" },
    { src: "/images/kids in digital screen.jpeg", caption: "IT Literacy & Computing" },
    { src: "/images/kids with sample body.jpg", caption: "Practical Biology Observations" },
    { src: "/images/kids in group.JPG", caption: "Team Building Exercises" }
  ],
  "secondary-level": [
    { src: "/images/student in science  lab.JPG", caption: "Science Laboratory Experiments" },
    { src: "/images/student in fair.JPG", caption: "Science & Project Exhibitions" },
    { src: "/images/plantation programme.jpg", caption: "Social Responsibility Campaigns" },
    { src: "/images/see results 2082.jpg", caption: "SEE Batch Toppers" }
  ],
  "science": [
    { src: "/images/10+2 science.jpg", caption: "Advanced Physics Experimentation" },
    { src: "/images/science students practical collecting herbium.jpg", caption: "Botany Specimen Collection" },
    { src: "/images/robotic club.png", caption: "AI & Robotics Lab Projects" },
    { src: "/images/students in computer lab.jpg", caption: "Statistical Data Processing" }
  ],
  "management": [
    { src: "/images/10+2 management.jpg", caption: "Finance Seminar Presentation" },
    { src: "/images/10+2 students groups.jpg", caption: "Group Presentation Debates" },
    { src: "/images/10+2 girls.jpg", caption: "Student Union Collaboration" },
    { src: "/images/see results 2082.jpg", caption: "Board Toppers Celebration" }
  ],
  "computer-science": [
    { src: "/images/10+2 computer science.jpg", caption: "Software Development Projects" },
    { src: "/images/students in computer lab.jpg", caption: "Web Tech & Coding Labs" },
    { src: "/images/robotic club.png", caption: "Arduino Microcontroller Hacks" },
    { src: "/images/seminar in ai.jpg", caption: "AI Seminar Presentation" }
  ],
  "grade-xi-xii": [
    { src: "/images/10+2 students.jpg", caption: "Pre-University Group Studies" },
    { src: "/images/students with smart board.jpg", caption: "Interactive Smart Lectures" },
    { src: "/images/youth forum.jpg", caption: "Youth Leadership Forum" },
    { src: "/images/table tennis.jpg", caption: "Sports & Recreation Time" }
  ]
};

// Interface for program blocks configuration
interface BlockItem {
  title: string;
  desc: string;
  icon: any;
}

// Config file containing tailored details based on slug
function getLevelBlocks(slug: string): BlockItem[] {
  if (slug === "montessori") {
    return [
      { title: "Sensory & Motor Skills", desc: "Painting, clay modeling, block-building and tactile activities to hone physical and sensory coordination.", icon: Brain },
      { title: "Language & Literacy", desc: "Storytelling, rhymes, phonics sessions, and conversational games to build strong speech and vocabulary.", icon: GraduationCap },
      { title: "Numeracy Foundations", desc: "Sorting objects, counting frames, shape recognitions, and numerical games for logical base building.", icon: Lightbulb },
      { title: "Social Integration", desc: "Group play, table manners, greeting routines, and shared playground periods to develop emotional confidence.", icon: Compass }
    ];
  }
  if (slug === "primary") {
    return [
      { title: "Foundational Literacy", desc: "Advanced spelling bees, reading classes, and English/Nepali handwriting workshops to refine communication.", icon: BookOpen },
      { title: "Applied Arithmetic", desc: "Tactile calculations, arithmetic drills, and mental math games that make numbers fun and approachable.", icon: Lightbulb },
      { title: "Creative Expression", desc: "Quarterly drawing meets, DIY arts, music hours, and drama segments to nurture visual and auditory talents.", icon: Sparkles },
      { title: "Social Habits", desc: "Regular group activities, farm trips, temple visits, and sports gatherings to build collaborative discipline.", icon: Compass }
    ];
  }
  if (slug === "basic-level") {
    return [
      { title: "Practical Science", desc: "Hands-on experiments in general science, botany basics, and anatomy projects in specialized science labs.", icon: AtomIcon },
      { title: "IT Literacy & Coding", desc: "Early introduction to keyboard layouts, word processing, basic web searches, and spreadsheet utilities.", icon: Laptop },
      { title: "Oratory & Speech", desc: "Weekly assembly speeches, debates, quiz events, and public speaking coaching to build confidence.", icon: Award },
      { title: "Wellness & Values", desc: "Compulsory yoga postures, breathing exercises, and meditation hours to coordinate mental and physical fitness.", icon: CheckCircle }
    ];
  }
  if (slug === "secondary-level") {
    return [
      { title: "SEE Preparation", desc: "Rigorous diagnostic testing, challenge workshops for top scores, and continuous mock tests to build board exam capability.", icon: Target },
      { title: "Laboratory Practicals", desc: "Physics, Chemistry, and Biology laboratory hours under expert faculty for deep conceptual clarity.", icon: AtomIcon },
      { title: "Advanced IT Labs", desc: "Introduction to software logics, QBASIC programming, and database files in our modern computer labs.", icon: Laptop },
      { title: "Personality Workshops", desc: "External counselor seminars, leadership modules, and carrier pathway mapping for post-SEE choices.", icon: Sparkles }
    ];
  }
  if (slug === "science") {
    return [
      { title: "Physics Lab Experiments", desc: "Optics experiments, electrical circuits, and mechanics calibrations under the guidance of Mr. Kuran Chemjong.", icon: AtomIcon },
      { title: "Biology Specimens", desc: "Botany slide observations, zoological specimen studies, and herbarium collections directed by Mr. Bijay Kumar Shrestha.", icon: Brain },
      { title: "Chemical Reactivity", desc: "Titration setups, inorganic mixture analyses, and organic compound extractions in ventilated chemistry laboratories.", icon: Sparkles },
      { title: "AI & Robotics Exposure", desc: "Hands-on projects with Arduino boards, sensor calibrations, and logic coding in the AI & Robotics Club.", icon: Laptop }
    ];
  }
  if (slug === "management") {
    return [
      { title: "Accountancy & Auditing", desc: "Double-entry systems, balance sheets, and real-life banking ledger simulation projects.", icon: TrendingUpIcon },
      { title: "Financial Economics", desc: "Micro and macro economic indices, demand-supply graphs, and Nepali fiscal policies evaluations.", icon: Lightbulb },
      { title: "Business Writing", desc: "Corporate letters drafting, memo formatting, case study research, and seminar-style presentations.", icon: BookOpen },
      { title: "Hotel Management basics", desc: "Optional culinary practice, food and beverage setups, and guest service protocols in simulated lab areas.", icon: Compass }
    ];
  }
  if (slug === "computer-science") {
    return [
      { title: "C++ & Software Logic", desc: "OOP concepts, code logic structures, loops, arrays, and standard software development exercises.", icon: CodeIcon },
      { title: "Web Tech & Databases", desc: "HTML formatting, CSS stylings, database entity-relations (ER), and basic SQL query configurations.", icon: Laptop },
      { title: "Robotics Club Projects", desc: "Microcontroller setups, robotic car builds, and IoT integrations in our specialized innovation club.", icon: Sparkles },
      { title: "Cooperative Audits", desc: "Integration of computer logic into accountancy, financial database systems, and data analytics tools.", icon: TrendingUpIcon }
    ];
  }
  // Default/Overview blocks
  return [
    { title: "Academic Choice", desc: "Affiliated with NEB, providing distinct paths in Science, Management, and Computer Science streams.", icon: GraduationCap },
    { title: "Board Examination Focus", desc: "Rigorous schedule of 4 term examinations and pre-board mocks to secure outstanding NEB scores.", icon: Target },
    { title: "Advanced Laboratories", desc: "High-speed internet computer labs, robotics kits, physics/chemistry facilities, and a digital library.", icon: Laptop },
    { title: "Career Counselling", desc: "Coordinator guidance, career talks by external professionals, and engineering/medical entrance prep assistance.", icon: Compass }
  ];
}

// Level specific quotes configuration
function getLevelQuote(slug: string): { quote: string; author: string; bgImage: string } {
  if (["montessori", "primary"].includes(slug)) {
    return {
      quote: "Play is the highest form of research.",
      author: "Albert Einstein",
      bgImage: "/images/classroom.jpg"
    };
  }
  if (["basic-level", "secondary-level"].includes(slug)) {
    return {
      quote: "Education is not preparation for life; education is life itself.",
      author: "John Dewey",
      bgImage: "/images/student in assembly.jpg"
    };
  }
  return {
    quote: "The roots of education are bitter, but the fruit is sweet.",
    author: "Aristotle",
    bgImage: "/images/students with smart board.jpg"
  };
}

// Level specific advantages configuration
function getLevelAdvantages(slug: string): { title: string; desc: string }[] {
  if (["montessori", "primary"].includes(slug)) {
    return [
      { title: "Activity-Based Pedagogy", desc: "Learning is never a burden. Children learn polite manners, coordinate physical balances, and build social confidence through interactive plays." },
      { title: "Highly Supportive Environment", desc: "Spacious, colorfully decorated, and child-safe classrooms staffed with experienced Montessori-trained educators." }
    ];
  }
  if (["basic-level", "secondary-level"].includes(slug)) {
    return [
      { title: "Advanced Infrastructure", desc: "Students enjoy direct access to general and digital libraries, hands-on Physics/Chemistry labs, and a modern computer lab." },
      { title: "Disciplined Focus & Mocks", desc: "Weekly aptitude diagnostics, terminal exams, and board mock runs guided by seasoned SEE board examiners to ensure 100% pass rates." }
    ];
  }
  return [
    { title: "Expert Academic Coordinator", desc: "Under Mr. Rajat Sampang, coordinator, students receive precise guidance, mock tests, and counseling programs mapped to NEB criteria." },
    { title: "State-of-the-Art Laboratories", desc: "Two modern computer labs, high-speed connections, botanical specimens collections, AI innovation club, and university entrance prep classes." }
  ];
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = programs.find((item) => item.slug === slug);
  return {
    title: program ? `${program.title} | Eureka` : "Academic Program Detail",
    description: program ? program.summary : "Academic program details at Eureka Residential Secondary School."
  };
}

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params;
  const program = programs.find((item) => item.slug === slug);
  if (!program) notFound();

  // Find other programs for internal recommendations
  const otherPrograms = programs.filter((p) => p.slug !== slug).slice(0, 3);
  const gallery = programGalleries[slug] || [];
  const blocks = getLevelBlocks(slug);
  const quoteData = getLevelQuote(slug);
  const advantages = getLevelAdvantages(slug);

  return (
    <div className="bg-[#f7fafb] min-h-screen text-[#18212f]">
      {/* Premium Hero Banner */}
      <section className="relative isolate flex min-h-[420px] items-center overflow-hidden text-white max-md:min-h-[300px]">
        <Image
          src={program.bannerImage || program.image}
          alt={`${program.title} banner`}
          fill
          sizes="100vw"
          className="-z-20 object-cover object-center scale-105"
          priority
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#10233f]/95 via-[#10233f]/75 to-[#10233f]/35" />
        <div className="mx-auto w-full max-w-[1140px] px-4">
          <div className="max-w-[760px]">
            <Link
              href="/programs"
              className="mb-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2fb7a9] transition-all hover:text-[#f58220]"
            >
              <ChevronLeft size={14} /> Back to Programs
            </Link>
            <br />
            <span className="mb-3 inline-flex min-h-7 items-center rounded-full bg-[#2fb7a9]/20 px-3.5 py-1 text-xs font-black uppercase tracking-wide text-[#2fb7a9] border border-[#2fb7a9]/30">
              {program.level}
            </span>
            <h1 className="text-balance text-[clamp(32px,5vw,52px)] font-black leading-tight text-white tracking-tight">
              {program.title}
            </h1>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-slate-200 font-medium">
              {program.summary}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link 
                href="/admission" 
                className="inline-flex min-h-[42px] items-center justify-center rounded-full bg-[#f58220] hover:bg-[#2fb7a9] text-white px-6 py-2.5 text-xs font-extrabold uppercase tracking-wider transition-all duration-300 shadow-md hover:-translate-y-0.5"
              >
                Apply Now
              </Link>
              <Link 
                href="/contact" 
                className="inline-flex min-h-[42px] items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-2.5 text-xs font-extrabold uppercase tracking-wider transition-all duration-300"
              >
                Enquire
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Program Details Content Grid */}
      <section className="py-[75px] max-md:py-14">
        <div className="mx-auto w-full max-w-[1140px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_.8fr] gap-12">
            {/* Left Column: Academic overview, highlights, details */}
            <div className="grid gap-8">
              {/* Detailed Context */}
              <article className="rounded-2xl bg-white p-8 shadow-sm border border-slate-100/60">
                <h2 className="mb-5 text-2xl font-bold text-[#10233f] border-b pb-3 border-slate-100 flex items-center gap-2 tracking-tight">
                  <GraduationCap className="text-[#2fb7a9]" /> Program Overview & Objective
                </h2>
                <p className="text-sm md:text-base leading-7 text-[#657184] whitespace-pre-line font-medium">
                  {program.details}
                </p>
                
                {/* Meta details cards */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex gap-3 rounded-xl bg-[#dff5f1]/30 p-4 border border-[#dff5f1]/60">
                    <span className="text-[#f58220] shrink-0 mt-0.5"><Clock size={20} /></span>
                    <div>
                      <h4 className="text-xs font-black uppercase text-[#10233f] tracking-wide">Duration</h4>
                      <p className="text-sm font-semibold text-slate-700 mt-1">{program.duration}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 rounded-xl bg-[#dff5f1]/30 p-4 border border-[#dff5f1]/60">
                    <span className="text-[#2fb7a9] shrink-0 mt-0.5"><ClipboardCheck size={20} /></span>
                    <div>
                      <h4 className="text-xs font-black uppercase text-[#10233f] tracking-wide">Eligibility</h4>
                      <p className="text-sm font-semibold text-slate-700 mt-1">{program.eligibility}</p>
                    </div>
                  </div>
                </div>
              </article>

              {/* Study Modules / Curriculum */}
              <article className="rounded-2xl bg-white p-8 shadow-sm border border-slate-100/60">
                <h2 className="mb-5 text-2xl font-bold text-[#10233f] border-b pb-3 border-slate-100 flex items-center gap-2 tracking-tight">
                  <BookOpen className="text-[#2fb7a9]" /> Study Curriculum & Key Modules
                </h2>
                <p className="text-xs md:text-sm text-[#657184] mb-6 font-medium">
                  Our curriculum is structured to support conceptual clarity, analytical thinking, and board exam compliance under the National Curriculum Framework.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {program.curriculum.map((item) => (
                    <div className="flex items-start gap-2.5" key={item}>
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#dff5f1] text-[#2fb7a9] mt-0.5">
                        <Check size={12} className="stroke-[3]" />
                      </span>
                      <span className="text-sm font-bold text-[#18212f] leading-normal">{item}</span>
                    </div>
                  ))}
                </div>
              </article>
            </div>

            {/* Right Column: Admission snapshot / links / other levels */}
            <div className="grid gap-6 content-start">
              {/* Join Action Card */}
              <div className="rounded-2xl bg-gradient-to-br from-[#10233f] to-[#17345f] p-8 text-white shadow-md relative overflow-hidden">
                <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[#2fb7a9]/10 -mr-6 -mt-6" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#f58220]">Registration Open</span>
                <h3 className="text-2xl font-black mt-2 mb-4 leading-tight tracking-tight">Join Eureka School</h3>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-6 font-medium">
                  We look forward to partnering in your child's academic journey. Contact admissions to map class placement and interaction session dates.
                </p>
                <div className="grid gap-3">
                  <Link
                    href="/admission"
                    className="flex min-h-[44px] items-center justify-center rounded-full bg-[#f58220] hover:bg-[#2fb7a9] text-center text-xs font-black uppercase tracking-wider text-white transition-all duration-300 shadow-md"
                  >
                    Start Admission Process
                  </Link>
                  <Link
                    href="/contact"
                    className="flex min-h-[44px] items-center justify-center rounded-full border border-white/20 bg-white/5 text-center text-xs font-black uppercase tracking-wider text-white transition-all duration-300 hover:bg-white/10"
                  >
                    Contact Admissions
                  </Link>
                </div>
              </div>

              {/* SEE Excellence snippets */}
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100/60">
                <h4 className="text-xs font-black uppercase text-[#10233f] tracking-wide mb-3 flex items-center gap-1.5">
                  <Award size={15} className="text-[#f58220]" /> SEE Academic Excellence
                </h4>
                <p className="text-xs text-[#657184] leading-relaxed font-medium">
                  Eureka Residential Secondary School holds an outstanding track record in SEE board results, consistently delivering 100% pass rates and Perfect GPA 4.0 toppers.
                </p>
                <Link href="/results" className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#2fb7a9] hover:text-[#f58220] transition-colors">
                  Hall of Toppers <ArrowRight size={12} />
                </Link>
              </div>

              {/* Nav other programs */}
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100/60">
                <h4 className="text-sm font-bold text-[#10233f] mb-4">Other Levels & Streams</h4>
                <div className="grid gap-3">
                  {otherPrograms.map((op) => (
                    <Link
                      href={`/programs/${op.slug}`}
                      className="group block border-b border-slate-100 pb-2 last:border-b-0 last:pb-0"
                      key={op.slug}
                    >
                      <h5 className="text-xs font-bold text-[#18212f] transition group-hover:text-[#2fb7a9]">
                        {op.title}
                      </h5>
                      <span className="text-[9px] uppercase font-black tracking-wider text-slate-400">{op.level}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Parallax Quote Break */}
      <section className="relative isolate py-[100px] overflow-hidden text-center text-white">
        <Image
          src={quoteData.bgImage}
          alt="School pedagogy context"
          fill
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-black/70" />
        <div className="mx-auto w-full max-w-[800px] px-4">
          <blockquote className="text-balance text-2xl md:text-3xl font-light italic leading-normal text-slate-100">
            “{quoteData.quote}”
          </blockquote>
          <cite className="mt-4 block text-xs font-black uppercase tracking-wider text-[#2fb7a9] not-italic">
            &mdash; {quoteData.author}
          </cite>
        </div>
      </section>

      {/* Level Specific Development Blocks */}
      <section className="py-[80px] max-md:py-14 bg-white border-b border-slate-100">
        <div className="mx-auto w-full max-w-[1140px] px-4">
          <div className="mb-14 text-center max-w-[680px] mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2fb7a9]">Key Developmental Areas</span>
            <h2 className="text-3xl font-extrabold text-[#10233f] mt-2 tracking-tight">
              Curriculum Core Blocks
            </h2>
            <div className="h-1 bg-[#f58220] w-12 mt-4 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {blocks.map((block, idx) => {
              const IconComponent = block.icon;
              return (
                <div key={idx} className="bg-[#f7fafb] rounded-2xl p-6 border border-slate-100/60 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="h-10 w-10 rounded-lg bg-[#2fb7a9]/10 text-[#2fb7a9] flex items-center justify-center mb-4 border border-[#2fb7a9]/10">
                      <IconComponent size={20} />
                    </div>
                    <h3 className="text-base font-bold text-[#10233f] tracking-tight">
                      {block.title}
                    </h3>
                    <p className="text-xs text-[#657184] mt-2.5 leading-relaxed font-semibold">
                      {block.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why choose this wing at Eureka */}
      <section className="py-[80px] max-md:py-14 bg-slate-50 relative overflow-hidden">
        <div className="mx-auto w-full max-w-[1140px] px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2fb7a9]">Competitive Advantage</span>
              <h2 className="text-3xl font-extrabold text-[#10233f] mt-2 tracking-tight">
                Why {program.title} at Eureka?
              </h2>
              <p className="mt-4 text-xs md:text-sm text-[#657184] leading-relaxed font-semibold">
                Eureka ensures that every educational stage merges structural discipline, moral validation, advanced tools, and detailed guidance.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link 
                  href="/admission" 
                  className="inline-flex min-h-[42px] items-center justify-center rounded-full bg-[#f58220] hover:bg-[#2fb7a9] text-white px-6 py-2.5 text-xs font-extrabold uppercase tracking-wider transition-all duration-300"
                >
                  Enroll Today
                </Link>
              </div>
            </div>
            
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {advantages.map((adv, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="h-9 w-9 rounded-lg bg-[#f58220]/10 text-[#f58220] flex items-center justify-center mb-4 border border-[#f58220]/10">
                      <Sparkles size={18} />
                    </div>
                    <h3 className="text-base font-bold text-[#10233f] tracking-tight">{adv.title}</h3>
                    <p className="text-xs text-[#657184] mt-2 leading-relaxed font-semibold">{adv.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Program Experience Gallery */}
      {gallery && gallery.length > 0 && (
        <section className="bg-white py-[80px] border-t border-slate-100">
          <div className="mx-auto w-full max-w-[1140px] px-4">
            <div className="mb-10 text-center max-w-[650px] mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2fb7a9]">Visual Highlights</span>
              <h2 className="text-3xl font-extrabold text-[#10233f] mt-1 tracking-tight">Program Experience Gallery</h2>
              <div className="h-1 bg-[#f58220] w-12 mt-3 mx-auto rounded-full" />
              <p className="mt-4 text-xs md:text-sm text-[#657184] font-semibold">
                A real-life look inside our labs, classrooms, student creations, and active study field excursions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {gallery.map((img, idx) => (
                <div key={idx} className="group relative aspect-[4/3] overflow-hidden rounded-xl shadow-sm border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <Image
                    src={img.src}
                    alt={img.caption}
                    fill
                    sizes="(max-width: 768px) 100vw, 260px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-4">
                    <p className="text-[11px] font-bold text-white leading-snug">{img.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
