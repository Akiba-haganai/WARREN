import { useMutation, useQueryClient } from "@tanstack/react-query";
import { suggestPin } from "../services/map.service";
import type { CreateMapPinParams } from "../services/map.service";

export function useSuggestPin() {
  const queryClient = useQueryClient();

  const suggestMutation = useMutation({
    mutationFn: (params: CreateMapPinParams) => suggestPin(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingPins"] });
    },
  });

  return {
    suggest: suggestMutation.mutateAsync,
    isSuggesting: suggestMutation.isPending,
  };
}
