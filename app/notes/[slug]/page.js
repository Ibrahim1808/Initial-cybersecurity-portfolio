import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/article-layout";
import { getCollection, getContentBySlug, getRelatedContent } from "@/lib/content";

export async function generateStaticParams() {
  return getCollection("notes").map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  try {
    const item = await getContentBySlug("notes", params.slug);
    return {
      title: item.title,
      description: item.summary,
    };
  } catch {
    return {};
  }
}

export default async function NoteDetailPage({ params }) {
  try {
    const item = await getContentBySlug("notes", params.slug);
    const relatedItems = getRelatedContent("notes", params.slug);
    return <ArticleLayout item={item} collectionLabel="Research Note" relatedItems={relatedItems} />;
  } catch {
    notFound();
  }
}
