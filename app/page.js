import { Hero } from "@/components/hero";
import { ContentPreview } from "@/components/content-preview";
import { SectionHeading } from "@/components/section-heading";
import { getCollection, getFeaturedContent } from "@/lib/content";
import Link from "next/link";

export default function HomePage() {
  const projects = getCollection("projects").slice(0, 3);
  const lab = getCollection("lab").slice(0, 3);
  const notes = getCollection("notes").slice(0, 3);
  const featured = getFeaturedContent(3);

  return (
    <>
      <Hero />

      <section className="section-shell pb-12">
        <div className="panel grid gap-8 p-8 lg:grid-cols-[1.1fr_0.9fr]">
          <SectionHeading
            eyebrow="Mission Profile"
            title="Cybersecurity portfolio built like a live lab environment."
            description="The site combines a polished portfolio front end with a GitHub-driven Markdown workflow, so new projects, lab notes, and articles can be published without any admin panel or login system."
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["Markdown CMS", "Add `.md` files in GitHub and deploy automatically."],
              ["Search + Tags", "Quickly filter projects, lab experiments, and writeups."],
              ["Vercel Ready", "Optimized for instant Next.js deployment with zero custom server work."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl border border-cyber-line bg-black/20 p-5">
                <div className="font-display text-lg uppercase tracking-[0.08em] text-white">{title}</div>
                <div className="mt-2 text-sm leading-7 text-slate-400">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContentPreview
        eyebrow="Featured Files"
        title="Highlighted operations and writeups"
        description="Featured entries from across the whole site. Mark content with `featured: true` in frontmatter to surface it here."
        items={featured}
        href="/projects"
        hrefLabel="Browse all content"
      />

      <ContentPreview
        eyebrow="Projects"
        title="Pentesting and security engineering work"
        description="Portfolio-ready projects with clean cards, hover states, and individual detail pages."
        items={projects}
        href="/projects"
        hrefLabel="Open projects"
      />

      <ContentPreview
        eyebrow="Lab"
        title="Experiments from the cybersecurity lab"
        description="Hands-on hardware, network, and analysis experiments tracked as Markdown entries."
        items={lab}
        href="/lab"
        hrefLabel="Enter the lab"
      />

      <ContentPreview
        eyebrow="Notes"
        title="Readable notes and technical writeups"
        description="Markdown-powered articles for methodology, reporting, and lab lessons learned."
        items={notes}
        href="/notes"
        hrefLabel="Read notes"
      />

      <section className="section-shell section-gap pt-4">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="panel p-8">
            <SectionHeading
              eyebrow="Resume Vault"
              title="Publish your PDF resume without extra tooling"
              description="Keep `public/resume.pdf` in the repo and the site will always serve the latest version after each GitHub push."
            />
            <div className="mt-8">
              <Link
                href="/resume"
                className="inline-flex rounded-full border border-cyber-neon/50 bg-cyber-neon/10 px-6 py-3 text-sm uppercase tracking-[0.22em] text-cyber-neon transition hover:bg-cyber-neon/20"
              >
                Open Resume Page
              </Link>
            </div>
          </div>

          <div className="panel p-8">
            <SectionHeading
              eyebrow="Contact"
              title="Keep the site public-only and route conversations to your links"
              description="There is no login system or admin panel here. GitHub manages content, and public contact channels handle outreach."
            />
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex rounded-full border border-cyber-violet/40 bg-cyber-violet/10 px-6 py-3 text-sm uppercase tracking-[0.22em] text-cyber-violet transition hover:bg-cyber-violet/20"
              >
                Open Contact Page
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
