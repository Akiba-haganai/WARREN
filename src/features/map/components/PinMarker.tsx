import { MapPin } from "lucide-react";
import type { MapPin as MapPinType } from "../../../types/map";
import { getCat } from "../utils/categories";

interface Props {
  pin: MapPinType;
  isActive: boolean;
  isFiltered: boolean;
  onClick: () => void;
}

export function PinMarker({ pin, isActive, isFiltered, onClick }: Props) {
  const cat = getCat(pin.category);
  return (
    <button
      onClick={onClick}
      className="absolute group"
      style={{
        left: `${pin.x_percent}%`,
        top: `${pin.y_percent}%`,
        transform: "translate(-50%, -100%)",
        opacity: isFiltered ? 1 : 0.2,
        zIndex: isActive ? 30 : isFiltered ? 20 : 10,
        transition: "opacity 0.25s, transform 0.2s",
        pointerEvents: isFiltered ? "auto" : "none",
      }}
      aria-label={pin.title}
    >
      {isActive && (
        <span
          className="absolute inset-0 rounded-full animate-ping"
          style={{ backgroundColor: cat.color, opacity: 0.3 }}
        />
      )}
      <span className="flex flex-col items-center">
        <span
          className="rounded-full p-1.5 shadow-md border-2 border-white"
          style={{ backgroundColor: cat.color }}
        >
          <MapPin size={13} color="white" fill="white" />
        </span>
        <span className="w-0.5 h-2 rounded-b-full" style={{ backgroundColor: cat.color }} />
      </span>
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-gray-900 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg z-50">
        {pin.title}
      </span>
    </button>
  );
}