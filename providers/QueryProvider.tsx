"use client";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";
import { getErrorMessage } from "@/lib/api/errors";
import { useToastStore } from "@/lib/stores/toastStore";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => {
            useToastStore.getState().show(getErrorMessage(error));
          },
        }),
        mutationCache: new MutationCache({
          onError: (error) => {
            useToastStore.getState().show(getErrorMessage(error));
          },
        }),
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
