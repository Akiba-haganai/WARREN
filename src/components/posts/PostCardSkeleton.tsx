export default function PostCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 shadow-sm animate-pulse">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700" />
        <div className="space-y-1">
          <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded" />
        <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded" />
      </div>
      <div className="flex gap-4 mt-4">
        <div className="h-8 w-16 bg-slate-200 dark:bg-slate-700 rounded-full" />
        <div className="h-8 w-16 bg-slate-200 dark:bg-slate-700 rounded-full" />
        <div className="h-8 w-10 bg-slate-200 dark:bg-slate-700 rounded-full" />
      </div>
    </div>
  );
}