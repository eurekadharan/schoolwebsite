"use client";

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
import { adminFormModules, adminModules } from "@/lib/site-data";

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
        {adminFormModules.map((module) => {
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
        {adminModules.slice(0, 6).map((module) => {
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
