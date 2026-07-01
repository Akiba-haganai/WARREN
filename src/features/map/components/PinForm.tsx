import { useState, useEffect } from "react";
import { X, MapPin } from "lucide-react";
import { CATEGORIES } from "../utils/categories";
import type { PinCategory } from "../../../types/map";

export interface PinFormData {
  title: string;
  description: string;
  category: PinCategory;
  floor: string;
  hours: string;
  contact: string;
  x_percent: number;
  y_percent: number;
  photos: string[];
}

interface Props {
  initial?: Partial<PinFormData>;
  pendingCoords: { x: number; y: number } | null;
  onSave: (data: PinFormData) => void;
  onCancel: () => void;
  onRequestPlace: () => void;
}

export function PinForm({ initial, pendingCoords, onSave, onCancel, onRequestPlace }: Props) {
  const [form, setForm] = useState<PinFormData>({
    title: initial?.title ?? "",
    description: initial?.description ?? "",
    category: initial?.category ?? "general",
    floor: initial?.floor ?? "",
    hours: initial?.hours ?? "",
    contact: initial?.contact ?? "",
    x_percent: initial?.x_percent ?? 50,
    y_percent: initial?.y_percent ?? 50,
    photos: initial?.photos ?? [],
  });

  useEffect(() => {
    if (pendingCoords) {
      setForm((f) => ({ ...f, x_percent: pendingCoords.x, y_percent: pendingCoords.y }));
    }
  }, [pendingCoords]);

  const valid = form.title.trim() && form.description.trim();

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-slate-900 rounded-t-3xl shadow-2xl border-t border-slate-200 dark:border-slate-700 transition-transform duration-300 z-50 overflow-y-auto" style={{ maxHeight: "90vh", padding: "20px 16px 48px", transform: "translateY(0)" }}>
      <div className="w-10 h-1 bg-slate-300 dark:bg-slate-600 rounded-full mx-auto mb-4" />
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-white">
          {initial?.title ? "Edit Location" : "Add New Location"}
        </h3>
        <button onClick={onCancel} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700" aria-label="Close form">
          <X size={16} className="text-slate-500" />
        </button>
      </div>

      {/* Position selector */}
      <div className="mb-3">
        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Pin Position</label>
        <button
          onClick={onRequestPlace}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-blue-400 text-left"
        >
          <MapPin size={15} />
          <span className="text-xs">
            Position set ({Math.round(form.x_percent)}%, {Math.round(form.y_percent)}%) — tap to reposition
          </span>
        </button>
      </div>

      {/* Title */}
      <div className="mb-3">
        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Location Name *</label>
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. Academic Registrar's Office"
        />
      </div>

      {/* Category */}
      <div className="mb-3">
        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Category *</label>
        <div className="grid grid-cols-3 gap-1.5">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => setForm({ ...form, category: c.key })}
              className={`flex items-center gap-1 px-2 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                form.category === c.key
                  ? `${c.bg} ${c.border} font-semibold`
                  : "border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"
              }`}
              style={{ color: form.category === c.key ? c.color : undefined }}
            >
              {c.icon}
              <span className="truncate">{c.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="mb-3">
        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Description *</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="What happens here? What should freshers bring? Any tips?"
          rows={3}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {(["floor", "hours", "contact"] as const).map((key) => (
        <div key={key} className="mb-3">
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 capitalize">
            {key === "floor" ? "Floor / Building" : key === "hours" ? "Opening Hours" : "Contact / Email"}
          </label>
          <input
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}

      {/* Photos */}
      <div className="mb-3">
        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Photo URLs (comma-separated)</label>
        <input
          value={form.photos.join(", ")}
          onChange={(e) =>
            setForm({ ...form, photos: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })
          }
          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-slate-400 mt-1">Add landmark photos so freshers can recognise the building.</p>
      </div>

      <button
        onClick={() => valid && onSave(form)}
        disabled={!valid}
        className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all ${
          valid ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed"
        }`}
      >
        {initial?.title ? "Save Changes" : "Add Location"}
      </button>
    </div>
  );
}