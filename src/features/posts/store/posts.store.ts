import { create } from "zustand";

type SortMode = "hot" | "new" | "takes";

interface PostsUIState {
  sortMode: SortMode;
  setSortMode: (mode: SortMode) => void;
}

export const usePostsStore = create<PostsUIState>((set) => ({
  sortMode: "hot",
  setSortMode: (mode) => set({ sortMode: mode }),
}));