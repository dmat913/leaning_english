"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

interface QueryProviderProps {
  children: ReactNode;
}

export default function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5分間はキャッシュを新鮮と見なす
            gcTime: 10 * 60 * 1000, // 10分間キャッシュを保持
            refetchOnWindowFocus: false, // ウィンドウフォーカス時の自動再取得を無効化
            refetchOnMount: false, // マウント時の自動再取得を無効化
            retry: 1, // エラー時に1回だけリトライ
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
