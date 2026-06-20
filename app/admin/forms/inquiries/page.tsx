import Link from "next/link";
import { inquiryStatuses, listInquirySubmissions } from "@/lib/admin/forms";
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

export default async function InquiryInboxPage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const filters = {
    status: param(params, "status"),
    interest: param(params, "interest"),
  };
  const rows = await listInquirySubmissions(filters);

  return (
    <section className="admin-section">
      <div className="admin-heading">
        <span>Forms</span>
        <h1>General inquiries</h1>
      </div>
      <form className="filter-bar">
        <label>
          Status
          <select name="status" defaultValue={filters.status ?? ""}>
            <option value="">All statuses</option>
            {inquiryStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <label>
          Interest
          <input
            name="interest"
            defaultValue={filters.interest ?? ""}
            placeholder="Primary Level"
          />
        </label>
        <button type="submit">Filter</button>
        <Link href="/admin/forms/inquiries">Clear</Link>
      </form>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Interest</th>
              <th>Message</th>
              <th>Status</th>
              <th>Received</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>
                  <strong>{row.name}</strong>
                </td>
                <td>
                  <a href={`tel:${row.phone}`}>{row.phone}</a>
                  {row.email ? <a href={`mailto:${row.email}`}>{row.email}</a> : null}
                </td>
                <td>{row.interest ?? "General"}</td>
                <td>{row.message ?? ""}</td>
                <td>
                  <StatusBadge status={row.status} />
                </td>
                <td>{formatDate(row.created_at)}</td>
                <td>
                  <form action={updateSubmissionStatus} className="row-action">
                    <input type="hidden" name="table" value="inquiry_submissions" />
                    <input type="hidden" name="id" value={row.id} />
                    <select name="status" defaultValue={row.status}>
                      {inquiryStatuses.map((status) => (
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
        {!rows.length ? <p className="empty-state">No inquiries found.</p> : null}
      </div>
    </section>
  );
}
