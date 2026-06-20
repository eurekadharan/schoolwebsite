"use client";

import Link from "next/link";

export default function ErrorPage() {
  return (
    <section className="section section-aqua">
      <div className="container centered">
        <span className="eyebrow">Error</span>
        <h1 className="section-title">Something went wrong</h1>
        <p className="section-copy">Please refresh the page or return to the homepage.</p>
        <Link className="btn btn-primary" href="/">
          Back Home
        </Link>
      </div>
    </section>
  );
}
