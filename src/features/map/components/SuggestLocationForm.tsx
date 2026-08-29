import { useState } from "react";
import { X } from "lucide-react";
import { useSuggestPin } from "../hooks/useSuggestPin";
import { CATEGORIES } from "../utils/categories";
import type { CreateMapPinParams } from "../services/map.service";
import type { PinCategory } from "../../../types/map";

interface Props {
  x_percent: number;
  y_percent: number;
  onSaved: () => void;
  onCancel: () => void;
}

export function SuggestLocationForm({ x_percent, y_percent, onSaved, onCancel }: Props) {
  const { suggest, isSuggesting } = useSuggestPin();
  const [form, setForm] = useState<{
    title: string;
    description: string;
    category: PinCategory;
    floor: string;
    hours: string;
    contact: string;
  }>({
    title: "",
    description: "",
    category: (CATEGORIES[0]?.key as PinCategory) ?? "general",
    floor: "",
    hours: "",
    contact: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) return;
    const params: CreateMapPinParams = {
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      floor: form.floor || undefined,
      hours: form.hours || undefined,
      contact: form.contact || undefined,
      x_percent,
      y_percent,
    };
    await suggest(params);
    onSaved();
  };

  return (
    <div className="fixed inset-0 z-30 flex items-end sm:items-center sm:justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <form
        onSubmit={handleSubmit}
        className="relative w-full sm:max-w-md bg-white dark:bg-slate-950 rounded-t-2xl sm:rounded-2xl p-4 flex flex-col gap-2 max-h-[85vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">Suggest a Location</h2>
          <button type="button" onClick={onCancel} aria-label="Close" className="text-slate-400">
            <X size={18} />
          </button>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 -mt-1 mb-1">
          A moderator will review this before it appears on the map for everyone.
        </p>

        <input
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          placeholder="Location name"
          className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          placeholder="What is this place?"
          rows={3}
          className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm text-slate-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <select
          value={form.category}
          onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as PinCategory }))}
          className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.key} value={cat.key}>
              {cat.label}
            </option>
          ))}
        </select>
        <div className="grid grid-cols-2 gap-2">
          <input
            value={form.floor}
            onChange={(e) => setForm((f) => ({ ...f, floor: e.target.value }))}
            placeholder="Floor (optional)"
            className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            value={form.hours}
            onChange={(e) => setForm((f) => ({ ...f, hours: e.target.value }))}
            placeholder="Hours (optional)"
            className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <input
          value={form.contact}
          onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))}
          placeholder="Contact (optional)"
          className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={isSuggesting}
          className="mt-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold py-2 rounded-lg transition-all"
        >
          {isSuggesting ? "Submitting…" : "Submit for Review"}
        </button>
      </form>
    </div>
  );
}
