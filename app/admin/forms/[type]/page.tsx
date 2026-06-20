import { notFound } from "next/navigation";
import { adminFormModules } from "@/lib/site-data";

type Props = {
  params: Promise<{ type: string }>;
};

const statuses = ["new", "contacted", "follow_up", "closed"];

export async function generateStaticParams() {
  return adminFormModules.map((module) => ({ type: module.href.split("/").pop()! }));
}

export default async function AdminFormsPage({ params }: Props) {
  const { type } = await params;
  const moduleConfig = adminFormModules.find((item) => item.href.endsWith(`/${type}`));
  if (!moduleConfig) notFound();

  return (
    <>
      <div className="admin-topbar">
        <div>
          <span className="eyebrow">Form Inbox</span>
          <h1>{moduleConfig.label}</h1>
          <p>Review submissions, update statuses, export records, and follow up with families.</p>
        </div>
        <button className="btn btn-primary" type="button">
          Export CSV
        </button>
      </div>

      <section className="admin-grid">
        {statuses.map((status, index) => (
          <div className="admin-card" key={status}>
            <h2>{status.replace("_", " ")}</h2>
            <p>Submissions in this workflow state.</p>
            <strong>{Math.max(1, moduleConfig.count - index * 4)}</strong>
          </div>
        ))}
      </section>

      <section className="admin-card" style={{ marginTop: 18 }}>
        <h2>Inbox table</h2>
        <p>
          This scaffold is ready for Supabase-backed rows with filters by status, program/class,
          date range, assignee, and follow-up state.
        </p>
      </section>
    </>
  );
}
