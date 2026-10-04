
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../lib/supabase";

export interface PostReaction {
  emoji: string;
  count: number;
  userReacted: boolean;
}

export function usePostInteractions(userId: string | undefined, postIds: string[]) {
  return useQuery({
    queryKey: ["postInteractions", userId, postIds],
    queryFn: async () => {
      if (!userId || postIds.length === 0) {
        return { savedMap: {}, reactionsMap: {} as Record<string, PostReaction[]> };
      }

      // Fetch saved posts
      const { data: savedData } = await supabase
        .from("saved_posts")
        .select("post_id")
        .eq("user_id", userId)
        .in("post_id", postIds);

      const savedMap: Record<string, boolean> = {};
      (savedData || []).forEach(row => {
        if (row.post_id) savedMap[row.post_id] = true;
      });

      // Fetch reactions
      const { data: reactData } = await supabase
        .from("post_reactions")
        .select("post_id, emoji, user_id")
        .in("post_id", postIds);

      const reactionsMap: Record<string, PostReaction[]> = {};
      
      const counts: Record<string, Record<string, { count: number; userReacted: boolean }>> = {};
      
      (reactData || []).forEach(row => {
        if (!row.post_id || !row.emoji) return;
        if (!counts[row.post_id]) counts[row.post_id] = {};
        if (!counts[row.post_id][row.emoji]) {
          counts[row.post_id][row.emoji] = { count: 0, userReacted: false };
        }
        counts[row.post_id][row.emoji].count++;
        if (row.user_id === userId) {
          counts[row.post_id][row.emoji].userReacted = true;
        }
      });

      for (const postId of postIds) {
        reactionsMap[postId] = [];
        if (counts[postId]) {
          reactionsMap[postId] = Object.entries(counts[postId]).map(([emoji, { count, userReacted }]) => ({
            emoji,
            count,
            userReacted
          }));
        }
      }

      return { savedMap, reactionsMap };
    },
    enabled: !!userId && postIds.length > 0
  });
}

