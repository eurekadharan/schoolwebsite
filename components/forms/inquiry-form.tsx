"use client";

import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  inquirySubmissionSchema,
  type InquirySubmissionInput,
} from "@/lib/validations/forms";
import { programOptions } from "@/lib/constants/school";

export function InquiryForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquirySubmissionInput>({
    resolver: zodResolver(inquirySubmissionSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      interest: "",
      message: "",
      website: "",
    },
  });

  function onSubmit(values: InquirySubmissionInput) {
    setMessage(null);
    startTransition(async () => {
      const response = await fetch("/api/forms/inquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        setMessage("We could not submit your inquiry. Please try again.");
        return;
      }

      reset();
      setMessage("Inquiry received. We will contact you soon.");
    });
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit(onSubmit)}>
      <input
        className="honeypot"
        tabIndex={-1}
        autoComplete="off"
        {...register("website")}
      />
      <label>
        Name
        <input {...register("name")} autoComplete="name" />
        {errors.name?.message ? <span>{errors.name.message}</span> : null}
      </label>
      <label>
        Phone
        <input {...register("phone")} autoComplete="tel" />
        {errors.phone?.message ? <span>{errors.phone.message}</span> : null}
      </label>
      <label>
        Email
        <input {...register("email")} autoComplete="email" type="email" />
        {errors.email?.message ? <span>{errors.email.message}</span> : null}
      </label>
      <label>
        Interest
        <select {...register("interest")}>
          <option value="">Select an interest</option>
          {programOptions.map((program) => (
            <option key={program} value={program}>
              {program}
            </option>
          ))}
        </select>
      </label>
      <label className="full-span">
        Message
        <textarea {...register("message")} rows={4} />
      </label>
      <button disabled={isPending} type="submit">
        {isPending ? "Submitting..." : "Submit inquiry"}
      </button>
      {message ? <p className="form-message">{message}</p> : null}
    </form>
  );
}
