import { ContentFilter } from "@/components/content-filter";
import { PageHero } from "@/components/page-hero";
import { getCollection } from "@/lib/content";

export const metadata = {
  title: "Notes",
  description: "Security notes, blog posts, writeups, and research articles.",
};

export default function NotesPage() {
  const items = getCollection("notes");

  return (
    <>
      <PageHero
        eyebrow="Notes / Blog"
        title="Readable writeups for research, reporting, and learning"
        description="Long-form content from `content/notes`, rendered as clean article pages with SEO-friendly metadata."
      />
      <section className="section-shell pb-20">
        <ContentFilter items={items} title="Notes Archive" emptyLabel="No note matched the current search." />
      </section>
    </>
  );
}
