import type { Metadata } from "next";
import Image from "next/image";
import { getPageSummary, school } from "@/lib/site-data";
import { AdmissionForm } from "@/components/forms/admission-form";

export const metadata: Metadata = {
  title: "Admission | Eureka Residential Secondary School",
  description: "Find admission guidelines, required documents checklist, enrollment steps, and the online inquiry form for Eureka."
};

const container = "mx-auto max-w-[1140px] px-4";
const eyebrow = "mb-4 inline-flex min-h-7 items-center rounded-full bg-[#d9fffc] px-3 py-1 text-xs font-bold uppercase text-[#3eaea6]";
const title = "text-balance text-[clamp(28px,3.2vw,42px)] font-bold leading-tight text-[#2e2c2c]";

export default function AdmissionPage() {
  const page = getPageSummary("admission")!;

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

      {/* Main Section */}
      <section className="bg-[#f8fafa] py-[75px] max-md:py-14">
        <div className={container}>
          <div className="grid grid-cols-[1.1fr_.9fr] gap-10 max-lg:grid-cols-1">
            
            {/* Left Column: Guidelines */}
            <div className="bg-white p-8 shadow-eureka rounded-lg border border-slate-100">
              <span className={eyebrow}>Enrollment Steps</span>
              <h2 className={`${title} mb-6`}>Admission Guidelines</h2>
              
              <div className="grid gap-6">
                <div>
                  <h3 className="text-base font-extrabold text-[#10233f] flex items-center gap-2">
                    <span className="grid h-6 w-6 place-items-center rounded bg-[#ff7b3b] text-xs font-bold text-white">1</span>
                    Online Inquiry
                  </h3>
                  <p className="text-sm text-slate-500 mt-1.5 pl-8 leading-relaxed">
                    Submit the online inquiry form on the right with student details and grade preference.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-base font-extrabold text-[#10233f] flex items-center gap-2">
                    <span className="grid h-6 w-6 place-items-center rounded bg-[#ff7b3b] text-xs font-bold text-white">2</span>
                    Application Collection
                  </h3>
                  <p className="text-sm text-slate-500 mt-1.5 pl-8 leading-relaxed">
                    Pick up the physical application form from Front Desk Block A, or download it from our Resources section.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-[#10233f] flex items-center gap-2">
                    <span className="grid h-6 w-6 place-items-center rounded bg-[#ff7b3b] text-xs font-bold text-white">3</span>
                    Entrance Assessment / Interaction
                  </h3>
                  <p className="text-sm text-slate-500 mt-1.5 pl-8 leading-relaxed">
                    The candidate must sit for a scheduled entrance examination (Grades I-XII) or interactive session (Montessori).
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-[#10233f] flex items-center gap-2">
                    <span className="grid h-6 w-6 place-items-center rounded bg-[#ff7b3b] text-xs font-bold text-white">4</span>
                    Document Submission
                  </h3>
                  <div className="text-sm text-slate-500 mt-1.5 pl-8 leading-relaxed">
                    Upon selection, submit the following checklist at our administration desk:
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>2 Passport size student photos</li>
                      <li>Copy of last terminal exam report card</li>
                      <li>Character Certificate and Transfer Certificate from the previous school</li>
                      <li>Copy of Birth Certificate</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-[#10233f] flex items-center gap-2">
                    <span className="grid h-6 w-6 place-items-center rounded bg-[#ff7b3b] text-xs font-bold text-white">5</span>
                    Admission Confirmed
                  </h3>
                  <p className="text-sm text-slate-500 mt-1.5 pl-8 leading-relaxed">
                    Final confirmation is completed on fee payment and administrative registration.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="bg-white p-8 shadow-eureka rounded-lg border border-slate-100 h-fit">
              <span className="mb-4 inline-flex min-h-7 items-center rounded-full bg-[#ff7b3b]/10 px-3 py-1 text-xs font-bold uppercase text-[#ff7b3b]">Inquiry Form</span>
              <h2 className="text-2xl font-bold text-[#10233f] mb-6">Online Admission Inquiry</h2>
              <AdmissionForm />
            </div>

          </div>

          {/* Map Embed */}
          <div className="mt-14">
            <h3 className="text-xl font-extrabold text-[#10233f] mb-4 text-center">Visit Our Campus</h3>
            <div className="w-full h-[400px] overflow-hidden rounded-xl shadow-sm border border-slate-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.178454099108!2d85.30071787546865!3d27.74264127616226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18cfd52af84f%3A0xd2aaab154f359e60!2sEureka%20High%20School!5e0!3m2!1sen!2snp!4v1781941516157!5m2!1sen!2snp"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
