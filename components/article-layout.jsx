import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Tag } from "@/components/tag";

export function ArticleLayout({ item, collectionLabel, relatedItems = [] }) {
  return (
    <div className="section-shell section-gap">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <article className="space-y-8">
          <header className="panel overflow-hidden">
            <div className="relative aspect-[16/8] overflow-hidden border-b border-cyber-line">
              <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-base via-cyber-base/15 to-transparent" />
            </div>
            <div className="space-y-5 p-8">
              <div className="font-mono text-xs uppercase tracking-[0.35em] text-cyber-acid">
                {collectionLabel}
              </div>
              <h1 className="font-display text-4xl uppercase tracking-[0.06em] text-white sm:text-5xl">
                {item.title}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-300">{item.summary}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                <span>{formatDate(item.date)}</span>
                <span>{item.readingTime}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>
          </header>

          <div className="panel p-8">
            <div
              className="prose-cyber"
              dangerouslySetInnerHTML={{ __html: item.contentHtml }}
            />
          </div>
        </article>

        <aside className="space-y-6">
          <div className="panel p-6">
            <div className="font-display text-lg uppercase tracking-[0.08em] text-white">
              Quick Access
            </div>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-300">
              <Link href="/projects" className="hover:text-cyber-neon">
                Projects
              </Link>
              <Link href="/lab" className="hover:text-cyber-neon">
                Lab
              </Link>
              <Link href="/notes" className="hover:text-cyber-neon">
                Notes
              </Link>
              <Link href="/contact" className="hover:text-cyber-neon">
                Contact
              </Link>
            </div>
          </div>

          <div className="panel p-6">
            <div className="font-display text-lg uppercase tracking-[0.08em] text-white">
              Related Reads
            </div>
            <div className="mt-4 space-y-4">
              {relatedItems.map((related) => (
                <Link
                  key={related.slug}
                  href={related.href}
                  className="block rounded-2xl border border-cyber-line bg-black/15 p-4 transition hover:border-cyber-neon/40"
                >
                  <div className="font-display text-sm uppercase tracking-[0.08em] text-white">
                    {related.title}
                  </div>
                  <div className="mt-2 text-sm leading-6 text-slate-400">{related.summary}</div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
