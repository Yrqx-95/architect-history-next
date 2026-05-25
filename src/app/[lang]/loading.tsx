export default function Loading() {
  return (
    <div className="fade-in py-20 text-center">
      <div className="skeleton h-8 w-64 mx-auto mb-6" />
      <div className="skeleton h-4 w-96 mx-auto mb-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto mt-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden">
            <div className="skeleton aspect-[4/3]" />
            <div className="p-4 space-y-2">
              <div className="skeleton h-4 w-3/4" />
              <div className="skeleton h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
