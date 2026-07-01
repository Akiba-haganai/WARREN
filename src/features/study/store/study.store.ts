import { create } from "zustand";

interface StudyUIState {
  search: string;
  yearFilter: string;
  typeFilter: string;
  subjectFilter: string;
  setSearch: (v: string) => void;
  setYearFilter: (v: string) => void;
  setTypeFilter: (v: string) => void;
  setSubjectFilter: (v: string) => void;
}

export const useStudyStore = create<StudyUIState>((set) => ({
  search: "",
  yearFilter: "All",
  typeFilter: "All",
  subjectFilter: "All",
  setSearch: (search) => set({ search }),
  setYearFilter: (yearFilter) => set({ yearFilter }),
  setTypeFilter: (typeFilter) => set({ typeFilter }),
  setSubjectFilter: (subjectFilter) => set({ subjectFilter }),
}));