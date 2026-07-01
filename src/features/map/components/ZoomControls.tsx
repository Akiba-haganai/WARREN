import { Plus, Minus, RotateCcw } from "lucide-react";

interface Props {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export function ZoomControls({ onZoomIn, onZoomOut, onReset }: Props) {
  return (
    <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
      <button onClick={onZoomIn} className="w-8 h-8 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow flex items-center justify-center" aria-label="Zoom in">
        <Plus size={16} />
      </button>
      <button onClick={onZoomOut} className="w-8 h-8 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow flex items-center justify-center" aria-label="Zoom out">
        <Minus size={16} />
      </button>
      <button onClick={onReset} className="w-8 h-8 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow flex items-center justify-center text-xs font-bold" aria-label="Reset view">
        <RotateCcw size={14} />
      </button>
    </div>
  );
}