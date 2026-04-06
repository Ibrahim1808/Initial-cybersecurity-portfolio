import { siteConfig } from "@/lib/site";

export default function sitemap() {
  return ["", "/"].map((route) => ({
    url: `${siteConfig.url}${route === "/" ? "" : route}`,
    lastModified: new Date(),
  }));
}
