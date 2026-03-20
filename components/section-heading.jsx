export function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <div className="mb-4 font-mono text-xs uppercase tracking-[0.4em] text-cyber-acid">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="font-display text-3xl uppercase tracking-[0.08em] text-white sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-slate-400 sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
