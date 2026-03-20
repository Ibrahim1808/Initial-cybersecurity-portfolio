import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const contentRoot = path.join(process.cwd(), "content");

const collectionConfig = {
  projects: {
    folder: "projects",
    basePath: "/projects",
    fallbackImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  },
  lab: {
    folder: "lab",
    basePath: "/lab",
    fallbackImage:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
  },
  notes: {
    folder: "notes",
    basePath: "/notes",
    fallbackImage:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  },
};

function getCollectionDir(collection) {
  return path.join(contentRoot, collectionConfig[collection].folder);
}

function normalizeSlug(fileName) {
  return fileName.replace(/\.md$/, "");
}

function sortByDateDesc(items) {
  return [...items].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getCollection(collection) {
  const dir = getCollectionDir(collection);
  const files = fs
    .readdirSync(dir)
    .filter((fileName) => fileName.endsWith(".md"));

  const entries = files.map((fileName) => {
    const slug = normalizeSlug(fileName);
    const fullPath = path.join(dir, fileName);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(raw);

    // Frontmatter powers cards, filters, metadata, and generated routes.
    return {
      slug,
      title: data.title || slug,
      date: data.date || "1970-01-01",
      tags: data.tags || [],
      summary: data.summary || content.slice(0, 180).trim(),
      featured: Boolean(data.featured),
      image: data.image || collectionConfig[collection].fallbackImage,
      href: `${collectionConfig[collection].basePath}/${slug}`,
      readingTime: getReadingTime(content),
    };
  });

  return sortByDateDesc(entries);
}

export function getAllContent() {
  return {
    projects: getCollection("projects"),
    lab: getCollection("lab"),
    notes: getCollection("notes"),
  };
}

export function getFeaturedContent(limit = 3) {
  const { projects, lab, notes } = getAllContent();
  return sortByDateDesc(
    [...projects, ...lab, ...notes].filter((item) => item.featured),
  ).slice(0, limit);
}

export function getTagCounts(collection) {
  return getCollection(collection)
    .flatMap((entry) => entry.tags)
    .reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {});
}

export async function getContentBySlug(collection, slug) {
  const fullPath = path.join(getCollectionDir(collection), `${slug}.md`);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  // We convert Markdown to HTML on the server so content authors only need Markdown files.
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(content);

  return {
    slug,
    title: data.title || slug,
    date: data.date || "1970-01-01",
    tags: data.tags || [],
    summary: data.summary || content.slice(0, 180).trim(),
    featured: Boolean(data.featured),
    image: data.image || collectionConfig[collection].fallbackImage,
    href: `${collectionConfig[collection].basePath}/${slug}`,
    readingTime: getReadingTime(content),
    contentHtml: processed.toString(),
  };
}

export function getRelatedContent(collection, currentSlug, limit = 3) {
  return getCollection(collection)
    .filter((entry) => entry.slug !== currentSlug)
    .slice(0, limit);
}

function getReadingTime(content) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}
