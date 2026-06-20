import Link from "next/link";
import { notFound } from "next/navigation";
import { adminModules } from "@/lib/site-data";

type Props = {
  params: Promise<{ section: string }>;
};

export async function generateStaticParams() {
  const customSections = ["events", "achievements"];
  return [
    ...adminModules
      .map((module) => module.href.split("/").pop()!)
      .filter((sect) => !customSections.includes(sect))
      .map((section) => ({ section })),
    { section: "settings" }
  ];
}

export default async function AdminSectionPage({ params }: Props) {
  const { section } = await params;
  const moduleConfig = adminModules.find((item) => item.href.endsWith(`/${section}`)) || (section === "settings" ? {
    label: "Settings",
    count: 1
  } : null);

  if (!moduleConfig) notFound();

  return (
    <>
      <div className="admin-topbar">
        <div>
          <span className="eyebrow">Admin Module</span>
          <h1>{moduleConfig.label}</h1>
          <p>CRUD screens are scaffolded and ready to connect to Supabase tables and Server Actions.</p>
        </div>
        <Link className="btn btn-primary" href={`/admin/${section}`}>
          New {moduleConfig.label}
        </Link>
      </div>

      <section className="admin-grid">
        <div className="admin-card">
          <h2>Published</h2>
          <p>Live records available on the public website.</p>
          <strong>{Math.max(1, Math.floor(moduleConfig.count * 0.65))}</strong>
        </div>
        <div className="admin-card">
          <h2>Draft</h2>
          <p>Items waiting for review and publication.</p>
          <strong>{Math.max(0, Math.floor(moduleConfig.count * 0.2))}</strong>
        </div>
        <div className="admin-card">
          <h2>Scheduled</h2>
          <p>Records with future publish dates or active windows.</p>
          <strong>{Math.max(0, Math.floor(moduleConfig.count * 0.15))}</strong>
        </div>
      </section>

      <section className="admin-card" style={{ marginTop: 18 }}>
        <h2>{moduleConfig.label} management checklist</h2>
        <p>
          Next implementation pass should add table listing, create/edit forms, media picker,
          publish status controls, audit log writes, and `revalidatePath` calls after changes.
        </p>
      </section>
    </>
  );
}
