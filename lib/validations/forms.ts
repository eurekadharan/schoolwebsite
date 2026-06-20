import { z } from "zod";

const optionalText = (max = 500) =>
  z.preprocess(
    (value) => {
      if (typeof value !== "string") {
        return value;
      }

      const trimmed = value.trim();
      return trimmed.length ? trimmed : undefined;
    },
    z.string().max(max).optional(),
  );

const requiredText = (label: string, max = 160) =>
  z
    .string({ error: `${label} is required.` })
    .trim()
    .min(1, `${label} is required.`)
    .max(max, `${label} is too long.`);

const optionalEmail = z.preprocess(
  (value) => {
    if (typeof value !== "string") {
      return value;
    }

    const trimmed = value.trim();
    return trimmed.length ? trimmed : undefined;
  },
  z.email("Enter a valid email address.").optional(),
);

const phone = z
  .string({ error: "Phone number is required." })
  .trim()
  .min(7, "Phone number is too short.")
  .max(30, "Phone number is too long.")
  .regex(/^[0-9+\-\s()]+$/, "Enter a valid phone number.");

const honeypot = optionalText(100);

export const admissionSubmissionSchema = z.object({
  student_name: requiredText("Student name"),
  guardian_name: requiredText("Guardian name"),
  phone,
  email: optionalEmail,
  applying_for: requiredText("Applying class/program", 120),
  stream: optionalText(120),
  message: optionalText(1000),
  website: honeypot,
});

export const contactSubmissionSchema = z.object({
  name: requiredText("Name"),
  phone: z
    .preprocess(
      (value) => {
        if (typeof value !== "string") {
          return value;
        }

        const trimmed = value.trim();
        return trimmed.length ? trimmed : undefined;
      },
      z
        .string()
        .min(7, "Phone number is too short.")
        .max(30, "Phone number is too long.")
        .regex(/^[0-9+\-\s()]+$/, "Enter a valid phone number.")
        .optional(),
    ),
  email: optionalEmail,
  subject: optionalText(160),
  message: requiredText("Message", 1500),
  website: honeypot,
});

export const inquirySubmissionSchema = z.object({
  name: requiredText("Name"),
  phone,
  email: optionalEmail,
  interest: optionalText(120),
  message: optionalText(1000),
  website: honeypot,
});

export const newsletterSubscriptionSchema = z.object({
  email: z.email("Enter a valid email address.").max(254),
  website: honeypot,
});

export type AdmissionSubmissionInput = z.input<
  typeof admissionSubmissionSchema
>;
export type ContactSubmissionInput = z.input<typeof contactSubmissionSchema>;
export type InquirySubmissionInput = z.input<typeof inquirySubmissionSchema>;
export type NewsletterSubscriptionInput = z.input<
  typeof newsletterSubscriptionSchema
>;
