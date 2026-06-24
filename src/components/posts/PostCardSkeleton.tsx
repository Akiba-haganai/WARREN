export default function PostCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden animate-pulse shadow-sm">
      {/* Header */}
      <div className="p-3 sm:p-4">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
          <div className="flex-1">
            <div className="h-3.5 w-28 bg-slate-200 dark:bg-slate-800 rounded mb-1.5" />
            <div className="h-3 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
        </div>
        <div className="mt-3 space-y-2">
          <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-4/5" />
          <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-3/5" />
        </div>
      </div>

      {/* Optional image placeholder (rarely shown) */}
      <div className="aspect-[16/9] bg-slate-200 dark:bg-slate-800" />

      {/* Action bar */}
      <div className="px-2 py-2 sm:px-3 sm:py-2">
        <div className="grid grid-cols-5 gap-1.5">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-10 rounded-xl bg-slate-200 dark:bg-slate-800"
            />
          ))}
        </div>
      </div>

      {/* Reactions */}
      <div className="px-3 pb-2 flex gap-1.5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-8 w-12 rounded-full bg-slate-200 dark:bg-slate-800" />
        ))}
      </div>
    </div>
  );
}