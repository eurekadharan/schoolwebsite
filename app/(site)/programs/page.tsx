import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { programs } from "@/lib/site-data";

// Custom SVG Icons to bypass Lucide version and compilation conflicts
const ChevronRight = ({ size = 12, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const Clock = ({ size = 14, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ArrowRight = ({ size = 14, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const Atom = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="1" />
    <path d="M20.2 20.2c2.4-2.4 2.4-6.2 0-8.5-2.4-2.4-6.2-2.4-8.5 0-2.4 2.4-2.4 6.2 0 8.5 2.4 2.4 6.2 2.4 8.5 0z" />
    <path d="M15.8 8.2c-2.4-2.4-6.2-2.4-8.5 0-2.4 2.4-2.4 6.2 0 8.5 2.4 2.4 6.2 2.4 8.5 0 2.4-2.4 2.4-6.2 0-8.5z" />
    <path d="M12 2a15.3 15.3 0 0 1 4 9.75M12 2a15.3 15.3 0 0 0-4 9.75M12 22a15.3 15.3 0 0 1-4-9.75M12 22a15.3 15.3 0 0 0 4-9.75" />
  </svg>
);

const TrendingUp = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

const Code = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const CheckCircle = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const FileText = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M10 9H8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
  </svg>
);

export const metadata: Metadata = {
  title: "Academic Programs | Eureka Residential Secondary School",
  description: "Explore Eureka's learning pathways from Montessori wing, Primary, Basic, and Secondary levels to NEB-affiliated 10+2 streams in Science, Management, and Computer Science."
};

export default function ProgramsPage() {
  // Extract wings & +2 streams separately for clear structured layout
  const schoolWings = programs.filter(p => 
    ["montessori", "primary", "basic-level", "secondary-level"].includes(p.slug)
  );

  const plusTwoStreams = programs.filter(p => 
    ["science", "management", "computer-science"].includes(p.slug)
  );

  return (
    <div className="bg-[#f7fafb] min-h-screen text-[#18212f]">
      {/* Premium Hero Banner */}
      <section className="relative isolate flex min-h-[380px] items-center overflow-hidden text-white max-md:min-h-[280px]">
        <Image
          src="/images/primary kids.jpg"
          alt="Eureka academic programs"
          fill
          sizes="100vw"
          className="-z-20 object-cover object-center scale-105"
          priority
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#10233f]/95 via-[#10233f]/80 to-[#10233f]/35" />
        
        <div className="mx-auto w-full max-w-[1140px] px-4 py-8">
          <div className="max-w-[720px]">
            {/* Breadcrumbs */}
            <nav className="mb-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2fb7a9]">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={10} className="text-slate-400" />
              <span className="text-white">Programs</span>
            </nav>
            
            <span className="mb-3 inline-flex min-h-7 items-center rounded-full bg-[#2fb7a9]/20 px-3.5 py-1 text-xs font-black uppercase tracking-wide text-[#2fb7a9] border border-[#2fb7a9]/30">
              Learning Pathways
            </span>
            <h1 className="text-balance text-[clamp(32px,5.5vw,54px)] font-extrabold leading-tight text-white tracking-tight">
              Academic Programs
            </h1>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-slate-200 font-medium">
              From foundational early childhood Montessori activities to advanced pre-university streams, we empower students through modern facilities, project-based learning, and character building.
            </p>
          </div>
        </div>
      </section>

      {/* Main Core Academic Wings Section */}
      <section className="py-[80px] max-md:py-14">
        <div className="mx-auto max-w-[1140px] px-4">
          <div className="mb-14 text-center max-w-[680px] mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2fb7a9]">Core Levels</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#10233f] mt-2 tracking-tight">
              School Wings & Levels
            </h2>
            <div className="h-1.5 w-16 bg-[#f58220] mx-auto mt-4 rounded-full" />
            <p className="mt-4 text-sm md:text-base text-[#657184]">
              Explore our structured levels carefully designed to nurture children through key cognitive, physical, and emotional developmental milestones.
            </p>
          </div>

          <div className="grid gap-16 md:gap-20">
            {schoolWings.map((program, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div 
                  key={program.slug} 
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
                >
                  {/* Visual Side */}
                  <div className={`lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-slate-100/60 group ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 550px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#10233f]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-xs font-bold text-white tracking-widest uppercase">Eureka {program.title}</span>
                    </div>
                  </div>

                  {/* Text Side */}
                  <div className={`lg:col-span-6 flex flex-col justify-center ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <span className="text-[11px] font-black tracking-widest uppercase text-[#2fb7a9] mb-2 inline-block">
                      {program.level}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-[#10233f] tracking-tight hover:text-[#f58220] transition-colors">
                      {program.title}
                    </h3>
                    <p className="text-sm font-semibold text-[#f58220] mt-1.5 flex items-center gap-1.5">
                      <Clock size={14} /> Duration: {program.duration}
                    </p>
                    
                    <p className="mt-4 text-sm md:text-base leading-relaxed text-[#657184]">
                      {program.summary}
                    </p>

                    {/* Highlight Chips */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {program.curriculum.slice(0, 4).map((item) => (
                        <span 
                          key={item} 
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#dff5f1] text-[11px] font-bold text-[#2fb7a9] border border-[#2fb7a9]/10"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-[#2fb7a9]" />
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8">
                      <Link
                        href={`/programs/${program.slug}`}
                        className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#10233f] text-white px-6 py-2.5 text-xs font-extrabold uppercase tracking-wider transition-all duration-300 hover:bg-[#f58220] hover:translate-x-1 shadow-sm hover:shadow"
                      >
                        Explore Wing <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured +2 Streams Section */}
      <section className="py-[80px] max-md:py-14 bg-gradient-to-b from-[#10233f] to-[#17345f] text-white" id="plus-two">
        <div className="mx-auto max-w-[1140px] px-4">
          <div className="mb-14 text-center max-w-[680px] mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2fb7a9]">Pre-University Education</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2 tracking-tight">
              Grade XI & XII (+2 Streams)
            </h2>
            <div className="h-1.5 w-16 bg-[#f58220] mx-auto mt-4 rounded-full" />
            <p className="mt-4 text-sm md:text-base text-slate-300">
              Eureka secondary level transitions into specialized higher secondary streams registered with the National Examinations Board (NEB) of Nepal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plusTwoStreams.map((program) => {
              // Custom icon selection based on stream type
              let IconComponent = Atom;
              if (program.slug === "management") IconComponent = TrendingUp;
              if (program.slug === "computer-science") IconComponent = Code;

              return (
                <div 
                  key={program.slug}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 flex flex-col justify-between hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1.5 group shadow-md"
                >
                  <div>
                    <div className="h-12 w-12 rounded-xl bg-[#2fb7a9]/10 text-[#2fb7a9] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-[#2fb7a9]/20">
                      <IconComponent size={24} />
                    </div>
                    
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#2fb7a9] block mb-1">
                      {program.level}
                    </span>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {program.title}
                    </h3>
                    
                    <p className="text-xs font-semibold text-slate-300 mt-2 flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1 w-max">
                      <Clock size={12} className="text-[#f58220]" /> SEE GPA 2.0+ Required
                    </p>

                    <p className="mt-4 text-xs md:text-sm leading-relaxed text-slate-300">
                      {program.summary}
                    </p>
                  </div>

                  <div className="mt-8 border-t border-white/10 pt-5">
                    <Link
                      href={`/programs/${program.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2fb7a9] hover:text-[#f58220] transition-colors"
                    >
                      Explore Stream Details <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Plus Two Overview Block */}
          <div className="mt-12 p-8 rounded-2xl bg-white/5 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-[620px]">
              <span className="text-xs font-bold text-[#f58220] uppercase tracking-wider">NEB Overview</span>
              <h3 className="text-xl font-bold mt-1 text-white">Streamlined Pathways & High Board Performance</h3>
              <p className="text-xs md:text-sm text-slate-300 mt-2 leading-relaxed font-medium">
                Led by Coordinator Mr. Rajat Sampang, Eureka's plus two wing provides academic guidelines, regular mock tests, research-oriented fieldworks, and specialized counseling.
              </p>
            </div>
            <div>
              <Link 
                href="/programs/grade-xi-xii"
                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#f58220] text-white px-6 py-2.5 text-xs font-extrabold uppercase tracking-wider transition-all duration-300 hover:bg-[#2fb7a9] whitespace-nowrap"
              >
                View NEB Guidelines
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Examination System & Assessment Policy */}
      <section className="py-[80px] max-md:py-14 bg-white border-b border-slate-100">
        <div className="mx-auto max-w-[1140px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2fb7a9]">Assessment Framework</span>
              <h2 className="text-3xl font-extrabold text-[#10233f] mt-2 tracking-tight font-black">
                Examination & Grading System
              </h2>
              <div className="h-1 bg-[#f58220] w-12 mt-4 rounded-full" />
              <p className="mt-5 text-sm md:text-base leading-relaxed text-[#657184]">
                To ensure consistent performance and academic discipline, Eureka employs a multi-tiered diagnostic assessment policy across all grades. Our evaluation is not just to grade, but to identify gaps and guide active growth.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Primary Card */}
              <div className="bg-[#f7fafb] rounded-2xl p-6 border border-slate-100/60 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="h-10 w-10 rounded-lg bg-[#2fb7a9]/10 text-[#2fb7a9] flex items-center justify-center mb-4 border border-[#2fb7a9]/10">
                    <CheckCircle size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-[#10233f] tracking-tight">
                    Primary Wing (Montessori - Gr 3)
                  </h3>
                  <p className="text-xs text-[#657184] mt-2 leading-relaxed font-medium">
                    Uses the Continuous Assessment System (CAS). Grades are determined by sensory milestones, oral presentation, handwriting, class interaction, and regular activity checklists.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200/50">
                  <span className="inline-block text-[10px] font-black uppercase text-[#2fb7a9] bg-[#dff5f1] px-2.5 py-0.8 rounded">
                    100% Activity-Based
                  </span>
                </div>
              </div>

              {/* Senior Card */}
              <div className="bg-[#f7fafb] rounded-2xl p-6 border border-slate-100/60 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="h-10 w-10 rounded-lg bg-[#f58220]/10 text-[#f58220] flex items-center justify-center mb-4 border border-[#f58220]/10">
                    <FileText size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-[#10233f] tracking-tight">
                    Senior Wing (Grade 4 - 12)
                  </h3>
                  <p className="text-xs text-[#657184] mt-2 leading-relaxed font-medium">
                    Employs systematic tests and terminal exams:
                  </p>
                  <ul className="text-[11px] text-[#657184] mt-2.5 space-y-1 font-semibold">
                    <li className="flex items-center gap-1.5">&bull; 3 Diagnostic Unit Tests per term</li>
                    <li className="flex items-center gap-1.5">&bull; 3 Main Terminal Examinations</li>
                    <li className="flex items-center gap-1.5">&bull; Pre-Board Mock Exams for SEE & NEB</li>
                  </ul>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200/50">
                  <span className="inline-block text-[10px] font-black uppercase text-[#f58220] bg-orange-50 px-2.5 py-0.8 rounded">
                    Board-Examiner Standard
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admission Timeline Section */}
      <section className="py-[80px] max-md:py-14 bg-slate-50">
        <div className="mx-auto max-w-[1140px] px-4">
          <div className="mb-14 text-center max-w-[680px] mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2fb7a9]">Step-by-Step Pathway</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#10233f] mt-2 tracking-tight">
              Admission Process
            </h2>
            <div className="h-1.5 w-16 bg-[#f58220] mx-auto mt-4 rounded-full" />
            <p className="mt-4 text-sm md:text-base text-[#657184]">
              Start your journey at Eureka. We evaluate capabilities to place students where they will thrive best.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative before:absolute before:top-1/4 before:left-0 before:right-0 before:h-0.5 before:bg-[#2fb7a9]/10 before:-z-10 before:hidden md:before:block">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100/60 shadow-sm relative text-center">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-[#f58220] text-white flex items-center justify-center font-black text-sm shadow-md">
                01
              </div>
              <h3 className="text-lg font-bold text-[#10233f] mt-4 tracking-tight">Inquiry Submission</h3>
              <p className="text-xs md:text-sm text-[#657184] mt-3 leading-relaxed font-medium">
                Fill out the inquiry form online or obtain a physical application folder from the Front Desk at Block A.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100/60 shadow-sm relative text-center">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-[#2fb7a9] text-white flex items-center justify-center font-black text-sm shadow-md">
                02
              </div>
              <h3 className="text-lg font-bold text-[#10233f] mt-4 tracking-tight">Evaluation & Interaction</h3>
              <p className="text-xs md:text-sm text-[#657184] mt-3 leading-relaxed font-medium">
                Attend interactive sessions (Montessori/Primary) or sit for a written entrance test covering English, Maths, and Science (Grade 4+).
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100/60 shadow-sm relative text-center">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-[#10233f] text-white flex items-center justify-center font-black text-sm shadow-md">
                03
              </div>
              <h3 className="text-lg font-bold text-[#10233f] mt-4 tracking-tight">Final Registration</h3>
              <p className="text-xs md:text-sm text-[#657184] mt-3 leading-relaxed font-medium">
                Successful candidates finalize enrollment by presenting prior school transcripts, character certificates, and completing fee formalities.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link 
              href="/admission"
              className="inline-flex min-h-[46px] items-center justify-center rounded-full bg-[#f58220] hover:bg-[#2fb7a9] text-white px-8 py-3 text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-md hover:-translate-y-0.5"
            >
              Start Admission Process &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
