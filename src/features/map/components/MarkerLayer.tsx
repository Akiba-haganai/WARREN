import { PinMarker } from "./PinMarker";
import type { MapPin as MapPinType } from "../../../types/map";

interface Props {
  pins: MapPinType[];
  activePin: MapPinType | null;
  filteredIds: Set<string>;
  onPinClick: (pin: MapPinType) => void;
}

export function MarkerLayer({ pins, activePin, filteredIds, onPinClick }: Props) {
  return (
    <div className="absolute inset-0">
      {pins.map((pin) => (
        <PinMarker
          key={pin.id}
          pin={pin}
          isActive={activePin?.id === pin.id}
          isFiltered={filteredIds.has(pin.id)}
          onClick={() => onPinClick(pin)}
        />
      ))}
    </div>
  );
}