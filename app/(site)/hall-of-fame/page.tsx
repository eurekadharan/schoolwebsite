import type { Metadata } from "next";
import Image from "next/image";
import { getAchievements } from "@/lib/achievements-store";
import { getPageSummary } from "@/lib/site-data";
import SafeImage from "@/components/safe-image";

export const metadata: Metadata = {
  title: "Hall of Fame | Eureka Residential Secondary School",
  description: "Honoring our outstanding SLC & SEE toppers and alumni excelling in diverse professional fields worldwide."
};

export const revalidate = 0; // Fresh content

const container = "mx-auto max-w-[1140px] px-4";
const eyebrow = "mb-4 inline-flex min-h-7 items-center rounded-full bg-[#d9fffc] px-3 py-1 text-xs font-bold uppercase text-[#3eaea6]";
const title = "text-balance text-[clamp(28px,3.2vw,42px)] font-bold leading-tight text-[#2e2c2c]";

export default async function HallOfFamePage() {
  const achievements = await getAchievements(false);
  const page = getPageSummary("hall-of-fame")!;

  return (
    <>
      {/* Hero Header */}
      <section className="relative isolate flex min-h-[360px] items-center overflow-hidden text-white">
        <Image src={page.image} alt={page.title} fill sizes="100vw" className="-z-20 object-cover" priority />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#2b2e3d]/90 to-[#2b2e3d]/25" />
        <div className={container}>
          <span className={eyebrow}>{page.eyebrow}</span>
          <h1 className="max-w-[760px] text-balance text-[clamp(36px,6vw,60px)] font-bold leading-tight text-white">{page.title}</h1>
          <p className="mt-4 max-w-[660px] text-white/90">{page.description}</p>
        </div>
      </section>

      {/* Grid of Achievers */}
      <section className="bg-[#f8fafa] py-[75px] max-md:py-14">
        <div className={container}>
          <div className="mx-auto mb-16 max-w-[760px] text-center">
            <span className={eyebrow}>Wall of Toppers</span>
            <h2 className={title}>In Pursuit of Excellence</h2>
            <p className="mx-auto mt-4 max-w-[600px] text-[#4b4b4b]">
              We celebrate our graduates who have excelled in the SLC and SEE examinations and are now leading as professionals in diverse fields around the world.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {achievements.map((item) => (
              <article
                className="overflow-hidden rounded-xl bg-white shadow-[0_4px_20px_rgba(43,46,61,0.05)] border border-slate-100 p-6 flex flex-col items-center text-center hover:shadow-[0_8px_30px_rgba(43,46,61,0.08)] transition duration-300"
                key={item.id}
              >
                {/* PP Size Photo Box */}
                <div className="relative h-[120px] w-[120px] rounded-full bg-slate-100 border-2 border-[#3eaea6] overflow-hidden flex items-center justify-center mb-4 shrink-0">
                  <SafeImage
                    src={item.cover_image || "/images/staffs.jpg"}
                    alt={item.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                
                <span className="text-[10px] font-black uppercase text-[#ff7b3b] tracking-wider px-2.5 py-0.5 rounded bg-[#ff7b3b]/10 mb-2">
                  {item.category}
                </span>

                <h3 className="text-lg font-extrabold text-[#10233f] mb-1.5 leading-snug">
                  {item.title}
                </h3>
                
                <p className="text-sm font-semibold text-[#3eaea6] mb-3">
                  {item.summary}
                </p>
                
                <p className="text-xs text-slate-500 leading-relaxed max-w-[240px]">
                  {item.body || `${item.title} achieved outstanding results in their academic tenure at Eureka.`}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
