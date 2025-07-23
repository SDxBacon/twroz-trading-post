'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

interface QueryProviderProps {
  children: React.ReactNode;
}

export default function QueryProvider({ children }: QueryProviderProps) {
  // 使用 useState 確保 QueryClient 在客戶端只創建一次
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // 數據在 5 分鐘後變為陳舊
        staleTime: 1000 * 60 * 5,
        // 在後台重新獲取數據的時間
        refetchInterval: 1000 * 60 * 10,
        // 當窗口重新獲得焦點時重新獲取數據
        refetchOnWindowFocus: false,
        // 網絡重新連接時重新獲取數據
        refetchOnReconnect: true,
        // 重試次數
        retry: 3,
        // 重試延遲函數
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
      mutations: {
        // 變異重試次數
        retry: 1,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
