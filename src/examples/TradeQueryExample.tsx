// 範例：如何在組件中使用 React Query hooks

"use client";

import { useState } from "react";
import { useTrades, useCreateTrade } from "@/hooks/useTrades";

export default function TradeQueryExample() {
  const [filters, setFilters] = useState({});

  // 使用查詢 hook
  const {
    data: tradesData,
    isLoading,
    isError,
    error,
    refetch,
  } = useTrades(filters);

  // 使用變異 hook
  const createTradeMutation = useCreateTrade();

  const handleCreateTrade = () => {
    createTradeMutation.mutate({
      name: "新交易物品",
      price: 1000000,
      description: "測試物品描述",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">載入中...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-red-700">載入失敗: {error?.message}</p>
            <button
              onClick={() => refetch()}
              className="mt-2 text-sm text-red-600 hover:text-red-500 underline"
            >
              重新載入
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          交易列表 ({tradesData?.pagination.totalItems} 個交易)
        </h2>
        <button
          onClick={handleCreateTrade}
          disabled={createTradeMutation.isPending}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg"
        >
          {createTradeMutation.isPending ? "創建中..." : "創建交易"}
        </button>
      </div>

      {/* 交易列表 */}
      <div className="grid gap-4">
        {tradesData?.data.map((trade: any) => (
          <div key={trade.id} className="bg-white p-4 rounded-lg shadow border">
            <h3 className="font-medium">{trade.name}</h3>
            <p className="text-gray-600 text-sm">{trade.description}</p>
            <p className="text-lg font-semibold text-blue-600">
              {trade.price.toLocaleString()} {trade.currency}
            </p>
          </div>
        ))}
      </div>

      {/* 分頁信息 */}
      {tradesData?.pagination && (
        <div className="text-center text-sm text-gray-500">
          第 {tradesData.pagination.currentPage} 頁，共{" "}
          {tradesData.pagination.totalPages} 頁
        </div>
      )}
    </div>
  );
}
