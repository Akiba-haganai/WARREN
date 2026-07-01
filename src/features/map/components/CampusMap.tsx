import { useCallback } from "react";
import { useMapStore } from "../store/map.store";
import { useMapZoom } from "../hooks/useMapZoom";
import { usePinPlacement } from "../hooks/usePinPlacement";
import { useMapFilters } from "../hooks/useMapFilters";
import { MarkerLayer } from "./MarkerLayer";
import { ZoomControls } from "./ZoomControls";
import { SearchResults } from "./SearchResults";
import { PinDrawer } from "./PinDrawer";
import { MapToast } from "./MapToast";
import type { MapPin as MapPinType } from "../../../types/map";

interface Props {
  canManage: boolean;
  onEditPin: (pin: MapPinType) => void;
  onDeletePin: (id: string) => void;
}

export function CampusMap({ canManage, onEditPin, onDeletePin }: Props) {
  // Direct store reads (we keep these here because they are UI state only)
  const pins = useMapStore((s) => s.pins);
  const activePin = useMapStore((s) => s.activePin);
  const setActivePin = useMapStore((s) => s.setActivePin);
  const query = useMapStore((s) => s.query);
  const loading = useMapStore((s) => s.loading);
  const error = useMapStore((s) => s.error);
  const placingMode = useMapStore((s) => s.placingMode);

  const { scale, offset, containerRef, handlers, resetTransform, setScale } = useMapZoom();
  const { handleMapClick } = usePinPlacement();
  const { filteredPins } = useMapFilters();

  const handlePinClick = useCallback(
    (pin: MapPinType) => setActivePin(activePin?.id === pin.id ? null : pin),
    [activePin, setActivePin]
  );

  const onMapClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (placingMode) {
        handleMapClick(e, containerRef, scale, offset);
      }
    },
    [placingMode, handleMapClick, containerRef, scale, offset]
  );

  return (
    <div className="flex-1 relative overflow-hidden bg-slate-100 dark:bg-slate-900">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/50 dark:bg-slate-950/50">
          <p className="text-sm text-slate-500">Loading map…</p>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )}

      <ZoomControls
        onZoomIn={() => setScale((prev) => Math.min(prev + 0.2, 3))}
        onZoomOut={() => setScale((prev) => Math.max(prev - 0.2, 0.5))}
        onReset={resetTransform}
      />

      <div
        ref={containerRef}
        className="absolute inset-0"
        style={{ touchAction: "none" }}
        {...handlers}
        onClick={onMapClick}
      >
        <div
          className="absolute top-0 left-0 w-full h-full origin-top-left"
          style={{
            transform: `scale(${scale}) translate(${offset.x / scale}px, ${offset.y / scale}px)`,
            transition: placingMode ? "none" : "transform 0.1s ease-out",
          }}
        >
          <img
            src="/campus-map.png"
            alt="Campus map"
            className="w-full h-full object-contain select-none pointer-events-none"
            draggable={false}
          />
          <MarkerLayer
            pins={pins}
            activePin={activePin}
            filteredIds={new Set(filteredPins.map((p) => p.id))}
            onPinClick={handlePinClick}
          />
        </div>
      </div>

      {query && filteredPins.length > 0 && !activePin && (
        <SearchResults results={filteredPins} onSelect={setActivePin} />
      )}

      {activePin && (
        <PinDrawer
          pin={activePin}
          canManage={canManage}
          onClose={() => setActivePin(null)}
          onEdit={onEditPin}
          onDelete={onDeletePin}
        />
      )}

      <MapToast />
    </div>
  );
}