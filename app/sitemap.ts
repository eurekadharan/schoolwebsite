import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const routes = [
    "/",
    "/about",
    "/programs",
    "/programs/montessori",
    "/programs/primary",
    "/programs/basic-level",
    "/programs/secondary-level",
    "/programs/grade-xi-xii",
    "/admission",
    "/gallery",
    "/results",
    "/events",
    "/achievements",
    "/life-at-eureka",
    "/blogs",
    "/notices",
    "/contact"
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date()
  }));
}
