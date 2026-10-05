export default function BooksSkeleton() {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-64 bg-brand-sky/10 animate-pulse rounded-xl" />
        ))}
      </div>
    )
  }
  
