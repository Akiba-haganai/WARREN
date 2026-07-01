import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usePostsStore } from "../store/posts.store";
import { fetchPosts, fetchHotPosts, fetchAnonymousPosts } from "../services/posts.service";

import { useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { subscribeToPosts } from "../services/posts.service";

export function usePosts() {
  const sortMode = usePostsStore((s) => s.sortMode);
  const queryClient = useQueryClient();

  const postsQuery = useQuery({
    queryKey: ["posts", sortMode],
    queryFn: async () => {
      if (sortMode === "hot") return fetchHotPosts(20);
      if (sortMode === "takes") return fetchAnonymousPosts(20);
      const res = await fetchPosts({ limit: 10, sortBy: "new" });
      return res.data;
    },
    staleTime: 1000 * 60,
  });

  // Realtime subscription
  useEffect(() => {
    const channel = subscribeToPosts(() => {
      queryClient.invalidateQueries({ queryKey: ["posts", sortMode] });
    });
    return () => {
      supabase.removeChannel(channel);
    };
  }, [sortMode, queryClient]);

  return {
    posts: postsQuery.data ?? [],
    isLoading: postsQuery.isLoading,
    isError: postsQuery.isError,
    error: postsQuery.error,
    refetch: postsQuery.refetch,
  };
}