import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts-store";
import { getEvents } from "@/lib/events-store";
import { getAchievements } from "@/lib/achievements-store";
import { getPages } from "@/lib/pages-store";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.eurekadharan.edu.np";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ── Static routes ──
  const staticRoutes = [
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
    "/hall-of-fame",
    "/life-at-eureka",
    "/blogs",
    "/notices",
    "/contact",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "daily" : "weekly",
    priority: route === "/" ? 1.0 : 0.8,
  }));

  // ── Dynamic routes ──
  const dynamicEntries: MetadataRoute.Sitemap = [];

  try {
    // Blog posts
    const blogs = await getPosts("blog");
    for (const post of blogs) {
      dynamicEntries.push({
        url: `${BASE_URL}/blogs/${post.slug}`,
        lastModified: post.updated_at
          ? new Date(post.updated_at)
          : new Date(post.published_at || post.created_at || Date.now()),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }

    // Notices
    const notices = await getPosts("notice");
    for (const notice of notices) {
      dynamicEntries.push({
        url: `${BASE_URL}/notices/${notice.slug}`,
        lastModified: notice.updated_at
          ? new Date(notice.updated_at)
          : new Date(notice.published_at || notice.created_at || Date.now()),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }

    // Events
    const events = await getEvents();
    for (const event of events) {
      dynamicEntries.push({
        url: `${BASE_URL}/events/${event.slug}`,
        lastModified: event.updated_at
          ? new Date(event.updated_at)
          : new Date(event.published_at || event.created_at || Date.now()),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }

    // Hall of Fame / Achievements
    const achievements = await getAchievements();
    for (const achievement of achievements) {
      dynamicEntries.push({
        url: `${BASE_URL}/hall-of-fame/${achievement.slug}`,
        lastModified: achievement.updated_at
          ? new Date(achievement.updated_at)
          : new Date(
              achievement.published_at ||
                achievement.created_at ||
                Date.now()
            ),
        changeFrequency: "yearly",
        priority: 0.5,
      });
    }

    // Dynamic CMS pages
    const pages = await getPages();
    for (const page of pages) {
      // Skip pages whose slugs overlap with existing static routes
      if (!staticRoutes.includes(`/${page.slug}`)) {
        dynamicEntries.push({
          url: `${BASE_URL}/${page.slug}`,
          lastModified: page.updated_at
            ? new Date(page.updated_at)
            : new Date(page.created_at || Date.now()),
          changeFrequency: "monthly",
          priority: 0.5,
        });
      }
    }
  } catch (error) {
    console.error("Error generating dynamic sitemap entries:", error);
    // Continue with static entries only if dynamic fetching fails
  }

  return [...staticEntries, ...dynamicEntries];
}
