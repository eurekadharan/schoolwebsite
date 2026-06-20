import type { Metadata } from "next";
import { GenericPage } from "@/components/site/generic-page";
import { getPageSummary } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Results"
};

export default function ResultsPage() {
  return <GenericPage page={getPageSummary("results")!} />;
}
