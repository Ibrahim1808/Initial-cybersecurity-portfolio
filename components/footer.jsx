import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-cyber-line">
      <div className="section-shell flex flex-col gap-6 py-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="font-display text-base uppercase tracking-[0.25em] text-white">
            {siteConfig.shortName}
          </div>
          <div className="mt-2 max-w-xl">
            Built with Next.js, Tailwind CSS, Framer Motion, and Markdown content managed through GitHub.
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href={siteConfig.social.github} target="_blank" className="hover:text-cyber-neon">
            GitHub
          </Link>
          <Link href={siteConfig.social.linkedin} target="_blank" className="hover:text-cyber-neon">
            LinkedIn
          </Link>
          <Link href="/resume" className="hover:text-cyber-neon">
            Resume
          </Link>
        </div>
      </div>
    </footer>
  );
}
