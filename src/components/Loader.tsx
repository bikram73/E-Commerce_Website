export function Loader({ className = '' }: { className?: string }) {
  return (
    <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="h-80 animate-pulse rounded-3xl border border-zinc-200 bg-zinc-100/70" />
      ))}
    </div>
  )
}
