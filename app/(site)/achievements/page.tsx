import type { Metadata } from "next";
import { GenericPage } from "@/components/site/generic-page";
import { getPageSummary } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Achievements"
};

export default function AchievementsPage() {
  return <GenericPage page={getPageSummary("achievements")!} />;
}
