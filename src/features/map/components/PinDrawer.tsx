import { X, Pencil, Trash2, Camera, Navigation, ExternalLink, Info } from "lucide-react";
import type { MapPin as MapPinType } from "../../../types/map";
import { getCat } from "../utils/categories";
import { useState } from "react";

interface Props {
  pin: MapPinType;
  canManage: boolean;
  onClose: () => void;
  onEdit: (pin: MapPinType) => void;
  onDelete: (id: string) => void;
}

export function PinDrawer({ pin, canManage, onClose, onEdit, onDelete }: Props) {
  const cat = getCat(pin.category);
  const [photoIdx, setPhotoIdx] = useState(0);

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-slate-900 rounded-t-3xl shadow-2xl border-t border-slate-200 dark:border-slate-700 transition-transform duration-300 z-40 overflow-y-auto" style={{ maxHeight: "60vh", padding: "20px 16px 32px", transform: "translateY(0)" }}>
      <div className="w-10 h-1 bg-slate-300 dark:bg-slate-600 rounded-full mx-auto mb-4" />
      <div className="flex items-center justify-between mb-3">
        <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${cat.bg} ${cat.border}`} style={{ color: cat.color }}>
          {cat.icon} {cat.label}
        </span>
        <div className="flex items-center gap-2">
          {canManage && (
            <>
              <button onClick={() => onEdit(pin)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500" aria-label="Edit location">
                <Pencil size={15} />
              </button>
              <button onClick={() => onDelete(pin.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500" aria-label="Delete location">
                <Trash2 size={15} />
              </button>
            </>
          )}
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500" aria-label="Close details">
            <X size={16} />
          </button>
        </div>
      </div>
      <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1 leading-tight">{pin.title}</h2>
      {pin.photos && pin.photos.length > 0 ? (
        <div className="relative rounded-xl overflow-hidden mb-3 bg-slate-100 dark:bg-slate-800" style={{ height: 160 }}>
          <img src={pin.photos[photoIdx]} alt={`${pin.title} photo ${photoIdx + 1}`} className="w-full h-full object-cover" />
          {pin.photos.length > 1 && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
              {pin.photos.map((_, i) => (
                <button key={i} onClick={() => setPhotoIdx(i)} className={`w-1.5 h-1.5 rounded-full transition-all ${i === photoIdx ? "bg-white scale-125" : "bg-white/50"}`} aria-label={`Photo ${i + 1}`} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-xl bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center gap-1 mb-3" style={{ height: 100 }}>
          <Camera size={22} className="text-slate-300 dark:text-slate-600" />
          <span className="text-xs text-slate-400 dark:text-slate-500">No photos yet</span>
        </div>
      )}
      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">{pin.description}</p>
      {pin.floor && (
        <div className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
          <Navigation size={13} className="mt-0.5 shrink-0" />
          <span>{pin.floor}</span>
        </div>
      )}
      {pin.hours && (
        <div className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
          <Info size={13} className="mt-0.5 shrink-0" />
          <span>{pin.hours}</span>
        </div>
      )}
      {pin.contact && (
        <div className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
          <ExternalLink size={13} className="mt-0.5 shrink-0" />
          <a href={`mailto:${pin.contact}`} className="text-blue-600 dark:text-blue-400 underline">{pin.contact}</a>
        </div>
      )}
    </div>
  );
}