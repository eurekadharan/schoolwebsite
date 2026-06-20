"use client";

import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  contactSubmissionSchema,
  type ContactSubmissionInput,
} from "@/lib/validations/forms";

export function ContactForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactSubmissionInput>({
    resolver: zodResolver(contactSubmissionSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    },
  });

  function onSubmit(values: ContactSubmissionInput) {
    setMessage(null);
    startTransition(async () => {
      const response = await fetch("/api/forms/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        setMessage("We could not send your message. Please try again.");
        return;
      }

      reset();
      setMessage("Message sent. The school team will respond soon.");
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
        Subject
        <input {...register("subject")} />
      </label>
      <label className="full-span">
        Message
        <textarea {...register("message")} rows={4} />
        {errors.message?.message ? (
          <span>{errors.message.message}</span>
        ) : null}
      </label>
      <button disabled={isPending} type="submit">
        {isPending ? "Sending..." : "Send message"}
      </button>
      {message ? <p className="form-message">{message}</p> : null}
    </form>
  );
}
