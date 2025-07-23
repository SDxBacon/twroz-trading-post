"use client";

import { useState } from "react";
import Pagination from "@/components/Pagination";
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
  const [filters, setFilters] = useState({
    itemName: "",
    insertCard: "",
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = 127; // This would come from API response
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    // Reset to first page when filters change
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({
      itemName: "",
      insertCard: "",
    });
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
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              篩選條件
            </h2>
            <button
              onClick={resetFilters}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
            >
              重置篩選
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Item Name Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">道具名稱</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜尋道具名稱..."
                  value={filters.itemName}
                  onChange={(e) =>
                    handleFilterChange("itemName", e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Insert Card Filter - Disabled */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-400">
                插入卡片
                <span className="ml-1 text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                  即將推出
                </span>
              </label>
              <div className="relative">
                <select
                  disabled
                  value={filters.insertCard}
                  onChange={(e) =>
                    handleFilterChange("insertCard", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-400 cursor-not-allowed"
                >
                  <option value="">選擇卡片類型...</option>
                  <option value="weapon">武器卡片</option>
                  <option value="armor">防具卡片</option>
                  <option value="accessory">飾品卡片</option>
                  <option value="headgear">頭飾卡片</option>
                </select>
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Additional Filter Placeholder */}
            <div>
              <label className="block text-sm font-medium mb-2">道具類型</label>
              <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                <option value="">所有類型</option>
                <option value="weapon">武器</option>
                <option value="armor">防具</option>
                <option value="accessory">飾品</option>
                <option value="card">卡片</option>
                <option value="consumable">消耗品</option>
                <option value="material">材料</option>
              </select>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {filters.itemName && (
                <span className="inline-flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs mr-2">
                  道具: {filters.itemName}
                  <button
                    onClick={() => handleFilterChange("itemName", "")}
                    className="ml-1 hover:text-blue-600"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              搜尋交易
            </button>
          </div>
        </div>

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
