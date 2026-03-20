import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/article-layout";
import { getCollection, getContentBySlug, getRelatedContent } from "@/lib/content";

export async function generateStaticParams() {
  return getCollection("projects").map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  try {
    const item = await getContentBySlug("projects", params.slug);
    return {
      title: item.title,
      description: item.summary,
    };
  } catch {
    return {};
  }
}

export default async function ProjectDetailPage({ params }) {
  try {
    const item = await getContentBySlug("projects", params.slug);
    const relatedItems = getRelatedContent("projects", params.slug);
    return <ArticleLayout item={item} collectionLabel="Project File" relatedItems={relatedItems} />;
  } catch {
    notFound();
  }
}
