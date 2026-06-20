"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  CalendarDays,
  FileText,
  GraduationCap,
  HeartHandshake,
  Home,
  Image as ImageIcon,
  Newspaper,
  Phone,
  Settings,
  ShieldCheck,
  Trophy
} from "lucide-react";
import { adminFormModules, adminModules, school } from "@/lib/site-data";

import { AdminProfile } from "@/lib/auth/roles";
import { logoutAction } from "@/app/login/actions";

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

export function AdminShell({
  children,
  profile
}: {
  children: React.ReactNode;
  profile: AdminProfile;
}) {
  const handleLogout = async () => {
    await logoutAction();
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <Link href="/admin" className="brand">
          <span className="brand-mark">
            <Image src={school.logo} alt="" fill sizes="66px" style={{ objectFit: "cover" }} />
          </span>
          <span className="brand-text">
            <span className="brand-name">EUREKA</span>
            <span className="brand-sub">Admin Panel</span>
          </span>
        </Link>

        <nav className="admin-nav" aria-label="Admin navigation">
          <Link href="/admin">
            <Home size={17} />
            Dashboard
          </Link>
          {adminModules.map((module) => {
            const Icon = adminIcons[module.icon as keyof typeof adminIcons];
            return (
              <Link href={module.href} key={module.label}>
                <Icon size={17} />
                {module.label}
              </Link>
            );
          })}
          {adminFormModules.map((module) => {
            const Icon = adminIcons[module.icon as keyof typeof adminIcons];
            return (
              <Link href={module.href} key={module.label}>
                <Icon size={17} />
                {module.label}
              </Link>
            );
          })}
          <Link href="/admin/settings">
            <Settings size={17} />
            Settings
          </Link>
          <Link href="/">
            <FileText size={17} />
            Public Site
          </Link>
        </nav>

        {profile ? (
          <div className="admin-user">
            <span>Logged in as:</span>
            <strong className="text-white font-bold block truncate">{profile.full_name}</strong>
            <span className="text-[10px] text-white/60 uppercase font-extrabold tracking-wider block -mt-1">
              {profile.role.replace("_", " ")}
            </span>
            <button onClick={handleLogout} className="hover:bg-white/10 hover:text-white transition">
              Sign out
            </button>
          </div>
        ) : null}
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
