export default function PostCardSkeleton() {
  return (
    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200/70 dark:border-slate-700/70 rounded-2xl overflow-hidden animate-pulse shadow-sm">
      <div className="p-2.5 sm:p-3">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-slate-200/80 dark:bg-slate-700/80 shrink-0" />
          <div className="flex-1">
            <div className="h-3 w-24 bg-slate-200/80 dark:bg-slate-700/80 rounded mb-1" />
            <div className="h-2.5 w-14 bg-slate-200/80 dark:bg-slate-700/80 rounded" />
          </div>
        </div>
        <div className="mt-2 space-y-1.5">
          <div className="h-2.5 bg-slate-200/80 dark:bg-slate-700/80 rounded" />
          <div className="h-2.5 bg-slate-200/80 dark:bg-slate-700/80 rounded w-4/5" />
          <div className="h-2.5 bg-slate-200/80 dark:bg-slate-700/80 rounded w-3/5" />
        </div>
      </div>
      <div className="aspect-[16/9] bg-slate-200/80 dark:bg-slate-700/80" />
      <div className="px-1.5 py-1.5 sm:px-2 sm:py-1.5">
        <div className="grid grid-cols-5 gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-9 rounded-xl bg-slate-200/80 dark:bg-slate-700/80" />
          ))}
        </div>
      </div>
      <div className="px-2.5 pb-2 flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-7 w-10 rounded-full bg-slate-200/80 dark:bg-slate-700/80" />
        ))}
      </div>
    </div>
  );
}