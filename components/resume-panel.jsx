import Link from "next/link";

export function ResumePanel() {
  return (
    <section className="section-shell section-gap">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="panel p-8">
          <div className="font-mono text-xs uppercase tracking-[0.35em] text-cyber-acid">Resume Vault</div>
          <h2 className="mt-4 font-display text-3xl uppercase tracking-[0.08em] text-white">
            Download a print-ready PDF resume.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-400">
            This section is public-only and Vercel-ready. Replace the sample PDF in `public/resume.pdf` when you
            want to publish your own resume.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/resume.pdf"
              target="_blank"
              className="rounded-full border border-cyber-neon/50 bg-cyber-neon/10 px-6 py-3 text-sm uppercase tracking-[0.22em] text-cyber-neon transition hover:bg-cyber-neon/20"
            >
              View PDF
            </Link>
            <Link
              href="/resume.pdf"
              download
              className="rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm uppercase tracking-[0.22em] text-white transition hover:border-cyber-acid/50 hover:text-cyber-acid"
            >
              Download PDF
            </Link>
          </div>
        </div>
        <div className="panel min-h-[420px] overflow-hidden">
          <iframe
            src="/resume.pdf"
            title="Resume preview"
            className="h-[420px] w-full bg-white"
          />
        </div>
      </div>
    </section>
  );
}
