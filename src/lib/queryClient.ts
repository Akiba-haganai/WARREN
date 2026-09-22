import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,   // 5 min before refetch — reduces redundant calls
      gcTime: 1000 * 60 * 15,     // keep in memory 15 min (covers tab-switch back)
      refetchOnWindowFocus: false,
      retry: 0,                   // Don't retry on failure — surface errors immediately
                                  // Retrying on mobile just stacks more requests behind a slow connection
    },
  },
});