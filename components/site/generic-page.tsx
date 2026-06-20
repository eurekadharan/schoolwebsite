"use client";

import Image from "next/image";
import Link from "next/link";
import { Award, Home, MapPin, Medal, Microscope, Sparkles, Users } from "lucide-react";
import { getPageSummary, iconHighlights, programs, school } from "@/lib/site-data";

type PageSummary = NonNullable<ReturnType<typeof getPageSummary>>;

const container = "mx-auto max-w-[1140px] px-4";
const eyebrow = "mb-4 inline-flex min-h-7 items-center rounded-full bg-[#d9fffc] px-3 py-1 text-xs font-bold uppercase text-[#3eaea6]";
const title = "text-balance text-[clamp(28px,3.2vw,42px)] font-bold leading-tight text-[#2e2c2c]";
const btnPrimary = "mt-5 inline-flex min-h-[42px] items-center justify-center rounded-full bg-[#ff7b3b] px-6 py-3 text-xs font-bold uppercase text-white transition hover:-translate-y-0.5 hover:bg-[#3eaea6]";

const highlightIcons = {
  microscope: Microscope,
  home: Home,
  users: Users,
  medal: Medal,
  sparkles: Sparkles,
  map: MapPin,
  award: Award
};

export function GenericPage({ page }: { page: PageSummary }) {
  return (
    <>
      <section className="relative isolate flex min-h-[360px] items-center overflow-hidden text-white">
        <Image src={page.image} alt={page.title} fill sizes="100vw" className="-z-20 object-cover" priority />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#2b2e3d]/90 to-[#2b2e3d]/25" />
        <div className={container}>
          <span className={eyebrow}>{page.eyebrow}</span>
          <h1 className="max-w-[760px] text-balance text-[clamp(36px,6vw,60px)] font-bold leading-tight text-white">{page.title}</h1>
          <p className="mt-4 max-w-[660px] text-white/90">{page.description}</p>
        </div>
      </section>

      <section className="bg-[#d9fffc] py-[75px] max-md:py-14">
        <div className={`${container} grid grid-cols-[1.1fr_.9fr] gap-10 max-lg:grid-cols-1`}>
          <div className="bg-white p-8 shadow-eureka">
            <h2 className={title}>Built for disciplined, modern learning</h2>
            <p className="mt-4 text-[#4b4b4b]">
              {school.name} combines academic rigor, moral values, technology integration,
              project-based learning, co-curricular exposure, and student care from Montessori to Grade XII.
            </p>
            <p className="mt-4 text-[#4b4b4b]">
              This page is connected to the admin content model and can later be managed from Supabase.
              The first release ships with curated Eureka content from the local school details and image assets.
            </p>
            <Link className={btnPrimary} href="/contact">Enquire Now</Link>
          </div>
          <div className="bg-white p-8 shadow-eureka">
            <h2 className="mb-4 text-2xl font-bold text-[#2e2c2c]">Program Snapshot</h2>
            <div className="grid gap-3">
              {programs.map((program, index) => (
                <details className="overflow-hidden rounded-[5px] bg-white shadow-eureka" key={program.slug} open={index === 0}>
                  <summary className="flex min-h-[54px] cursor-pointer items-center justify-between bg-[#ff7b3b] px-5 py-3 font-bold text-white marker:content-none">
                    {program.title}
                    <span>+</span>
                  </summary>
                  <div className="px-5 py-4">
                    <p className="m-0 text-sm leading-6 text-[#4b4b4b]">{program.summary}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>

        <div className={`${container} mt-8 grid grid-cols-3 gap-4 max-md:grid-cols-1`}>
          {iconHighlights.slice(0, 6).map((item) => {
            const Icon = highlightIcons[item.icon as keyof typeof highlightIcons];
            return (
              <div className="bg-[#eaf4f3] p-5" key={item.label}>
                <Icon className="text-[#ff7b3b]" size={24} />
                <p className="mb-0 mt-3 text-sm font-bold text-[#2e2c2c]">{item.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-[75px] max-md:py-14">
        <div className={`${container} grid grid-cols-2 items-center gap-12 max-lg:grid-cols-1`}>
          <div>
            <span className={eyebrow}>Eureka Identity</span>
            <h2 className={title}>{school.motto}</h2>
            <p className="mt-4 text-[#4b4b4b]">
              Established in {school.established}, located at {school.address}, Eureka continues
              to serve students with a disciplined environment and excellent academic results.
            </p>
            <Link className={btnPrimary} href="/admission">Apply Now</Link>
          </div>
          <div className="relative min-h-[410px] overflow-hidden shadow-eureka max-md:min-h-[300px]">
            <Image src="/images/students with smart board.jpg" alt="Eureka smart learning" fill sizes="520px" className="object-cover" />
          </div>
        </div>
      </section>
    </>
  );
}
