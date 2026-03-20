import { getAllContent } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export default function sitemap() {
  const collections = getAllContent();

  const staticRoutes = ["", "/projects", "/lab", "/notes", "/resume", "/contact"].map((route) => ({
    url: `${siteConfig.url}${route || "/"}`,
    lastModified: new Date(),
  }));

  const contentRoutes = Object.values(collections)
    .flat()
    .map((item) => ({
      url: `${siteConfig.url}${item.href}`,
      lastModified: new Date(item.date),
    }));

  return [...staticRoutes, ...contentRoutes];
}
