import { useCallback } from "react";
import { useMapStore } from "../store/map.store";

export function usePinPlacement() {
  const setPendingCoords = useMapStore((s) => s.setPendingCoords);
  const openForm = useMapStore((s) => s.openForm);
  const setPlacingMode = useMapStore((s) => s.setPlacingMode);

  const handleMapClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, containerRef: React.RefObject<HTMLDivElement | null>, scale: number, offset: { x: number; y: number }) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const xImg = (e.clientX - rect.left - offset.x) / scale;
      const yImg = (e.clientY - rect.top - offset.y) / scale;
      const xPercent = (xImg / rect.width) * 100;
      const yPercent = (yImg / rect.height) * 100;
      setPendingCoords({ x: xPercent, y: yPercent });
      setPlacingMode(false);
      openForm();
    },
    [setPendingCoords, openForm, setPlacingMode]
  );

  return { handleMapClick };
}