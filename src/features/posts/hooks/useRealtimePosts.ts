import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../lib/supabase";
import { subscribeToPosts } from "../services/posts.service";

/**
 * Subscribes to post changes (INSERT/UPDATE/DELETE)
 * and invalidates the active posts query so the feed stays fresh.
 * Must be called inside a component that lives as long as the feed is visible.
 */
export function useRealtimePosts() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = subscribeToPosts(() => {
      // Invalidate all queries that start with "posts" so the active
      // sort mode refetches automatically.
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
}