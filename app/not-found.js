import Link from "next/link";

export default function NotFound() {
  return (
    <div className="section-shell section-gap">
      <div className="panel p-10 text-center">
        <div className="font-mono text-xs uppercase tracking-[0.35em] text-cyber-acid">404</div>
        <h1 className="mt-4 font-display text-4xl uppercase tracking-[0.08em] text-white">
          Target not found
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate-400">
          The route or content file could not be located. Check the slug or return to the home page.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full border border-cyber-neon/50 bg-cyber-neon/10 px-6 py-3 text-sm uppercase tracking-[0.22em] text-cyber-neon"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}
