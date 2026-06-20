import { z } from "zod";

export const honeypotSchema = z.object({
  website: z.string().optional()
});

export const contactSchema = honeypotSchema.extend({
  name: z.string().min(2).max(120),
  phone: z.string().min(6).max(40),
  email: z.string().email().optional().or(z.literal("")),
  subject: z.string().min(2).max(160).optional().or(z.literal("")),
  message: z.string().min(5).max(2000)
});

export const admissionSchema = honeypotSchema.extend({
  student_name: z.string().min(2).max(120),
  guardian_name: z.string().min(2).max(120),
  phone: z.string().min(6).max(40),
  email: z.string().email().optional().or(z.literal("")),
  applying_for: z.string().min(2).max(80),
  message: z.string().max(2000).optional().or(z.literal(""))
});

export const inquirySchema = honeypotSchema.extend({
  name: z.string().min(2).max(120),
  phone: z.string().min(6).max(40),
  email: z.string().email().optional().or(z.literal("")),
  interest: z.string().max(120).optional().or(z.literal("")),
  message: z.string().max(2000).optional().or(z.literal(""))
});

export const newsletterSchema = honeypotSchema.extend({
  email: z.string().email()
});

export const formSchemas = {
  contact: contactSchema,
  admission: admissionSchema,
  inquiry: inquirySchema
};

export const formTables = {
  contact: "contact_submissions",
  admission: "admission_submissions",
  inquiry: "inquiry_submissions"
} as const;

export type FormKind = keyof typeof formSchemas;
