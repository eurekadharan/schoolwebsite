import type { Metadata } from "next";
import { GenericPage } from "@/components/site/generic-page";
import { getPageSummary } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Gallery"
};

export default function GalleryPage() {
  return <GenericPage page={getPageSummary("gallery")!} />;
}
