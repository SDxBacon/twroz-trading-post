/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// 查詢 keys 的常數
export const QUERY_KEYS = {
  TRADES: ["trades"] as const,
  TRADE_DETAIL: (id: string) => ["trades", id] as const,
  USER_OFFERS: ["user-offers"] as const,
  SEARCH_ITEMS: (query: string) => ["search-items", query] as const,
} as const;

// 模擬 API 函數 - 之後可以替換為真實的 API 調用
const mockApi = {
  getTrades: async () => {
    // 模擬 API 延遲
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 模擬交易數據
    return {
      data: [
        {
          id: "1",
          name: "+10 聖劍 [1]",
          description: "附魔: ATK +15, 命中 +10",
          price: 50000000,
          currency: "Z",
          category: "武器",
          categoryColor: "blue",
          iconEmoji: "⚔️",
          iconGradient: "bg-gradient-to-br from-orange-400 to-red-500",
          publisher: "PlayerName123",
        },
        // ... 更多模擬數據
      ],
      pagination: {
        currentPage: 1,
        totalPages: 10,
        totalItems: 127,
        itemsPerPage: 10,
      },
    };
  },

  getTradeDetail: async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      id,
      name: "+10 聖劍 [1]",
      description: "附魔: ATK +15, 命中 +10",
      price: 50000000,
      currency: "Z",
      category: "武器",
      // ... 更多詳細信息
    };
  },

  getUserOffers: async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      data: [
        // 用戶的交易提供
      ],
    };
  },
};

// 獲取交易列表的 hook
export function useTrades(filters?: any) {
  return useQuery({
    queryKey: [...QUERY_KEYS.TRADES, filters],
    queryFn: () => mockApi.getTrades(),
    enabled: true, // 總是啟用查詢
    staleTime: 1000 * 60 * 5, // 5 分鐘後數據變陳舊
  });
}

// 獲取單個交易詳情的 hook
export function useTradeDetail(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.TRADE_DETAIL(id),
    queryFn: () => mockApi.getTradeDetail(id),
    enabled: !!id, // 只有當 id 存在時才啟用查詢
  });
}

// 獲取用戶提供的交易的 hook
export function useUserOffers() {
  return useQuery({
    queryKey: QUERY_KEYS.USER_OFFERS,
    queryFn: mockApi.getUserOffers,
  });
}

// 創建新交易的 mutation hook
export function useCreateTrade() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tradeData: any) => {
      // 模擬創建交易 API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { id: Date.now().toString(), ...tradeData };
    },
    onSuccess: () => {
      // 成功後重新獲取交易列表
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TRADES });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER_OFFERS });
    },
    onError: (error) => {
      console.error("創建交易失敗:", error);
    },
  });
}

// 更新交易的 mutation hook
export function useUpdateTrade() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...updateData
    }: {
      id: string;
      [key: string]: any;
    }) => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return { id, ...updateData };
    },
    onSuccess: (data) => {
      // 更新快取中的特定交易
      queryClient.setQueryData(QUERY_KEYS.TRADE_DETAIL(data.id), data);
      // 重新獲取相關查詢
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TRADES });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER_OFFERS });
    },
  });
}

// 刪除交易的 mutation hook
export function useDeleteTrade() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { id };
    },
    onSuccess: (data) => {
      // 從快取中移除交易詳情
      queryClient.removeQueries({ queryKey: QUERY_KEYS.TRADE_DETAIL(data.id) });
      // 重新獲取交易列表
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TRADES });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER_OFFERS });
    },
  });
}
