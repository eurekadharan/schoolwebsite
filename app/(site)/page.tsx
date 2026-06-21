import { SiteHome } from "@/components/site/site-home";
import { getSettings } from "@/lib/settings-store";

export default async function HomePage() {
  const settings = await getSettings();
  return <SiteHome settings={settings.school_identity} />;
}
