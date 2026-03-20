export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="space-y-6 text-center">
        <div className="mx-auto h-16 w-16 animate-spin rounded-full border-2 border-cyber-neon/25 border-t-cyber-acid" />
        <div className="font-mono text-sm uppercase tracking-[0.35em] text-cyber-neon">
          Initializing secure workspace
        </div>
      </div>
    </div>
  );
}
