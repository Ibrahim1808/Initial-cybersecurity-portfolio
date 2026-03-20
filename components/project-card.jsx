import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Tag } from "@/components/tag";

export function ProjectCard({ item }) {
  return (
    <article className="panel group scan-lines relative overflow-hidden">
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyber-neon/70 to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="relative aspect-[16/10] overflow-hidden border-b border-cyber-line">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-base via-cyber-base/10 to-transparent" />
      </div>
      <div className="space-y-5 p-6">
        <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.25em] text-slate-400">
          <span>{formatDate(item.date)}</span>
          <span>{item.readingTime}</span>
        </div>
        <div>
          <h3 className="font-display text-xl uppercase tracking-[0.08em] text-white">
            {item.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-400">{item.summary}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <Link
          href={item.href}
          className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.22em] text-cyber-neon transition hover:text-white"
        >
          Open dossier
          <span aria-hidden="true">+</span>
        </Link>
      </div>
    </article>
  );
}
