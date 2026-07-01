import { useMutation, useQueryClient } from "@tanstack/react-query";
import { votePost } from "../services/posts.service";
import { supabase } from "../../../lib/supabase";

export function usePostVote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId, type }: { postId: string; type: "up" | "down" }) => {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error("Not authenticated");
      await votePost(postId, user.id, type);
    },
    onMutate: async ({ postId, type }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      // Snapshot previous data
      const previousAll = queryClient.getQueriesData({ queryKey: ["posts"] });
      // Apply optimistic update
      queryClient.setQueriesData({ queryKey: ["posts"] }, (old: any) => {
        if (!old) return old;
        return old.map((p: any) => {
          if (p.id !== postId) return p;
          if (type === "up") return { ...p, upvotes: (p.upvotes ?? 0) + 1 };
          if (type === "down") return { ...p, downvotes: (p.downvotes ?? 0) + 1 };
          return p;
        });
      });
      return { previousAll };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousAll) {
        for (const [queryKey, data] of context.previousAll) {
          queryClient.setQueryData(queryKey, data);
        }
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}