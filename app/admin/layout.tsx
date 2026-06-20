import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/auth/roles";
import { AdminShell } from "@/components/admin/admin-shell";

export default async function AdminLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/login");
  }

  return <AdminShell profile={profile}>{children}</AdminShell>;
}
