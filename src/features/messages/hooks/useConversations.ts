import { useQuery } from "@tanstack/react-query";
import { fetchConversations } from "../services/messages.service";
import { useAuthStore } from "../../../store/authStore";

export function useConversations() {
  const user = useAuthStore((s) => s.user);
  return useQuery({
    queryKey: ["conversations", user?.id],
    queryFn: () => fetchConversations(user!.id),
    enabled: !!user,
  });
}