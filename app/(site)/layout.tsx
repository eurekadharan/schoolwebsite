import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { getSettings } from "@/lib/settings-store";

export default async function SiteLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <div>
      <SiteHeader settings={settings.school_identity} admissionStrip={settings.admission_strip} />
      <main id="content">{children}</main>
      <SiteFooter settings={settings.school_identity} />
    </div>
  );
}
