"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { updatePage } from "@/lib/pages-store";

export async function adminUpdateAboutPage(formData: FormData) {
  const vision = String(formData.get("vision") || "").trim();
  const mission = String(formData.get("mission") || "").trim();
  const motto = String(formData.get("motto") || "").trim();

  // History paragraphs
  const history1 = String(formData.get("history_p1") || "").trim();
  const history2 = String(formData.get("history_p2") || "").trim();
  const history3 = String(formData.get("history_p3") || "").trim();
  const history_paragraphs = [history1, history2, history3].filter(Boolean);

  // Principal message
  const principal_name = String(formData.get("principal_name") || "").trim();
  const principal_qualification = String(formData.get("principal_qualification") || "").trim();
  const principal_image = String(formData.get("principal_image") || "").trim();
  const principal_p1 = String(formData.get("principal_p1") || "").trim();
  const principal_p2 = String(formData.get("principal_p2") || "").trim();
  const principal_p3 = String(formData.get("principal_p3") || "").trim();
  const principal_message_paragraphs = [principal_p1, principal_p2, principal_p3].filter(Boolean);

  // Secondary Coordinator
  const coord_sec_name = String(formData.get("coord_sec_name") || "").trim();
  const coord_sec_qualification = String(formData.get("coord_sec_qualification") || "").trim();
  const coord_sec_image = String(formData.get("coord_sec_image") || "").trim();
  const coord_sec_p1 = String(formData.get("coord_sec_p1") || "").trim();
  const coord_sec_p2 = String(formData.get("coord_sec_p2") || "").trim();
  const coord_sec_message_paragraphs = [coord_sec_p1, coord_sec_p2].filter(Boolean);

  // Basic Coordinator
  const coord_bas_name = String(formData.get("coord_bas_name") || "").trim();
  const coord_bas_qualification = String(formData.get("coord_bas_qualification") || "").trim();
  const coord_bas_image = String(formData.get("coord_bas_image") || "").trim();
  const coord_bas_p1 = String(formData.get("coord_bas_p1") || "").trim();
  const coord_bas_p2 = String(formData.get("coord_bas_p2") || "").trim();
  const coord_bas_message_paragraphs = [coord_bas_p1, coord_bas_p2].filter(Boolean);

  const updatedBody = {
    vision,
    mission,
    motto,
    history_paragraphs,
    principal: {
      name: principal_name,
      qualification: principal_qualification,
      image_url: principal_image || "/images/principal.jpg",
      message_paragraphs: principal_message_paragraphs
    },
    coordinators: [
      {
        name: coord_sec_name,
        role: "Secondary Level Coordinator",
        qualification: coord_sec_qualification,
        image_url: coord_sec_image || "/images/bijay kumar shrestha.png",
        level_label: "Secondary Level (Grade 9 - 12)",
        message_paragraphs: coord_sec_message_paragraphs
      },
      {
        name: coord_bas_name,
        role: "Basic Level Coordinator",
        qualification: coord_bas_qualification,
        image_url: coord_bas_image || "/images/bhuwan sanjel.jpeg",
        level_label: "Basic Level (Montessori - Grade 8)",
        message_paragraphs: coord_bas_message_paragraphs
      }
    ]
  };

  await updatePage("about", {
    body: updatedBody
  });

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/admin/pages");
  redirect("/admin/pages");
}
