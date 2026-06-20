import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section section-aqua">
      <div className="container centered">
        <span className="eyebrow">404</span>
        <h1 className="section-title">Page not found</h1>
        <p className="section-copy">The page you are looking for does not exist or has been moved.</p>
        <Link className="btn btn-primary" href="/">
          Back Home
        </Link>
      </div>
    </section>
  );
}
