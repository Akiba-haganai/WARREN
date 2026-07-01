interface Props {
  label: string;
  value: number;
}

export function StatBox({ label, value }: Props) {
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 p-4 text-center shadow-sm">
      <h2 className="font-bold text-xl">{value}</h2>
      <p className="text-xs opacity-70">{label}</p>
    </div>
  );
}