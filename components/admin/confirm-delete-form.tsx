"use client";

import React from "react";

interface ConfirmDeleteFormProps {
  action: () => Promise<void>;
  confirmMessage?: string;
  className?: string;
  children: React.ReactNode;
}

export default function ConfirmDeleteForm({
  action,
  confirmMessage = "Are you sure you want to delete this item?",
  className = "",
  children
}: ConfirmDeleteFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!window.confirm(confirmMessage)) {
      e.preventDefault();
    }
  };

  return (
    <form action={action} onSubmit={handleSubmit} className={className}>
      {children}
    </form>
  );
}
