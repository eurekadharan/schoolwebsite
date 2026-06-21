"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { navItems, school } from "@/lib/site-data";
import type { SchoolIdentity, AdmissionStrip } from "@/lib/settings-store";

interface SiteHeaderProps {
  settings?: SchoolIdentity;
  admissionStrip?: AdmissionStrip;
}

export function SiteHeader({ settings, admissionStrip }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const schoolData = settings ? { ...school, ...settings } : school;

  return (
    <header className="sticky top-0 z-50 w-full shadow-[0_8px_22px_rgba(0,0,0,.05)]">
      {admissionStrip && (
        <div className="admission-strip">
          <Link href={admissionStrip.href} onClick={() => setOpen(false)}>
            {admissionStrip.label}
          </Link>
        </div>
      )}
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[80] focus:bg-[#2e2c2c] focus:px-4 focus:py-2 focus:text-white"
        href="#content"
      >
        Skip to content
      </a>

      {/* Top Row: Identity and Contacts (Desktop) / Main Row (Mobile) */}
      <div className="bg-[#eefbf9] border-b border-[#d2f3ee]">
        <div className="mx-auto flex h-[80px] max-w-[1200px] items-center justify-between px-4 lg:px-6">
          {/* Logo and Identity */}
          <Link href="/" className="flex items-center gap-3" aria-label="Eureka home">
            <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full border-2 border-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] bg-white flex items-center justify-center">
              <Image
                src={schoolData.logo}
                alt="Eureka logo"
                fill
                sizes="56px"
                className="object-contain p-1"
                priority
              />
            </div>
            <div className="grid leading-none">
              <strong className="text-xl font-black uppercase text-[#083f73] tracking-tight sm:text-2xl">
                {schoolData.shortName}
              </strong>
              <span className="text-[10px] font-extrabold uppercase tracking-wide text-gray-600 sm:text-xs">
                Residential Secondary School
              </span>
              <span className="mt-0.5 text-[9px] font-bold text-[#ff7b3b] uppercase tracking-wider">
                {schoolData.motto}
              </span>
            </div>
          </Link>

          {/* Contact Details and Enquire Now CTA (Desktop only) */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-2 text-[#083f73]">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3eaea6]/10 text-[#3eaea6]">
                <svg
                  className="h-4.5 w-4.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.802-5.14-4.117-6.942-6.942l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 leading-none">
                  Call Us
                </span>
                <span className="text-xs font-bold leading-tight mt-0.5">{schoolData.phone.split(" / ")[0]}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[#083f73]">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3eaea6]/10 text-[#3eaea6]">
                <svg
                  className="h-4.5 w-4.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5A2.25 2.25 0 012.25 17.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 leading-none">
                  Email Us
                </span>
                <span className="text-xs font-bold leading-tight mt-0.5">{schoolData.email}</span>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex h-[44px] items-center gap-2 rounded-lg bg-[#3eaea6] px-5 text-xs font-bold uppercase text-white shadow-sm transition hover:bg-[#30a39a]"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 18.97a5.969 5.969 0 01-.75-3.043 8.978 8.978 0 012.29-5.704C8.32 7.29 12.35 4.5 17.3 4.5c4.97 0 9 3.694 9 8.25z"
                />
              </svg>
              Enquire Now
            </Link>
          </div>

          {/* Hamburger (Mobile only) */}
          <button
            className="inline-grid h-10 w-10 place-items-center rounded-lg bg-[#ff7b3b] text-white transition hover:bg-[#e05b1c] lg:hidden"
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Bottom Row: Full-width Navigation Bar (Desktop only) */}
      <div className="hidden lg:block bg-[#ff7b3b]">
        <nav className="mx-auto flex max-w-[1200px] items-stretch justify-start px-2" aria-label="Primary navigation">
          {navItems.map((item) => {
            const isHome = item.href === "/";
            const isActive = isHome ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <div className="group relative flex" key={item.label}>
                <Link
                  className={`inline-flex min-h-[48px] items-center justify-center gap-1 px-3.5 text-[13px] font-bold text-white transition hover:bg-black/10 ${
                    isActive ? "bg-black/15" : ""
                  }`}
                  href={item.href}
                >
                  {item.label}
                  {item.children ? <ChevronDown size={14} className="opacity-80" aria-hidden="true" /> : null}
                </Link>

                {item.children ? (
                  <div className="invisible absolute left-0 top-full z-[100] min-w-[240px] translate-y-2 border-t-[3px] border-[#ff7b3b] bg-white p-1.5 opacity-0 shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.children.map((child) => (
                      <Link
                        className="block rounded px-3 py-2 text-xs font-semibold text-[#0c3966] hover:bg-[#eefbf9] hover:text-[#ff7b3b]"
                        href={child.href}
                        key={child.label}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer Navigation (Mobile only) */}
      <div
        className={`fixed inset-y-0 right-0 z-[70] w-[min(380px,85vw)] overflow-y-auto bg-gradient-to-b from-[#1b625d] to-[#0c3966] px-6 pb-8 pt-20 text-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button in Drawer */}
        <button
          className="absolute right-4 top-4 inline-grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          type="button"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
        >
          <X size={20} />
        </button>

        <div className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isHome = item.href === "/";
            const isActive = isHome ? pathname === "/" : pathname.startsWith(item.href);

            return item.children ? (
              <details className="border-b border-white/15 py-1" key={item.label}>
                <summary className="flex min-h-11 cursor-pointer items-center justify-between text-sm font-bold text-white hover:text-[#ff7b3b]">
                  <span className={isActive ? "text-[#ff7b3b]" : ""}>{item.label}</span>
                  <ChevronDown size={14} className="opacity-80" />
                </summary>
                <div className="pl-4 pb-2 flex flex-col gap-1">
                  <Link
                    className="block py-2 text-xs font-bold text-white/80 hover:text-white"
                    href={item.href}
                    onClick={() => setOpen(false)}
                  >
                    All {item.label}
                  </Link>
                  {item.children.map((child) => (
                    <Link
                      className="block py-2 text-xs font-semibold text-white/80 hover:text-white border-l-2 border-[#ff7b3b]/30 pl-2 hover:border-[#ff7b3b]"
                      href={child.href}
                      key={child.label}
                      onClick={() => setOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </details>
            ) : (
              <Link
                className={`flex min-h-12 items-center border-b border-white/15 text-sm font-bold transition hover:text-[#ff7b3b] ${
                  isActive ? "text-[#ff7b3b]" : "text-white"
                }`}
                href={item.href}
                key={item.label}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Drawer CTAs */}
        <div className="mt-8 flex flex-col gap-3">
          <Link
            className="flex min-h-11 items-center justify-center rounded-lg bg-[#ff7b3b] px-5 text-xs font-bold uppercase text-white transition hover:bg-[#e05b1c]"
            href="/contact"
            onClick={() => setOpen(false)}
          >
            Enquire Now
          </Link>
          <div className="flex flex-col gap-1 text-center text-[10px] text-white/60 mt-4 border-t border-white/10 pt-4">
            <span>{schoolData.phone}</span>
            <span>{schoolData.email}</span>
          </div>
        </div>
      </div>

      {/* Drawer Overlay (Mobile only) */}
      {open ? (
        <button
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm lg:hidden transition-opacity"
          aria-label="Close navigation overlay"
          onClick={() => setOpen(false)}
        />
      ) : null}
    </header>
  );
}

