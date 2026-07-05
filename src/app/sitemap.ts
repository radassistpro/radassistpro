import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";
import { getSortedPosts } from "@/lib/blog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/services/", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/services/virtual-pacs-admin/", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/services/prelim-teleradiology/", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/pricing/", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/platforms/onepacs/", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/for/teleradiology-groups/", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/for/imaging-centers/", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/for/urgent-care-er/", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/how-it-works/", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/about/", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/blog/", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/book-a-call/", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/privacy/", priority: 0.2, changeFrequency: "yearly" as const },
    { path: "/terms/", priority: 0.2, changeFrequency: "yearly" as const },
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map(
    ({ path, priority, changeFrequency }) => ({
      url: `${siteConfig.url}${path}`,
      lastModified,
      changeFrequency,
      priority,
    }),
  );

  const blogEntries: MetadataRoute.Sitemap = getSortedPosts().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}/`,
    lastModified: new Date(post.dateModified),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
