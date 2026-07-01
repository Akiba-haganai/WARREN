import { create } from "zustand";
import { fetchAllPins, createPin, updatePin, deletePin, type CreateMapPinParams } from "../services/map.service";
import type { MapPin, PinCategory } from "../../../types/map";

interface MapStore {
  pins: MapPin[];
  loading: boolean;
  error: string | null;
  activePin: MapPin | null;
  query: string;
  activeCategories: Set<PinCategory>;
  placingMode: boolean;
  pendingCoords: { x: number; y: number } | null;
  showForm: boolean;
  editingPin: MapPin | null;
  toast: { message: string; type: "ok" | "err" } | null;

  loadPins: () => Promise<void>;
  addPin: (params: CreateMapPinParams) => Promise<void>;
  editPin: (id: string, params: Partial<CreateMapPinParams>) => Promise<void>;
  removePin: (id: string) => Promise<void>;
  setActivePin: (pin: MapPin | null) => void;
  setQuery: (q: string) => void;
  toggleCategory: (cat: PinCategory) => void;
  setActiveCategories: (cats: Set<PinCategory>) => void;
  clearFilters: () => void;
  setPlacingMode: (v: boolean) => void;
  setPendingCoords: (c: { x: number; y: number } | null) => void;
  openForm: (editPin?: MapPin) => void;
  closeForm: () => void;
  showToast: (message: string, type?: "ok" | "err") => void;
  hideToast: () => void;
}

export const useMapStore = create<MapStore>((set, get) => ({
  pins: [],
  loading: true,
  error: null,
  activePin: null,
  query: "",
  activeCategories: new Set(),
  placingMode: false,
  pendingCoords: null,
  showForm: false,
  editingPin: null,
  toast: null,

  loadPins: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchAllPins();
      set({ pins: data, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to load pins", loading: false });
    }
  },

  addPin: async (params) => {
    const created = await createPin(params);
    set((s) => ({ pins: [created, ...s.pins] }));
  },

  editPin: async (id, params) => {
    const updated = await updatePin({ id, ...params });
    set((s) => ({
      pins: s.pins.map((p) => (p.id === id ? updated : p)),
      activePin: s.activePin?.id === id ? updated : s.activePin,
    }));
  },

  removePin: async (id) => {
    await deletePin(id);
    set((s) => ({
      pins: s.pins.filter((p) => p.id !== id),
      activePin: s.activePin?.id === id ? null : s.activePin,
    }));
  },

  setActivePin: (pin) => set({ activePin: pin }),

  setQuery: (q) => set({ query: q, activeCategories: new Set() }),

  toggleCategory: (cat) => {
    const current = get().activeCategories;
    const next = new Set(current);
    if (next.has(cat)) next.delete(cat);
    else next.add(cat);
    set({ activeCategories: next, activePin: null });
  },

  setActiveCategories: (cats) => set({ activeCategories: cats, activePin: null }),

  clearFilters: () => set({ activeCategories: new Set(), query: "", activePin: null }),

  setPlacingMode: (v) => set({ placingMode: v }),

  setPendingCoords: (coords) => set({ pendingCoords: coords }),

  openForm: (editPin) =>
    set({
      showForm: true,
      editingPin: editPin ?? null,
      activePin: null,
      placingMode: false,   // ensure placing mode is off when opening form directly
    }),

  closeForm: () =>
    set({
      showForm: false,
      editingPin: null,
      pendingCoords: null,
      placingMode: false,
    }),

  showToast: (message, type = "ok") => {
    set({ toast: { message, type } });
    setTimeout(() => set({ toast: null }), 3000);
  },

  hideToast: () => set({ toast: null }),
}));