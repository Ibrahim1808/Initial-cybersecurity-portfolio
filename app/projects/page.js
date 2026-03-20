import { ContentFilter } from "@/components/content-filter";
import { PageHero } from "@/components/page-hero";
import { getCollection } from "@/lib/content";

export const metadata = {
  title: "Projects",
  description: "Cybersecurity projects, pentesting engagements, and portfolio case studies.",
};

export default function ProjectsPage() {
  const items = getCollection("projects");

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Security projects and client-style case studies"
        description="This section is generated from `content/projects`, giving you a GitHub-based CMS workflow without any login system."
      />
      <section className="section-shell pb-20">
        <ContentFilter items={items} title="Project Index" emptyLabel="No project matched the current search." />
      </section>
    </>
  );
}
