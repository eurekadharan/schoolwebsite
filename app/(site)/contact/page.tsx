import type { Metadata } from "next";
import Image from "next/image";
import { getPageSummary, school } from "@/lib/site-data";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact Us | Eureka Residential Secondary School",
  description: "Get in touch with the administration team at Eureka Residential Secondary School, Dharan-1."
};

const container = "mx-auto max-w-[1140px] px-4";
const eyebrow = "mb-4 inline-flex min-h-7 items-center rounded-full bg-[#d9fffc] px-3 py-1 text-xs font-bold uppercase text-[#3eaea6]";
const title = "text-balance text-[clamp(28px,3.2vw,42px)] font-bold leading-tight text-[#2e2c2c]";

export default function ContactPage() {
  const page = getPageSummary("contact")!;

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
          <div className="grid grid-cols-[1fr_1.1fr] gap-10 max-lg:grid-cols-1">
            
            {/* Left Column: School details */}
            <div className="bg-white p-8 shadow-eureka rounded-lg border border-slate-100 flex flex-col justify-between">
              <div>
                <span className={eyebrow}>Details</span>
                <h2 className={`${title} mb-6`}>Get in Touch</h2>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                  Have queries regarding our Pre-Primary Montessori, Basic Level, or +2 streams (Science, Management, Computer Science)? Connect with our administration or leadership team.
                </p>
                
                <div className="space-y-4 border-t border-slate-100 pt-6">
                  <div>
                    <h4 className="text-xs font-black uppercase text-[#ff7b3b]">School Location</h4>
                    <p className="text-sm text-[#10233f] font-bold mt-0.5">{school.address}, {school.province}</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-black uppercase text-[#ff7b3b]">Phone Numbers</h4>
                    <p className="text-sm text-[#10233f] font-bold mt-0.5">{school.phone}</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-black uppercase text-[#ff7b3b]">Email Address</h4>
                    <p className="text-sm text-[#10233f] font-bold mt-0.5">{school.email}</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-black uppercase text-[#ff7b3b]">Office Hours</h4>
                    <p className="text-sm text-[#10233f] font-bold mt-0.5">Sunday - Friday: 9:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-slate-100 pt-6">
                <h4 className="text-xs font-black uppercase text-slate-400">Administration Desk</h4>
                <p className="text-xs text-slate-500 mt-1">Block A (Front Desk), Laxmi Sadak, Dharan-1</p>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="bg-white p-8 shadow-eureka rounded-lg border border-slate-100">
              <span className="mb-4 inline-flex min-h-7 items-center rounded-full bg-[#ff7b3b]/10 px-3 py-1 text-xs font-bold uppercase text-[#ff7b3b]">Contact Form</span>
              <h2 className="text-2xl font-bold text-[#10233f] mb-6">Drop Us a Message</h2>
              <ContactForm />
            </div>

          </div>

          {/* Map Embed */}
          <div className="mt-14">
            <h3 className="text-xl font-extrabold text-[#10233f] mb-4 text-center">Locate Us</h3>
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
