"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  admissionStatuses,
  contactStatuses,
  inquiryStatuses,
  newsletterStatuses,
} from "@/lib/admin/forms";
import { assertAdminRole, type AdminRole } from "@/lib/auth/roles";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const tableConfig = {
  admission_submissions: {
    statuses: admissionStatuses,
    path: "/admin/forms/admissions",
    roles: ["super_admin", "admin", "admissions"] satisfies AdminRole[],
  },
  contact_submissions: {
    statuses: contactStatuses,
    path: "/admin/forms/contacts",
    roles: ["super_admin", "admin", "admissions"] satisfies AdminRole[],
  },
  inquiry_submissions: {
    statuses: inquiryStatuses,
    path: "/admin/forms/inquiries",
    roles: ["super_admin", "admin", "admissions"] satisfies AdminRole[],
  },
  newsletter_subscribers: {
    statuses: newsletterStatuses,
    path: "/admin/forms/newsletter",
    roles: ["super_admin", "admin"] satisfies AdminRole[],
  },
} as const;

const statusUpdateSchema = z.object({
  id: z.uuid(),
  table: z.enum([
    "admission_submissions",
    "contact_submissions",
    "inquiry_submissions",
    "newsletter_subscribers",
  ]),
  status: z.string().min(1),
});

export async function updateSubmissionStatus(formData: FormData) {
  const parsed = statusUpdateSchema.safeParse({
    id: formData.get("id"),
    table: formData.get("table"),
    status: formData.get("status"),
  });

  if (!parsed.success) {
    throw new Error("Invalid status update.");
  }

  const config = tableConfig[parsed.data.table];

  if (!config.statuses.includes(parsed.data.status as never)) {
    throw new Error("Invalid status for this inbox.");
  }

  const profile = await assertAdminRole(config.roles);
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from(parsed.data.table)
    .update({ status: parsed.data.status })
    .eq("id", parsed.data.id);

  if (error) {
    throw new Error(error.message);
  }

  await supabase.from("audit_logs").insert({
    actor_id: profile.id,
    action: "update_form_status",
    entity_type: parsed.data.table,
    entity_id: parsed.data.id,
    metadata: { status: parsed.data.status },
  });

  revalidatePath(config.path);
  revalidatePath("/admin");
}
