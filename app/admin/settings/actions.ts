"use server";

import { saveSchoolIdentity, saveAdmissionStrip } from "@/lib/settings-store";
import { revalidatePath } from "next/cache";

export async function adminSaveSchoolIdentity(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const shortName = String(formData.get("shortName") || "").trim();
  const motto = String(formData.get("motto") || "").trim();
  const established = String(formData.get("established") || "").trim();
  const address = String(formData.get("address") || "").trim();
  const province = String(formData.get("province") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const students = String(formData.get("students") || "").trim();
  const levels = String(formData.get("levels") || "").trim();
  
  const facebook_school = String(formData.get("facebook_school") || "").trim();
  const facebook_montessori = String(formData.get("facebook_montessori") || "").trim();
  const facebook_plus_two = String(formData.get("facebook_plus_two") || "").trim();
  const whatsapp = String(formData.get("whatsapp") || "").trim();

  const hero_prefix = String(formData.get("hero_prefix") || "").trim();
  const hero_title = String(formData.get("hero_title") || "").trim();
  const hero_subtitle = String(formData.get("hero_subtitle") || "").trim();
  const office_hours = String(formData.get("office_hours") || "").trim();

  if (!name || !address || !phone || !email) {
    throw new Error("School Name, Address, Phone, and Email are required.");
  }

  await saveSchoolIdentity({
    name,
    shortName,
    motto,
    established,
    address,
    province,
    phone,
    email,
    students,
    levels,
    facebook_school,
    facebook_montessori,
    facebook_plus_two,
    whatsapp,
    hero_prefix,
    hero_title,
    hero_subtitle,
    office_hours
  });

  revalidatePath("/");
  revalidatePath("/contact");
  revalidatePath("/about");
}

export async function adminSaveAdmissionStrip(formData: FormData) {
  const label = String(formData.get("label") || "").trim();
  const href = String(formData.get("href") || "").trim();

  if (!label || !href) {
    throw new Error("Label and Link are required.");
  }

  await saveAdmissionStrip({ label, href });

  revalidatePath("/");
  revalidatePath("/about");
}
