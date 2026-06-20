"use client";

import Image from "next/image";
import Link from "next/link";
import { type FormEvent, useState } from "react";
import { Camera, MessageCircle, Newspaper, Users } from "lucide-react";
import { navItems, school } from "@/lib/site-data";

export function NewsletterStrip() {
  const [status, setStatus] = useState("");

  async function submitNewsletter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus("Submitting...");

    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData.entries()))
    });

    setStatus(response.ok ? "Subscribed successfully." : "Please enter a valid email.");
    if (response.ok) form.reset();
  }

  return (
    <section className="bg-[#d9fffc] py-7" aria-label="Newsletter">
      <div className="mx-auto grid max-w-[1140px] grid-cols-[150px_1fr_420px] items-center gap-7 px-4 max-lg:grid-cols-2 max-md:grid-cols-1">
        <div className="relative h-20 w-32">
          <Image src={school.logo} alt="Eureka logo" fill sizes="128px" className="object-contain" />
        </div>
        <div>
          <h2 className="m-0 text-3xl font-bold text-white drop-shadow-sm max-md:text-[#2e2c2c]">Join our Newsletter</h2>
          <p className="m-0 text-[#4b4b4b]">Subscribe to get latest updates, notices, news, and admission information.</p>
          {status ? <p className="mt-2 text-sm font-bold text-[#3eaea6]">{status}</p> : null}
        </div>
        <form className="flex gap-2 max-md:flex-col" onSubmit={submitNewsletter}>
          <input className="min-h-11 min-w-0 flex-1 border-0 bg-white px-4 text-[#2e2c2c] outline-none focus:ring-2 focus:ring-[#3eaea6]" type="email" name="email" placeholder="Email" required />
          <button className="min-h-11 bg-[#ff7b3b] px-5 text-xs font-bold uppercase text-white transition hover:bg-[#3eaea6]" type="submit">
            Subscribe Now
          </button>
        </form>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#2b2e3d] text-white">
      <div className="mx-auto grid max-w-[1140px] grid-cols-[1.25fr_.85fr_1fr_1.2fr] gap-9 px-4 py-14 max-lg:grid-cols-2 max-md:grid-cols-1">
        <div>
          <h3 className="mb-3 text-lg font-bold">About</h3>
          <p className="text-sm text-white/75">Forge your path forward with Eureka Residential Secondary School.</p>
          <p className="text-sm text-white/75">
            Eureka was established in 2050 B.S. / 1994 A.D. to provide disciplined, modern,
            activity-based education from Montessori to Grade XII in Dharan.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-bold">Quick Links</h3>
          <p className="text-sm text-white/75">Our important links</p>
          <ul className="mt-3 grid gap-2 text-sm text-white/75">
            {navItems.slice(1, 7).map((item) => (
              <li key={item.label}>
                <Link className="hover:text-[#ff7b3b]" href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-bold">Connect With Us</h3>
          <p className="text-sm text-white/75">Feel free to contact us for admissions, programs, hostel, transport, and school information.</p>
          <div className="mt-4 flex gap-2" aria-label="Social links">
            {[
              { icon: Users, href: "/", label: "Community" },
              { icon: Newspaper, href: "/news", label: "News" },
              { icon: Camera, href: "/gallery", label: "Gallery" },
              { icon: MessageCircle, href: "https://wa.me/97725535533", label: "WhatsApp" }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link className="grid h-9 w-9 place-items-center rounded-full bg-[#3eaea6] text-white hover:bg-[#ff7b3b]" href={item.href} aria-label={item.label} key={item.label}>
                  <Icon size={17} />
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-bold">Our Contacts & Locations</h3>
          <p className="text-sm text-white/75">Empowering students to lead tomorrow&apos;s world. Join us on the Eureka journey today.</p>
          <div className="mt-4 border-t border-white/15 pt-4">
            <h3 className="mb-2 text-lg font-bold">Dharan School</h3>
            <p className="text-sm text-white/75">{school.address}</p>
            <p className="text-sm text-white/75">{school.email}</p>
            <p className="text-sm text-white/75">{school.phone}</p>
          </div>
          <div className="mt-4 overflow-hidden rounded border border-white/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.178454099108!2d85.30071787546865!3d27.74264127616226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18cfd52af84f%3A0xd2aaab154f359e60!2sEureka%20High%20School!5e0!3m2!1sen!2snp!4v1781941516157!5m2!1sen!2snp"
              width="100%"
              height="150"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[1140px] border-t border-white/15 px-4 py-4 text-xs text-white/70">
        © 2026 All Rights Reserved by {school.shortName}
      </div>
    </footer>
  );
}
