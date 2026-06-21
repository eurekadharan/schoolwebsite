"use client";

import { useState, useTransition } from "react";
import { 
  Phone, 
  Sparkles
} from "lucide-react";
import { SiteSettings } from "@/lib/settings-store";
import { adminSaveSchoolIdentity, adminSaveAdmissionStrip } from "./actions";

// Custom SVG Icons to avoid lucide version mismatches
interface IconProps {
  size?: number;
  className?: string;
}

const Building = ({ size = 16 }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
    <line x1="9" y1="22" x2="9" y2="16"/>
    <line x1="15" y1="22" x2="15" y2="16"/>
    <line x1="9" y1="16" x2="15" y2="16"/>
    <path d="M9 6h6M9 10h6M9 14h6"/>
  </svg>
);

const Share2 = ({ size = 16 }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"/>
    <circle cx="6" cy="12" r="3"/>
    <circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);

const Megaphone = ({ size = 16 }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19l7-7 3 3-7 7-3-3z"/>
    <path d="M18 13L5 22V2l13 9"/>
    <path d="M2 14h3"/>
  </svg>
);

const CheckCircle = ({ size = 18, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const AlertCircle = ({ size = 18, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

export default function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [activeTab, setActiveTab] = useState<"general" | "contact" | "social" | "hero" | "admission">("general");
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // General Identity State
  const [generalData, setGeneralData] = useState({
    name: settings.school_identity.name,
    shortName: settings.school_identity.shortName,
    motto: settings.school_identity.motto,
    established: settings.school_identity.established,
    students: settings.school_identity.students,
    levels: settings.school_identity.levels,
  });

  // Contact Info State
  const [contactData, setContactData] = useState({
    address: settings.school_identity.address,
    province: settings.school_identity.province || "Koshi Province, Nepal",
    phone: settings.school_identity.phone,
    email: settings.school_identity.email,
    office_hours: settings.school_identity.office_hours || "Sunday - Friday: 9:00 AM - 4:00 PM",
  });

  // Social Media State
  const [socialData, setSocialData] = useState({
    facebook_school: settings.school_identity.facebook_school,
    facebook_montessori: settings.school_identity.facebook_montessori,
    facebook_plus_two: settings.school_identity.facebook_plus_two,
    whatsapp: settings.school_identity.whatsapp,
  });

  // Homepage Hero State
  const [heroData, setHeroData] = useState({
    hero_prefix: settings.school_identity.hero_prefix,
    hero_title: settings.school_identity.hero_title,
    hero_subtitle: settings.school_identity.hero_subtitle,
  });

  // Admission Strip State
  const [admissionData, setAdmissionData] = useState({
    label: settings.admission_strip.label,
    href: settings.admission_strip.href,
  });

  const handleGeneralSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);
    startTransition(async () => {
      try {
        const formData = new FormData();
        Object.entries(generalData).forEach(([k, v]) => formData.append(k, v));
        // Append other fields so they are preserved
        Object.entries(contactData).forEach(([k, v]) => formData.append(k, v));
        Object.entries(socialData).forEach(([k, v]) => formData.append(k, v));
        Object.entries(heroData).forEach(([k, v]) => formData.append(k, v));

        await adminSaveSchoolIdentity(formData);
        setStatus({ type: "success", message: "General Settings saved successfully!" });
      } catch (err: any) {
        setStatus({ type: "error", message: err.message || "Failed to save settings." });
      }
    });
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);
    startTransition(async () => {
      try {
        const formData = new FormData();
        Object.entries(contactData).forEach(([k, v]) => formData.append(k, v));
        // Append other fields so they are preserved
        Object.entries(generalData).forEach(([k, v]) => formData.append(k, v));
        Object.entries(socialData).forEach(([k, v]) => formData.append(k, v));
        Object.entries(heroData).forEach(([k, v]) => formData.append(k, v));

        await adminSaveSchoolIdentity(formData);
        setStatus({ type: "success", message: "Contact details saved successfully!" });
      } catch (err: any) {
        setStatus({ type: "error", message: err.message || "Failed to save settings." });
      }
    });
  };

  const handleSocialSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);
    startTransition(async () => {
      try {
        const formData = new FormData();
        Object.entries(socialData).forEach(([k, v]) => formData.append(k, v));
        // Append other fields so they are preserved
        Object.entries(generalData).forEach(([k, v]) => formData.append(k, v));
        Object.entries(contactData).forEach(([k, v]) => formData.append(k, v));
        Object.entries(heroData).forEach(([k, v]) => formData.append(k, v));

        await adminSaveSchoolIdentity(formData);
        setStatus({ type: "success", message: "Social media settings saved successfully!" });
      } catch (err: any) {
        setStatus({ type: "error", message: err.message || "Failed to save settings." });
      }
    });
  };

  const handleHeroSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);
    startTransition(async () => {
      try {
        const formData = new FormData();
        Object.entries(heroData).forEach(([k, v]) => formData.append(k, v));
        // Append other fields so they are preserved
        Object.entries(generalData).forEach(([k, v]) => formData.append(k, v));
        Object.entries(contactData).forEach(([k, v]) => formData.append(k, v));
        Object.entries(socialData).forEach(([k, v]) => formData.append(k, v));

        await adminSaveSchoolIdentity(formData);
        setStatus({ type: "success", message: "Homepage Hero text saved successfully!" });
      } catch (err: any) {
        setStatus({ type: "error", message: err.message || "Failed to save settings." });
      }
    });
  };

  const handleAdmissionSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);
    startTransition(async () => {
      try {
        const formData = new FormData();
        Object.entries(admissionData).forEach(([k, v]) => formData.append(k, v));

        await adminSaveAdmissionStrip(formData);
        setStatus({ type: "success", message: "Admission strip settings saved successfully!" });
      } catch (err: any) {
        setStatus({ type: "error", message: err.message || "Failed to save settings." });
      }
    });
  };

  const tabClass = (tab: typeof activeTab) => `
    flex items-center gap-2.5 px-4.5 py-3.5 text-sm font-bold border-b-2 transition-all cursor-pointer
    ${activeTab === tab 
      ? "border-[#ff7b3b] text-[#ff7b3b] bg-slate-50/50" 
      : "border-transparent text-gray-500 hover:text-[#10233f] hover:border-gray-200"}
  `;

  return (
    <div className="w-full max-w-4xl bg-white border border-slate-100 rounded-xl shadow-eureka overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex flex-wrap border-b border-slate-100 bg-slate-50/20" role="tablist">
        <button className={tabClass("general")} onClick={() => { setActiveTab("general"); setStatus(null); }}>
          <Building size={16} /> General School
        </button>
        <button className={tabClass("contact")} onClick={() => { setActiveTab("contact"); setStatus(null); }}>
          <Phone size={16} /> Contact Info
        </button>
        <button className={tabClass("social")} onClick={() => { setActiveTab("social"); setStatus(null); }}>
          <Share2 size={16} /> Social Media
        </button>
        <button className={tabClass("hero")} onClick={() => { setActiveTab("hero"); setStatus(null); }}>
          <Sparkles size={16} /> Homepage Hero
        </button>
        <button className={tabClass("admission")} onClick={() => { setActiveTab("admission"); setStatus(null); }}>
          <Megaphone size={16} /> Admission Strip
        </button>
      </div>

      {/* Form Content */}
      <div className="p-6 md:p-8">
        {/* Status Indicators */}
        {status && (
          <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 text-sm font-bold border transition ${
            status.type === "success" 
              ? "bg-green-50 border-green-100 text-green-800" 
              : "bg-red-50 border-red-100 text-red-800"
          }`}>
            {status.type === "success" ? <CheckCircle size={18} className="shrink-0 mt-0.5" /> : <AlertCircle size={18} className="shrink-0 mt-0.5" />}
            <span>{status.message}</span>
          </div>
        )}

        {/* Tab 1: General School Details */}
        {activeTab === "general" && (
          <form onSubmit={handleGeneralSubmit} className="space-y-6">
            <h2 className="text-lg font-black text-[#10233f]">School Profile Settings</h2>
            <p className="text-xs text-gray-400 -mt-4">Basic attributes of the school used across headlines, SEO tags, and about pages.</p>
            <div className="form-grid">
              <label>
                School Full Name
                <input 
                  type="text" 
                  value={generalData.name} 
                  onChange={(e) => setGeneralData({ ...generalData, name: e.target.value })} 
                  required 
                />
              </label>
              <label>
                Short Name
                <input 
                  type="text" 
                  value={generalData.shortName} 
                  onChange={(e) => setGeneralData({ ...generalData, shortName: e.target.value })} 
                  required 
                />
              </label>
              <label>
                Motto
                <input 
                  type="text" 
                  value={generalData.motto} 
                  onChange={(e) => setGeneralData({ ...generalData, motto: e.target.value })} 
                />
              </label>
              <label>
                Established Date (B.S. / A.D.)
                <input 
                  type="text" 
                  value={generalData.established} 
                  onChange={(e) => setGeneralData({ ...generalData, established: e.target.value })} 
                />
              </label>
              <label>
                Total Students Count
                <input 
                  type="text" 
                  value={generalData.students} 
                  onChange={(e) => setGeneralData({ ...generalData, students: e.target.value })} 
                />
              </label>
              <label>
                Levels Offered
                <input 
                  type="text" 
                  value={generalData.levels} 
                  onChange={(e) => setGeneralData({ ...generalData, levels: e.target.value })} 
                />
              </label>
            </div>
            <div className="flex justify-end pt-4 border-t border-slate-50">
              <button className="btn btn-primary min-w-[140px]" type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save Profile"}
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Contact Info */}
        {activeTab === "contact" && (
          <form onSubmit={handleContactSubmit} className="space-y-6">
            <h2 className="text-lg font-black text-[#10233f]">Contact Information Settings</h2>
            <p className="text-xs text-gray-400 -mt-4">Update contact information rendered in headers, footers, and the contact page.</p>
            <div className="form-grid">
              <label className="col-span-2">
                School Address
                <input 
                  type="text" 
                  value={contactData.address} 
                  onChange={(e) => setContactData({ ...contactData, address: e.target.value })} 
                  required 
                />
              </label>
              <label>
                Province & Region
                <input 
                  type="text" 
                  value={contactData.province} 
                  onChange={(e) => setContactData({ ...contactData, province: e.target.value })} 
                  required 
                />
              </label>
              <label>
                Office Hours
                <input 
                  type="text" 
                  value={contactData.office_hours} 
                  onChange={(e) => setContactData({ ...contactData, office_hours: e.target.value })} 
                  required 
                />
              </label>
              <label>
                Phone Numbers (use &apos;/&apos; to separate multiple numbers)
                <input 
                  type="text" 
                  value={contactData.phone} 
                  onChange={(e) => setContactData({ ...contactData, phone: e.target.value })} 
                  required 
                />
              </label>
              <label>
                Email Address
                <input 
                  type="email" 
                  value={contactData.email} 
                  onChange={(e) => setContactData({ ...contactData, email: e.target.value })} 
                  required 
                />
              </label>
            </div>
            <div className="flex justify-end pt-4 border-t border-slate-50">
              <button className="btn btn-primary min-w-[140px]" type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save Contact Info"}
              </button>
            </div>
          </form>
        )}

        {/* Tab 3: Social Media Links */}
        {activeTab === "social" && (
          <form onSubmit={handleSocialSubmit} className="space-y-6">
            <h2 className="text-lg font-black text-[#10233f]">Social Media Channels</h2>
            <p className="text-xs text-gray-400 -mt-4">Links to official social network channels with corresponding icons displayed on site.</p>
            <div className="space-y-4">
              <label className="grid gap-1 text-sm font-bold text-[#10233f]">
                School Official Facebook Page
                <input 
                  className="min-h-[42px] border border-slate-200 bg-white rounded-lg px-4 text-[#2e2c2c] outline-none focus:ring-2 focus:ring-[#3eaea6]"
                  type="url" 
                  value={socialData.facebook_school} 
                  onChange={(e) => setSocialData({ ...socialData, facebook_school: e.target.value })} 
                  placeholder="https://facebook.com/..."
                />
              </label>
              <label className="grid gap-1 text-sm font-bold text-[#10233f]">
                Montessori Wing Facebook Page
                <input 
                  className="min-h-[42px] border border-slate-200 bg-white rounded-lg px-4 text-[#2e2c2c] outline-none focus:ring-2 focus:ring-[#3eaea6]"
                  type="url" 
                  value={socialData.facebook_montessori} 
                  onChange={(e) => setSocialData({ ...socialData, facebook_montessori: e.target.value })} 
                  placeholder="https://facebook.com/..."
                />
              </label>
              <label className="grid gap-1 text-sm font-bold text-[#10233f]">
                +2 Wing Facebook Page
                <input 
                  className="min-h-[42px] border border-slate-200 bg-white rounded-lg px-4 text-[#2e2c2c] outline-none focus:ring-2 focus:ring-[#3eaea6]"
                  type="url" 
                  value={socialData.facebook_plus_two} 
                  onChange={(e) => setSocialData({ ...socialData, facebook_plus_two: e.target.value })} 
                  placeholder="https://facebook.com/..."
                />
              </label>
              <label className="grid gap-1 text-sm font-bold text-[#10233f]">
                WhatsApp Link or Number
                <input 
                  className="min-h-[42px] border border-slate-200 bg-white rounded-lg px-4 text-[#2e2c2c] outline-none focus:ring-2 focus:ring-[#3eaea6]"
                  type="text" 
                  value={socialData.whatsapp} 
                  onChange={(e) => setSocialData({ ...socialData, whatsapp: e.target.value })} 
                  placeholder="https://wa.me/..."
                />
              </label>
            </div>
            <div className="flex justify-end pt-4 border-t border-slate-50">
              <button className="btn btn-primary min-w-[140px]" type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save Social Media"}
              </button>
            </div>
          </form>
        )}

        {/* Tab 4: Homepage Hero Copy */}
        {activeTab === "hero" && (
          <form onSubmit={handleHeroSubmit} className="space-y-6">
            <h2 className="text-lg font-black text-[#10233f]">Homepage Hero Copy</h2>
            <p className="text-xs text-gray-400 -mt-4">Update the hero text at the top of the homepage to keep it dynamic and engaging.</p>
            <div className="space-y-4">
              <label className="grid gap-1 text-sm font-bold text-[#10233f]">
                Hero Category/Prefix (appears in orange/black top strip)
                <input 
                  className="min-h-[42px] border border-slate-200 bg-white rounded-lg px-4 text-[#2e2c2c] outline-none focus:ring-2 focus:ring-[#3eaea6]"
                  type="text" 
                  value={heroData.hero_prefix} 
                  onChange={(e) => setHeroData({ ...heroData, hero_prefix: e.target.value })} 
                />
              </label>
              <label className="grid gap-1 text-sm font-bold text-[#10233f]">
                Hero Title Headline
                <textarea 
                  className="min-h-[90px] border border-slate-200 bg-white rounded-lg px-4 py-3 text-[#2e2c2c] outline-none focus:ring-2 focus:ring-[#3eaea6] resize-y"
                  value={heroData.hero_title} 
                  onChange={(e) => setHeroData({ ...heroData, hero_title: e.target.value })} 
                  required
                />
              </label>
              <label className="grid gap-1 text-sm font-bold text-[#10233f]">
                Hero Subtitle Description
                <textarea 
                  className="min-h-[120px] border border-slate-200 bg-white rounded-lg px-4 py-3 text-[#2e2c2c] outline-none focus:ring-2 focus:ring-[#3eaea6] resize-y"
                  value={heroData.hero_subtitle} 
                  onChange={(e) => setHeroData({ ...heroData, hero_subtitle: e.target.value })} 
                  required
                />
              </label>
            </div>
            <div className="flex justify-end pt-4 border-t border-slate-50">
              <button className="btn btn-primary min-w-[140px]" type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save Hero Text"}
              </button>
            </div>
          </form>
        )}

        {/* Tab 5: Admission Strip */}
        {activeTab === "admission" && (
          <form onSubmit={handleAdmissionSubmit} className="space-y-6">
            <h2 className="text-lg font-black text-[#10233f]">Admission Notification Bar</h2>
            <p className="text-xs text-gray-400 -mt-4">Controls the text and link for the announcement bar shown on top of public screens.</p>
            <div className="form-grid">
              <label>
                Notification Label
                <input 
                  type="text" 
                  value={admissionData.label} 
                  onChange={(e) => setAdmissionData({ ...admissionData, label: e.target.value })} 
                  required 
                />
              </label>
              <label>
                Notification Link
                <input 
                  type="text" 
                  value={admissionData.href} 
                  onChange={(e) => setAdmissionData({ ...admissionData, href: e.target.value })} 
                  required 
                />
              </label>
            </div>
            <div className="flex justify-end pt-4 border-t border-slate-50">
              <button className="btn btn-primary min-w-[140px]" type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save Admission Strip"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
