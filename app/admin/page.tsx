"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  CalendarDays,
  FileText,
  GraduationCap,
  HeartHandshake,
  Image as ImageIcon,
  Newspaper,
  Phone,
  ShieldCheck,
  Trophy
} from "lucide-react";
import { getAdminDashboardCountsAction } from "@/app/admin/pages/actions";

const adminIcons = {
  image: ImageIcon,
  file: FileText,
  newspaper: Newspaper,
  shield: ShieldCheck,
  calendar: CalendarDays,
  trophy: Trophy,
  book: BookOpen,
  graduation: GraduationCap,
  phone: Phone,
  heart: HeartHandshake
};

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState({
    admissions: 0,
    contacts: 0,
    inquiries: 0,
    banners: 0,
    pages: 0,
    blogs: 0,
    notices: 0,
    events: 0,
    achievements: 0,
    gallery: 0,
    media: 0
  });

  useEffect(() => {
    getAdminDashboardCountsAction()
      .then((data) => {
        setCounts(data);
      })
      .catch((err) => {
        console.error("Failed to load counts:", err);
      });
  }, []);

  // Define modules using actual counts
  const formModules = [
    { label: "Admissions", href: "/admin/forms/admissions", icon: "graduation", count: counts.admissions },
    { label: "Contacts", href: "/admin/forms/contacts", icon: "phone", count: counts.contacts },
    { label: "Inquiries", href: "/admin/forms/inquiries", icon: "heart", count: counts.inquiries }
  ];

  const contentModules = [
    { label: "Banners", href: "/admin/banners", icon: "image", count: counts.banners },
    { label: "Pages", href: "/admin/pages", icon: "file", count: counts.pages },
    { label: "Blogs", href: "/admin/blogs", icon: "newspaper", count: counts.blogs },
    { label: "Notices", href: "/admin/notices", icon: "shield", count: counts.notices },
    { label: "Events", href: "/admin/events", icon: "calendar", count: counts.events },
    { label: "Hall of Fame", href: "/admin/hall-of-fame", icon: "trophy", count: counts.achievements },
    { label: "Gallery", href: "/admin/gallery", icon: "image", count: counts.gallery },
    { label: "Media", href: "/admin/media", icon: "image", count: counts.media }
  ];

  return (
    <>
      <div className="admin-topbar">
        <div>
          <span className="eyebrow">Admin</span>
          <h1>Eureka Dashboard</h1>
          <p>Manage banners, pages, posts, notices, events, achievements, media, forms, and settings.</p>
        </div>
        <Link className="btn btn-primary" href="/admin/banners">
          Add Banner
        </Link>
      </div>

      <section className="admin-grid">
        {formModules.map((module) => {
          const Icon = adminIcons[module.icon as keyof typeof adminIcons];
          return (
            <Link className="admin-card" href={module.href} key={module.label}>
              <Icon size={24} />
              <h2>{module.label}</h2>
              <p>New and open form submissions.</p>
              <strong>{module.count}</strong>
            </Link>
          );
        })}
      </section>

      <section className="admin-grid" style={{ marginTop: 18 }}>
        {contentModules.slice(0, 7).map((module) => {
          const Icon = adminIcons[module.icon as keyof typeof adminIcons];
          return (
            <Link className="admin-card" href={module.href} key={module.label}>
              <Icon size={24} />
              <h3>{module.label}</h3>
              <p>Manage {module.label.toLowerCase()} content and publishing status.</p>
              <strong>{module.count}</strong>
            </Link>
          );
        })}
      </section>
    </>
  );
}
