import { isSupabaseConfigured } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import fs from "fs";
import path from "path";
import { cache } from "react";

export interface SchoolIdentity {
  name: string;
  shortName: string;
  motto: string;
  established: string;
  address: string;
  province: string;
  phone: string;
  email: string;
  students: string;
  levels: string;
  logo: string;
  heroImage: string;
  facebook_school: string;
  facebook_montessori: string;
  facebook_plus_two: string;
  whatsapp: string;
  hero_prefix: string;
  hero_title: string;
  hero_subtitle: string;
  office_hours: string;
}

export interface AdmissionStrip {
  label: string;
  href: string;
}

export interface SiteSettings {
  school_identity: SchoolIdentity;
  admission_strip: AdmissionStrip;
}

const LOCAL_FILE_PATH = path.join(process.cwd(), "lib", "settings-data.json");

// Helper to read local JSON fallback
export function readLocalSettings(): SiteSettings {
  try {
    if (!fs.existsSync(LOCAL_FILE_PATH)) {
      return {
        school_identity: {
          name: "Eureka Residential Secondary School",
          shortName: "Eureka",
          motto: "In Pursuit of Excellence",
          established: "2050 B.S. / 1994 A.D.",
          address: "Dharan-1, Laxmi Sadak, Sunsari",
          province: "Koshi Province, Nepal",
          phone: "+977-25-535533 / 578788",
          email: "eurekadharan@gmail.com",
          students: "1,600+",
          levels: "Montessori / Playgroup to Grade XII (+2)",
          logo: "/images/logo.png",
          heroImage: "/images/school building.jpg",
          facebook_school: "https://www.facebook.com/share/1R4ZBMcV4L/?mibextid=wwXIfr",
          facebook_montessori: "https://www.facebook.com/share/14d8ScrgzRt/?mibextid=wwXIfr",
          facebook_plus_two: "https://www.facebook.com/share/1Gg59m8NY1/?mibextid=wwXIfr",
          whatsapp: "https://wa.me/97725535533",
          hero_prefix: "Eureka Residential Secondary School • Dharan-1",
          hero_title: "Helping students pursue excellence with discipline and confidence",
          hero_subtitle: "From Montessori to Grade XII, Eureka blends strong academics, Project-Based Learning, technology, culture, and character formation.",
          office_hours: "Sunday - Friday: 9:00 AM - 4:00 PM"
        },
        admission_strip: {
          label: "New Admission 2083 (2026/27)",
          href: "/admission"
        }
      };
    }
    const fileContent = fs.readFileSync(LOCAL_FILE_PATH, "utf-8");
    return JSON.parse(fileContent);
  } catch (err) {
    console.error("Error reading local settings:", err);
    throw err;
  }
}

// Helper to write local JSON fallback
function writeLocalSettings(settings: SiteSettings): void {
  try {
    fs.writeFileSync(LOCAL_FILE_PATH, JSON.stringify(settings, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing local settings:", err);
  }
}

export const getSettings = cache(async (): Promise<SiteSettings> => {
  const local = readLocalSettings();
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value");

      if (error) throw error;

      if (data && data.length > 0) {
        const dbSettings: any = {};
        data.forEach((row) => {
          dbSettings[row.key] = typeof row.value === "string" ? JSON.parse(row.value) : row.value;
        });

        // Merge DB settings with local defaults to guarantee all fields are present
        const mergedSchoolIdentity = {
          ...local.school_identity,
          ...(dbSettings.school_identity || {})
        };
        const mergedAdmissionStrip = {
          ...local.admission_strip,
          ...(dbSettings.admission_strip || {})
        };

        return {
          school_identity: mergedSchoolIdentity,
          admission_strip: mergedAdmissionStrip
        };
      }
    } catch (err) {
      console.warn("Supabase settings query failed, falling back to local settings:", err);
    }
  }

  return local;
});

export async function saveSchoolIdentity(identity: Partial<SchoolIdentity>): Promise<SchoolIdentity> {
  const settings = await getSettings();
  const newIdentity = {
    ...settings.school_identity,
    ...identity
  };

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();
      const { error } = await supabase
        .from("site_settings")
        .upsert({ key: "school_identity", value: newIdentity }, { onConflict: "key" });

      if (error) throw error;
    } catch (err) {
      console.warn("Supabase school_identity save failed, falling back to local file:", err);
      throw err; // Propagate error so user gets UI feedback
    }
  }

  // Update local file fallback
  settings.school_identity = newIdentity;
  writeLocalSettings(settings);
  return newIdentity;
}

export async function saveAdmissionStrip(strip: Partial<AdmissionStrip>): Promise<AdmissionStrip> {
  const settings = await getSettings();
  const newStrip = {
    ...settings.admission_strip,
    ...strip
  };

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();
      const { error } = await supabase
        .from("site_settings")
        .upsert({ key: "admission_strip", value: newStrip }, { onConflict: "key" });

      if (error) throw error;
    } catch (err) {
      console.warn("Supabase admission_strip save failed, falling back to local file:", err);
      throw err;
    }
  }

  // Update local file fallback
  settings.admission_strip = newStrip;
  writeLocalSettings(settings);
  return newStrip;
}
