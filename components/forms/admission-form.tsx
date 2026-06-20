"use client";

import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  admissionSubmissionSchema,
  type AdmissionSubmissionInput,
} from "@/lib/validations/forms";
import { programOptions } from "@/lib/constants/school";

export function AdmissionForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdmissionSubmissionInput>({
    resolver: zodResolver(admissionSubmissionSchema),
    defaultValues: {
      student_name: "",
      guardian_name: "",
      phone: "",
      email: "",
      applying_for: "",
      stream: "",
      message: "",
      website: "",
    },
  });

  function onSubmit(values: AdmissionSubmissionInput) {
    setMessage(null);
    startTransition(async () => {
      const response = await fetch("/api/forms/admission", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        setMessage("We could not submit the admission form. Please try again.");
        return;
      }

      reset();
      setMessage("Admission inquiry received. The school team will follow up.");
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
        Student name
        <input {...register("student_name")} autoComplete="name" />
        {errors.student_name?.message ? (
          <span>{errors.student_name.message}</span>
        ) : null}
      </label>
      <label>
        Guardian name
        <input {...register("guardian_name")} autoComplete="name" />
        {errors.guardian_name?.message ? (
          <span>{errors.guardian_name.message}</span>
        ) : null}
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
        Applying for
        <select {...register("applying_for")}>
          <option value="">Select a level</option>
          {programOptions.map((program) => (
            <option key={program} value={program}>
              {program}
            </option>
          ))}
        </select>
        {errors.applying_for?.message ? (
          <span>{errors.applying_for.message}</span>
        ) : null}
      </label>
      <label>
        +2 stream, if applicable
        <input {...register("stream")} />
      </label>
      <label className="full-span">
        Message
        <textarea {...register("message")} rows={4} />
      </label>
      <button disabled={isPending} type="submit">
        {isPending ? "Submitting..." : "Submit admission inquiry"}
      </button>
      {message ? <p className="form-message">{message}</p> : null}
    </form>
  );
}
