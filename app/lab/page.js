import { ContentFilter } from "@/components/content-filter";
import { PageHero } from "@/components/page-hero";
import { getCollection } from "@/lib/content";

export const metadata = {
  title: "Lab",
  description: "Cybersecurity lab experiments, wireless research, and hardware tinkering.",
};

export default function LabPage() {
  const items = getCollection("lab");

  return (
    <>
      <PageHero
        eyebrow="Cybersecurity Lab"
        title="ESP32 builds, Wi-Fi workflows, and packet-level experiments"
        description="Every lab entry is pulled from `content/lab` and rendered into a polished, searchable collection."
      />
      <section className="section-shell pb-20">
        <ContentFilter items={items} title="Lab Archive" emptyLabel="No lab entry matched the current search." />
      </section>
    </>
  );
}
