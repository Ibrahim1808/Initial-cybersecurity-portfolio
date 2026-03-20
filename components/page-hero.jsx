export function PageHero({ eyebrow, title, description }) {
  return (
    <section className="section-shell section-gap pb-8 pt-16">
      <div className="panel px-6 py-10 sm:px-10">
        <div className="font-mono text-xs uppercase tracking-[0.4em] text-cyber-acid">{eyebrow}</div>
        <h1 className="mt-4 font-display text-4xl uppercase tracking-[0.08em] text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{description}</p>
      </div>
    </section>
  );
}
