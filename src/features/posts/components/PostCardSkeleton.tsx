export default function PostCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-700/70 rounded-2xl overflow-hidden animate-pulse shadow-sm">
      {/* Header – matches new 40px avatar */}
      <div className="p-3 sm:p-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0" />
          <div className="flex-1 pt-0.5">
            <div className="h-3.5 w-28 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
            <div className="h-2.5 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
          </div>
        </div>
        {/* Content lines */}
        <div className="mt-3 space-y-2">
          <div className="h-3.5 bg-slate-200 dark:bg-slate-700 rounded w-full" />
          <div className="h-3.5 bg-slate-200 dark:bg-slate-700 rounded w-5/6" />
          <div className="h-3.5 bg-slate-200 dark:bg-slate-700 rounded w-3/5" />
        </div>
      </div>

      {/* Image placeholder – matches aspect-[4/3] */}
      <div className="aspect-[4/3] bg-slate-200 dark:bg-slate-700" />

      {/* Action bar skeleton */}
      <div className="flex items-center justify-between px-3 py-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
          <div className="h-8 w-12 rounded-full bg-slate-200 dark:bg-slate-700" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-12 rounded-full bg-slate-200 dark:bg-slate-700" />
          <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700" />
          <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700" />
          <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>
    </div>
  );
}