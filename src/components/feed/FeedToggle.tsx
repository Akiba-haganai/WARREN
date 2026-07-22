// src/components/feed/FeedToggle.tsx
export default function FeedToggle({
  active,
  onChange,
}: {
  active: "hot" | "new" | "takes";
  onChange: (mode: "hot" | "new" | "takes") => void;
}) {
  return (
    <div className="flex bg-slate-100 dark:bg-slate-800 rounded-full p-1">
      <button
        onClick={() => onChange("hot")}
        className={`flex-1 text-sm font-medium py-2 rounded-full transition ${
          active === "hot"
            ? "bg-white dark:bg-slate-700 shadow-sm text-blue-600"
            : "text-slate-500"
        }`}
      >
        🔥 Hot
      </button>
      <button
        onClick={() => onChange("new")}
        className={`flex-1 text-sm font-medium py-2 rounded-full transition ${
          active === "new"
            ? "bg-white dark:bg-slate-700 shadow-sm text-blue-600"
            : "text-slate-500"
        }`}
      >
        🕒 New
      </button>
      <button
        onClick={() => onChange("takes")}
        className={`flex-1 text-sm font-medium py-2 rounded-full transition ${
          active === "takes"
            ? "bg-white dark:bg-slate-700 shadow-sm text-purple-600"
            : "text-slate-500"
        }`}
      >
        🎭 Takes
      </button>
    </div>
  );
}