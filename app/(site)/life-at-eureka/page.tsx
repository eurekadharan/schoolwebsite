import type { Metadata } from "next";
import { LifeAtEurekaClient } from "@/components/site/life-at-eureka-client";
import { getPageBySlug } from "@/lib/pages-store";
import { getPageSummary } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Life at Eureka",
  description: "Experience co-curricular activities, active sports facilities, and diverse student-run clubs at Eureka Residential Secondary School."
};

export const revalidate = 0;

export default async function LifeAtEurekaPage() {
  const dynamicPage = await getPageBySlug("life-at-eureka");
  const page = dynamicPage || getPageSummary("life-at-eureka")!;
  return <LifeAtEurekaClient page={page} />;
}
