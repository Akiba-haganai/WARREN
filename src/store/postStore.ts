import { create } from "zustand";
import {
  fetchPosts,
  fetchHotPosts,
  votePost,
  deletePost,
  subscribeToPosts,
} from "../services/oldpostsService";
import type { PostWithProfile } from "../services/oldpostsService";
import { supabase } from "../lib/supabase";

interface PostStore {
  posts: PostWithProfile[];
  userVotes: Record<string, "up" | "down" | null>;
  loading: boolean;
  loadingMore: boolean;
  error: string;
  cursor: string | null;
  hasMore: boolean;
  sortMode: "hot" | "new";

  setSortMode: (mode: "hot" | "new") => void;
  loadPosts: (refetch?: boolean) => Promise<void>;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  vote: (postId: string, type: "up" | "down") => Promise<void>;
  removePost: (postId: string) => Promise<void>;
  startRealtime: () => () => void;
  loadUserVotes: (postIds: string[], userId: string) => Promise<void>;
}

export const usePostStore = create<PostStore>((set, get) => ({
  posts: [],
  userVotes: {},
  loading: true,
  loadingMore: false,
  error: "",
  cursor: null,
  hasMore: true,
  sortMode: "hot",

  setSortMode: (mode) => {
    set({ sortMode: mode, posts: [], cursor: null, hasMore: true });
    get().loadPosts(true);
  },

  loadPosts: async (refetch = false) => {
    const { sortMode } = get();
    try {
      set({ loading: true, error: "" });
      if (sortMode === "hot") {
        const data = await fetchHotPosts(20);
        set({ posts: data, hasMore: false, loading: false });
        const userId = (await supabase.auth.getUser()).data.user?.id;
        if (userId) get().loadUserVotes(data.map(p => p.id), userId);
        return;
      }

      // Convert null cursor to undefined for type safety
      const currentCursor = get().cursor;
      const result = await fetchPosts({
        cursor: refetch ? undefined : (currentCursor ?? undefined),
        sortBy: "new",
      });
      const newPosts = refetch ? result.data : [...get().posts, ...result.data];
      set({
        posts: newPosts,
        cursor: result.nextCursor,
        hasMore: Boolean(result.nextCursor),
        loading: false,
      });
      const userId = (await supabase.auth.getUser()).data.user?.id;
      if (userId) get().loadUserVotes(result.data.map(p => p.id), userId);
    } catch (err: any) {
      set({ error: err.message || "Failed to load posts", loading: false });
    }
  },

  loadMore: async () => {
    if (get().loadingMore || !get().hasMore || get().sortMode === "hot") return;
    set({ loadingMore: true });
    try {
      const currentCursor = get().cursor;
      const result = await fetchPosts({
        cursor: currentCursor ?? undefined,
        sortBy: "new",
      });
      set(state => ({
        posts: [...state.posts, ...result.data],
        cursor: result.nextCursor,
        hasMore: Boolean(result.nextCursor),
        loadingMore: false,
      }));
      const userId = (await supabase.auth.getUser()).data.user?.id;
      if (userId) get().loadUserVotes(result.data.map(p => p.id), userId);
    } catch {
      set({ loadingMore: false });
    }
  },

  refresh: async () => {
    await get().loadPosts(true);
  },

  vote: async (postId, type) => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return;

    const currentVote = get().userVotes[postId] ?? null;
    const newVote = currentVote === type ? null : type;

    // Optimistic local update
    set(state => ({
      userVotes: { ...state.userVotes, [postId]: newVote },
      posts: state.posts.map(p => {
        if (p.id !== postId) return p;
        let up = p.upvotes ?? 0;
        let down = p.downvotes ?? 0;
        if (currentVote === "up") up = Math.max(0, up - 1);
        else if (currentVote === "down") down = Math.max(0, down - 1);
        if (newVote === "up") up += 1;
        else if (newVote === "down") down += 1;
        return { ...p, upvotes: up, downvotes: down };
      }),
    }));

    try {
      await votePost(postId, user.id, type);
    } catch {
      // Rollback on failure
      set(state => ({
        userVotes: { ...state.userVotes, [postId]: currentVote },
      }));
    }
  },

  removePost: async (postId) => {
    const prev = get().posts;
    set(state => ({ posts: state.posts.filter(p => p.id !== postId) }));
    try {
      await deletePost(postId);
    } catch {
      set({ posts: prev });
    }
  },

  startRealtime: () => {
    const channel = subscribeToPosts((payload: any) => {
      const { eventType, new: newPost, old: oldPost } = payload;
      if (eventType === "INSERT") {
        set(state => ({ posts: [newPost as PostWithProfile, ...state.posts] }));
      } else if (eventType === "UPDATE") {
        set(state => ({
          posts: state.posts.map(p =>
            p.id === (newPost as PostWithProfile).id
              ? { ...p, ...(newPost as PostWithProfile) }
              : p
          ),
        }));
      } else if (eventType === "DELETE") {
        set(state => ({
          posts: state.posts.filter(p => p.id !== oldPost.id),
        }));
      }
    });
    return () => supabase.removeChannel(channel);
  },

  loadUserVotes: async (postIds, userId) => {
    if (postIds.length === 0) return;
    const { data, error } = await supabase
      .from("post_votes")
      .select("post_id, vote_type")
      .in("post_id", postIds)
      .eq("user_id", userId);
    if (error || !data) return;
    const votes: Record<string, "up" | "down" | null> = {};
    data.forEach((v: any) => {
      votes[v.post_id] = v.vote_type;
    });
    set(state => ({ userVotes: { ...state.userVotes, ...votes } }));
  },
}));