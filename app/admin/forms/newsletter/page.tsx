import Link from "next/link";
import {
  listNewsletterSubscribers,
  newsletterStatuses,
} from "@/lib/admin/forms";
import { StatusBadge } from "@/components/admin/status-badge";
import { updateSubmissionStatus } from "@/app/admin/forms/actions";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function param(
  params: Record<string, string | string[] | undefined>,
  key: string,
) {
  const value = params[key];
  return typeof value === "string" && value.length ? value : undefined;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function NewsletterInboxPage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const filters = { status: param(params, "status") };
  const rows = await listNewsletterSubscribers(filters);
  const exportHref = filters.status
    ? `/admin/forms/newsletter/export?status=${encodeURIComponent(filters.status)}`
    : "/admin/forms/newsletter/export";

  return (
    <section className="admin-section">
      <div className="admin-heading heading-row">
        <div>
          <span>Forms</span>
          <h1>Newsletter subscribers</h1>
        </div>
        <Link className="secondary-button" href={exportHref}>
          Export CSV
        </Link>
      </div>
      <form className="filter-bar">
        <label>
          Status
          <select name="status" defaultValue={filters.status ?? ""}>
            <option value="">All statuses</option>
            {newsletterStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Filter</button>
        <Link href="/admin/forms/newsletter">Clear</Link>
      </form>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Status</th>
              <th>Subscribed</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>
                  <a href={`mailto:${row.email}`}>{row.email}</a>
                </td>
                <td>
                  <StatusBadge status={row.status} />
                </td>
                <td>{formatDate(row.created_at)}</td>
                <td>
                  <form action={updateSubmissionStatus} className="row-action">
                    <input
                      type="hidden"
                      name="table"
                      value="newsletter_subscribers"
                    />
                    <input type="hidden" name="id" value={row.id} />
                    <select name="status" defaultValue={row.status}>
                      {newsletterStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <button type="submit">Save</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!rows.length ? <p className="empty-state">No subscribers found.</p> : null}
      </div>
    </section>
  );
}
