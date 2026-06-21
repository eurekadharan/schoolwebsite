"use client";

import Image from "next/image";
import Link from "next/link";
import { type FormEvent, useState } from "react";
import { Camera, MessageCircle, Newspaper, Users, MapPin, Phone } from "lucide-react";
import { navItems, school } from "@/lib/site-data";

const MailIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const FacebookIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);


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
      <div className="mx-auto grid max-w-[1140px] grid-cols-[1.25fr_.85fr_1fr] gap-9 px-4 py-10 max-md:grid-cols-1">
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
          <p className="text-sm text-white/75 mb-4">Feel free to contact us for admissions, programs, hostel, transport, and school information.</p>
          
          <ul className="grid gap-2 text-sm text-white/75 mb-4" aria-label="Contact info">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="text-[#3eaea6] mt-0.5 shrink-0" />
              <span>{school.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-[#3eaea6] shrink-0" />
              <a className="hover:text-[#ff7b3b]" href="tel:+97725535533">{school.phone}</a>
            </li>
            <li className="flex items-center gap-2">
              <MailIcon size={16} className="text-[#3eaea6] shrink-0" />
              <a className="hover:text-[#ff7b3b]" href={`mailto:${school.email}`}>{school.email}</a>
            </li>
          </ul>

          <div className="mt-4 border-t border-white/10 pt-4 mb-4" aria-label="Facebook Pages">
            <h4 className="text-xs uppercase font-black text-white/50 tracking-wider mb-2">Our Facebook Pages</h4>
            <ul className="grid gap-2 text-sm text-white/75">
              <li className="flex items-center gap-2">
                <FacebookIcon size={16} className="text-[#3eaea6] shrink-0" />
                <a className="hover:text-[#ff7b3b]" href="https://www.facebook.com/share/1R4ZBMcV4L/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">School Official</a>
              </li>
              <li className="flex items-center gap-2">
                <FacebookIcon size={16} className="text-[#3eaea6] shrink-0" />
                <a className="hover:text-[#ff7b3b]" href="https://www.facebook.com/share/14d8ScrgzRt/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">Montessori Wing</a>
              </li>
              <li className="flex items-center gap-2">
                <FacebookIcon size={16} className="text-[#3eaea6] shrink-0" />
                <a className="hover:text-[#ff7b3b]" href="https://www.facebook.com/share/1Gg59m8NY1/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">+2 Wing</a>
              </li>
            </ul>
          </div>

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
      </div>
      <div className="mx-auto max-w-[1140px] border-t border-white/15 px-4 py-4 text-xs text-white/70">
        © 2026 All Rights Reserved by {school.shortName}
      </div>
    </footer>
  );
}
