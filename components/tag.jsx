export function Tag({ children, active = false }) {
  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.25em] ${
        active
          ? "border-cyber-acid/50 bg-cyber-acid/10 text-cyber-acid"
          : "border-cyber-line bg-white/[0.03] text-slate-300"
      }`}
    >
      {children}
    </span>
  );
}
