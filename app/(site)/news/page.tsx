import type { Metadata } from "next";
import { GenericPage } from "@/components/site/generic-page";
import { getPageSummary } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "News & Notices"
};

export default function NewsPage() {
  return <GenericPage page={getPageSummary("news")!} />;
}
