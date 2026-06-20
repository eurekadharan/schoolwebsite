import type { Metadata } from "next";
import { GenericPage } from "@/components/site/generic-page";
import { getPageSummary } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Notices"
};

export default function NoticesPage() {
  return <GenericPage page={getPageSummary("notices")!} />;
}
