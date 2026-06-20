import { createSupabaseServerClient } from "@/lib/supabase/server";

export const admissionStatuses = [
  "new",
  "contacted",
  "scheduled",
  "admitted",
  "rejected",
  "archived",
] as const;

export const contactStatuses = ["new", "replied", "archived"] as const;

export const inquiryStatuses = [
  "new",
  "contacted",
  "follow_up",
  "closed",
  "archived",
] as const;

export const newsletterStatuses = [
  "active",
  "unsubscribed",
  "bounced",
] as const;

export type AdmissionSubmission = {
  id: string;
  student_name: string;
  guardian_name: string;
  phone: string;
  email: string | null;
  applying_for: string;
  message: string | null;
  status: string;
  metadata: Record<string, unknown>;
  created_at: string;
};

export type ContactSubmission = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  subject: string | null;
  message: string;
  status: string;
  metadata: Record<string, unknown>;
  created_at: string;
};

export type InquirySubmission = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  interest: string | null;
  message: string | null;
  status: string;
  metadata: Record<string, unknown>;
  created_at: string;
};

export type NewsletterSubscriber = {
  id: string;
  email: string;
  status: string;
  metadata: Record<string, unknown>;
  created_at: string;
};

type InboxFilters = {
  status?: string;
  applying_for?: string;
  interest?: string;
};

function validStatus<T extends readonly string[]>(
  status: string | undefined,
  statuses: T,
) {
  return status && statuses.includes(status);
}

export async function getAdminDashboardCounts() {
  const supabase = await createSupabaseServerClient();

  async function count(table: string, status?: string) {
    let query = supabase.from(table).select("id", {
      count: "exact",
      head: true,
    });

    if (status) {
      query = query.eq("status", status);
    }

    const { count: total, error } = await query;
    return error ? 0 : (total ?? 0);
  }

  const [
    newAdmissions,
    newContacts,
    newInquiries,
    publishedNotices,
    upcomingEvents,
  ] = await Promise.all([
    count("admission_submissions", "new"),
    count("contact_submissions", "new"),
    count("inquiry_submissions", "new"),
    supabase
      .from("posts")
      .select("id", { count: "exact", head: true })
      .eq("type", "notice")
      .eq("status", "published")
      .then(({ count: total, error }) => (error ? 0 : (total ?? 0))),
    supabase
      .from("events")
      .select("id", { count: "exact", head: true })
      .gte("starts_at", new Date().toISOString())
      .then(({ count: total, error }) => (error ? 0 : (total ?? 0))),
  ]);

  return {
    newAdmissions,
    newContacts,
    newInquiries,
    publishedNotices,
    upcomingEvents,
  };
}

export async function listAdmissionSubmissions(filters: InboxFilters) {
  const supabase = await createSupabaseServerClient();
  let query = supabase
    .from("admission_submissions")
    .select(
      "id, student_name, guardian_name, phone, email, applying_for, message, status, metadata, created_at",
    )
    .order("created_at", { ascending: false })
    .limit(100);

  if (validStatus(filters.status, admissionStatuses)) {
    query = query.eq("status", filters.status);
  }

  if (filters.applying_for) {
    query = query.eq("applying_for", filters.applying_for);
  }

  const { data, error } = await query;
  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as AdmissionSubmission[];
}

export async function listContactSubmissions(filters: InboxFilters) {
  const supabase = await createSupabaseServerClient();
  let query = supabase
    .from("contact_submissions")
    .select("id, name, phone, email, subject, message, status, metadata, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  if (validStatus(filters.status, contactStatuses)) {
    query = query.eq("status", filters.status);
  }

  const { data, error } = await query;
  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as ContactSubmission[];
}

export async function listInquirySubmissions(filters: InboxFilters) {
  const supabase = await createSupabaseServerClient();
  let query = supabase
    .from("inquiry_submissions")
    .select("id, name, phone, email, interest, message, status, metadata, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  if (validStatus(filters.status, inquiryStatuses)) {
    query = query.eq("status", filters.status);
  }

  if (filters.interest) {
    query = query.eq("interest", filters.interest);
  }

  const { data, error } = await query;
  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as InquirySubmission[];
}

export async function listNewsletterSubscribers(filters: InboxFilters) {
  const supabase = await createSupabaseServerClient();
  let query = supabase
    .from("newsletter_subscribers")
    .select("id, email, status, metadata, created_at")
    .order("created_at", { ascending: false })
    .limit(500);

  if (validStatus(filters.status, newsletterStatuses)) {
    query = query.eq("status", filters.status);
  }

  const { data, error } = await query;
  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as NewsletterSubscriber[];
}
