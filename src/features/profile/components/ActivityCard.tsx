interface Props {
  type: "post" | "comment";
  content: string;
  date: string;
}

export function ActivityCard({ type, content, date }: Props) {
  return (
    <div className="rounded-xl bg-white dark:bg-slate-900 p-3 shadow-sm border border-slate-100 dark:border-slate-800">
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
        {type === "post" ? "Posted" : "Commented"}
      </p>
      <p className="text-sm text-slate-700 dark:text-slate-200 line-clamp-2">{content}</p>
      <p className="text-[11px] text-slate-400 mt-1">{new Date(date).toLocaleDateString()}</p>
    </div>
  );
}