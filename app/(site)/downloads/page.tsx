import type { Metadata } from "next";
import { GenericPage } from "@/components/site/generic-page";
import { getPageSummary } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Downloads"
};

export default function DownloadsPage() {
  return <GenericPage page={getPageSummary("downloads")!} />;
}
