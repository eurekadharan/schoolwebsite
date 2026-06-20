"use client";

import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  newsletterSubscriptionSchema,
  type NewsletterSubscriptionInput,
} from "@/lib/validations/forms";

export function NewsletterForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterSubscriptionInput>({
    resolver: zodResolver(newsletterSubscriptionSchema),
    defaultValues: {
      email: "",
      website: "",
    },
  });

  function onSubmit(values: NewsletterSubscriptionInput) {
    setMessage(null);
    startTransition(async () => {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        setMessage("We could not subscribe this email. Please try again.");
        return;
      }

      reset();
      setMessage("Subscribed to Eureka updates.");
    });
  }

  return (
    <form className="newsletter-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        className="honeypot"
        tabIndex={-1}
        autoComplete="off"
        {...register("website")}
      />
      <label>
        Email
        <input {...register("email")} autoComplete="email" type="email" />
        {errors.email?.message ? <span>{errors.email.message}</span> : null}
      </label>
      <button disabled={isPending} type="submit">
        {isPending ? "Subscribing..." : "Subscribe"}
      </button>
      {message ? <p className="form-message">{message}</p> : null}
    </form>
  );
}
