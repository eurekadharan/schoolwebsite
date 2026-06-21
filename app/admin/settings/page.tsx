import { getSettings } from "@/lib/settings-store";
import SettingsForm from "./settings-form";

export const metadata = {
  title: "School Settings | Eureka Admin",
  description: "Manage school identity, contact information, social links, and homepage hero settings."
};

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <>
      <div className="admin-topbar">
        <div>
          <span className="eyebrow">Admin Module</span>
          <h1>Site Settings</h1>
          <p>Configure general profile details, contact info, social links, and dynamic landing copy.</p>
        </div>
      </div>

      <section className="admin-section">
        <SettingsForm settings={settings} />
      </section>
    </>
  );
}
