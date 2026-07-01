import { create } from "zustand";

type FilterType = "all" | "social" | "educational";

interface CommunitiesUIState {
  filterType: FilterType;
  selectedParentId: string | null;
  selectedYear: string | null;
  setFilterType: (t: FilterType) => void;
  setSelectedParentId: (id: string | null) => void;
  setSelectedYear: (year: string | null) => void;
}

export const useCommunitiesStore = create<CommunitiesUIState>((set) => ({
  filterType: "all",
  selectedParentId: null,
  selectedYear: null,
  setFilterType: (t) => set({ filterType: t, selectedParentId: null, selectedYear: null }),
  setSelectedParentId: (id) => set({ selectedParentId: id }),
  setSelectedYear: (year) => set({ selectedYear: year }),
}));