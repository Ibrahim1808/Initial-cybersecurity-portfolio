import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";

export function ContentPreview({ eyebrow, title, description, items, href, hrefLabel }) {
  return (
    <section className="section-shell section-gap">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <Link
          href={href}
          className="text-sm uppercase tracking-[0.24em] text-cyber-neon transition hover:text-white"
        >
          {hrefLabel}
        </Link>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <ProjectCard key={item.slug} item={item} />
        ))}
      </div>
    </section>
  );
}
