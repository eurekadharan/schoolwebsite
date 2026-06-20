import type { Metadata } from "next";
import { LifeAtEurekaClient } from "@/components/site/life-at-eureka-client";
import { getPageSummary } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Life at Eureka",
  description: "Experience co-curricular activities, active sports facilities, and diverse student-run clubs at Eureka Residential Secondary School."
};

export default function LifeAtEurekaPage() {
  return <LifeAtEurekaClient page={getPageSummary("life-at-eureka")!} />;
}
