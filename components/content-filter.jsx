"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ProjectCard } from "@/components/project-card";
import { Tag } from "@/components/tag";

export function ContentFilter({ items, title = "Entries", emptyLabel = "No matching entries found." }) {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("all");

  const tags = useMemo(() => {
    // Tags are derived from the content itself, so adding new Markdown files updates the UI automatically.
    const allTags = Array.from(new Set(items.flatMap((item) => item.tags))).sort();
    return ["all", ...allTags];
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const tagMatch = activeTag === "all" || item.tags.includes(activeTag);
      const query = search.trim().toLowerCase();
      const searchMatch =
        query.length === 0 ||
        [item.title, item.summary, ...item.tags].join(" ").toLowerCase().includes(query);
      return tagMatch && searchMatch;
    });
  }, [activeTag, items, search]);

  return (
    <div className="space-y-8">
      <div className="panel p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.35em] text-cyber-neon">
              {title}
            </div>
            <div className="mt-3 text-sm text-slate-400">
              Search across titles, summaries, and tags. Filter content without touching the CMS.
            </div>
          </div>
          <label className="block w-full max-w-md">
            <span className="sr-only">Search content</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search posts, labs, or projects..."
              className="w-full rounded-2xl border border-cyber-line bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-cyber-neon"
            />
          </label>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {tags.map((tag) => (
            <button key={tag} type="button" onClick={() => setActiveTag(tag)}>
              <Tag active={activeTag === tag}>{tag}</Tag>
            </button>
          ))}
        </div>
      </div>

      {filteredItems.length ? (
        <motion.div layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item) => (
            <motion.div key={item.slug} layout>
              <ProjectCard item={item} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="panel p-10 text-center text-slate-400">{emptyLabel}</div>
      )}
    </div>
  );
}
