import { NextResponse, type NextRequest } from "next/server";
import { listNewsletterSubscribers, newsletterStatuses } from "@/lib/admin/forms";
import { assertAdminRole } from "@/lib/auth/roles";

export const dynamic = "force-dynamic";

function escapeCsv(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

export async function GET(request: NextRequest) {
  await assertAdminRole(["super_admin", "admin"]);

  const status = request.nextUrl.searchParams.get("status") ?? undefined;
  const rows = await listNewsletterSubscribers({
    status:
      status && newsletterStatuses.includes(status as never)
        ? status
        : undefined,
  });
  const csv = [
    ["email", "status", "created_at"].join(","),
    ...rows.map((row) =>
      [row.email, row.status, row.created_at].map(escapeCsv).join(","),
    ),
  ].join("\n");

  return new NextResponse(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="eureka-newsletter.csv"',
    },
  });
}
