import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/article-layout";
import { getCollection, getContentBySlug, getRelatedContent } from "@/lib/content";

export async function generateStaticParams() {
  return getCollection("lab").map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  try {
    const item = await getContentBySlug("lab", params.slug);
    return {
      title: item.title,
      description: item.summary,
    };
  } catch {
    return {};
  }
}

export default async function LabDetailPage({ params }) {
  try {
    const item = await getContentBySlug("lab", params.slug);
    const relatedItems = getRelatedContent("lab", params.slug);
    return <ArticleLayout item={item} collectionLabel="Lab Entry" relatedItems={relatedItems} />;
  } catch {
    notFound();
  }
}
