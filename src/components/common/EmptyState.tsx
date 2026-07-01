interface Props {
  icon?: string;
  title: string;
  description?: string;
}

export function EmptyState({ icon = "📭", title, description }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center gap-2">
      <span className="text-4xl">{icon}</span>
      <p className="font-semibold text-slate-500 dark:text-slate-400">{title}</p>
      {description && <p className="text-sm text-slate-400">{description}</p>}
    </div>
  );
}