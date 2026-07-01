import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchConversation, sendDirectMessage } from "../services/messages.service";
import { useAuthStore } from "../../../store/authStore";

export function useDirectMessages(partnerId: string | undefined) {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);

  const messagesQuery = useQuery({
    queryKey: ["directMessages", user?.id, partnerId],
    queryFn: () => fetchConversation(user!.id, partnerId!),
    enabled: !!user && !!partnerId,
  });

  const sendMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!user || !partnerId) throw new Error("Not authenticated");
      return sendDirectMessage(user.id, partnerId, content);
    },
    onSuccess: (newMsg) => {
      queryClient.setQueryData(["directMessages", user?.id, partnerId], (old: any) => (old ? [...old, newMsg] : [newMsg]));
    },
  });

  return {
    messages: messagesQuery.data ?? [],
    isLoading: messagesQuery.isLoading,
    send: sendMutation.mutate,
    isSending: sendMutation.isPending,
  };
}