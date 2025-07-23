"use client";

import { useState } from "react";
import Pagination from "@/components/Pagination";
import TradeFilter, { TradeFilterType } from "@/components/TradeFilter";
import TradeListTable, { TradeItem } from "./components/TradeListTable";

// Mock data for trade items
const mockTradeItems: TradeItem[] = [
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
  {
    id: "2",
    name: "+7 瓦爾基里鎧甲 [1]",
    description: "附魔: DEF +20, MDEF +15",
    price: 25000000,
    currency: "Z",
    category: "防具",
    categoryColor: "purple",
    iconEmoji: "🛡️",
    iconGradient: "bg-gradient-to-br from-purple-400 to-pink-500",
    publisher: "TraderPro",
  },
  {
    id: "3",
    name: "MVP卡片 - 波利王卡片",
    description: "效果: HP +100%, SP +50%",
    price: 999999999,
    currency: "Z",
    category: "卡片",
    categoryColor: "yellow",
    iconEmoji: "💎",
    iconGradient: "bg-gradient-to-br from-yellow-400 to-orange-500",
    publisher: "MVPHunter",
  },
];

export default function TradePage() {
  // 篩選器狀態
  const [filters, setFilters] = useState<TradeFilterType>({
    itemId: "",
    itemType: "",
    sortBy: "created_at",
    sortOrder: "desc" as "asc" | "desc",
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = 127; // This would come from API response
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 處理篩選器變更
  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    // Reset to first page when filters change
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemClick = (item: TradeItem) => {
    console.log("查看交易詳情:", item);
    // TODO: Navigate to trade detail page or open modal
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">交易市場</h1>
          <p className="text-gray-600 dark:text-gray-400">
            瀏覽和搜尋各種遊戲道具，找到您需要的交易物品
          </p>
        </div>

        {/* Filters Section */}
        <TradeFilter
          filters={filters}
          onFiltersChange={handleFiltersChange}
          className="mb-8"
        />

        {/* Trade Results Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">交易列表</h3>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  找到 127 個交易
                </span>
                <select className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm dark:bg-gray-700 dark:text-white">
                  <option>最新發布</option>
                  <option>價格由低到高</option>
                  <option>價格由高到低</option>
                  <option>最多收藏</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Trade Items */}
            <TradeListTable
              items={mockTradeItems}
              onItemClick={handleItemClick}
            />

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
