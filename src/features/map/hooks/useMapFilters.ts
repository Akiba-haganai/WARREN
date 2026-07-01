import { useMemo } from "react";
import { useMapStore } from "../store/map.store";
import { getCat } from "../utils/categories";

export function useMapFilters() {
  const pins = useMapStore((s) => s.pins);
  const query = useMapStore((s) => s.query);
  const activeCategories = useMapStore((s) => s.activeCategories);

  const filteredPins = useMemo(() => {
    return pins.filter((p) => {
      const matchCat = activeCategories.size === 0 || activeCategories.has(p.category);
      const q = query.toLowerCase();
      const catLabel = getCat(p.category).label.toLowerCase();
      const matchQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        catLabel.includes(q);
      return matchCat && matchQ;
    });
  }, [pins, query, activeCategories]);

  return { filteredPins };
}