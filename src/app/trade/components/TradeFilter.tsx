"use client";

import { useState } from "react";
// import shared constants
import { ROItemId } from "@/constants/ro/item";

/**
 * 基本篩選條件介面
 * @interface BasicFilters
 * @property {ROItemId | ""} itemId - The ID of the Ragnarok Online item to filter by, or an empty string for no filter.
 */
interface BasicFilters {
  itemId: ROItemId | "";
}

// 進階篩選條件介面
// TODO:
interface AdvancedFilters {
  itemType: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

export type TradeFilterType = BasicFilters & AdvancedFilters;

/**
 * Props for the TradeFilter component.
 * @interface TradeFilterProps
 * @property {TradeFilterType} filters - The current filter settings for trades.
 * @property {function} onFiltersChange - Callback function triggered when filters are changed.
 * @property {string} [className] - Optional CSS class name for styling the component.
 */
interface TradeFilterProps {
  filters: TradeFilterType;
  onFiltersChange: (filters: TradeFilterType) => void;
  className?: string;
}

export default function TradeFilter({
  filters,
  onFiltersChange,
  className = "",
}: TradeFilterProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  // 道具分類選項
  const categories = [
    { value: "", label: "全部分類" },
    { value: "weapon", label: "武器" },
    { value: "armor", label: "防具" },
    { value: "consumable", label: "消耗品" },
    { value: "card", label: "卡片" },
    { value: "material", label: "材料" },
    { value: "etc", label: "其他" },
  ];

  // 武器類型選項
  const weaponTypes = [
    { value: "", label: "全部武器" },
    { value: "sword", label: "劍" },
    { value: "spear", label: "矛" },
    { value: "axe", label: "斧" },
    { value: "mace", label: "錘" },
    { value: "bow", label: "弓" },
    { value: "staff", label: "法杖" },
    { value: "katar", label: "拳刃" },
  ];

  // 防具類型選項
  const armorTypes = [
    { value: "", label: "全部防具" },
    { value: "helmet", label: "頭盔" },
    { value: "armor", label: "鎧甲" },
    { value: "shield", label: "盾牌" },
    { value: "garment", label: "披肩" },
    { value: "shoes", label: "鞋子" },
    { value: "accessory", label: "飾品" },
  ];

  // 排序選項
  const sortOptions = [
    { value: "created_at", label: "上架時間" },
    { value: "price", label: "價格" },
    { value: "name", label: "物品名稱" },
    { value: "refine_level", label: "精煉等級" },
  ];

  // 更新 filter
  const handleUpdateFilter = (
    key: keyof TradeFilterType,
    value: string | "asc" | "desc"
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  // 重置所有篩選
  const resetFilters = () => {
    const resetBasicFilters: BasicFilters = {
      itemId: "",
    };
    const resetAdvancedFilters: AdvancedFilters = {
      itemType: "",
      sortBy: "created_at",
      sortOrder: "desc",
    };
    onFiltersChange({ ...resetBasicFilters, ...resetAdvancedFilters });
  };

  // 根據分類動態獲取子類型選項
  const getSubTypeOptions = () => {
    // if (filters.category === "weapon") return weaponTypes;
    // if (filters.category === "armor") return armorTypes;
    return [{ value: "", label: "全部類型" }];
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 ${className}`}
    >
      {/* 基本篩選 - Level 1 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            篩選條件
          </h3>
          <button
            onClick={resetFilters}
            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
          >
            重置篩選
          </button>
        </div>

        {/* 第一行：搜尋和分類 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              搜尋物品
            </label>
            <input
              type="text"
              value={filters.itemId}
              onChange={(e) => handleUpdateFilter("itemId", e.target.value)}
              placeholder="輸入物品名稱..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              物品分類
            </label>
            <select
              value={filters.itemType}
              onChange={(e) => handleUpdateFilter("itemType", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 第二行：價格範圍 */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              最低價格
            </label>
            <input
              type="number"
              min="0"
              value={filters.minPrice}
              onChange={(e) => handleUpdateFilter("minPrice", e.target.value)}
              placeholder="0"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              最高價格
            </label>
            <input
              type="number"
              min="0"
              value={filters.maxPrice}
              onChange={(e) => handleUpdateFilter("maxPrice", e.target.value)}
              placeholder="無上限"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div> */}
      </div>

      {/* 進階篩選切換按鈕 */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
        >
          <span>{showAdvanced ? "隱藏" : "顯示"}進階篩選</span>
          <svg
            className={`ml-1 h-4 w-4 transform transition-transform ${
              showAdvanced ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* 進階篩選 - Level 2 */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600 space-y-4">
          <h4 className="text-md font-medium text-gray-800 dark:text-gray-200">
            進階篩選選項
          </h4>

          {/* 第一行：子類型和賣家 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                物品類型
              </label>
              <select
                value={filters.itemType}
                onChange={(e) => handleUpdateFilter("itemType", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {getSubTypeOptions().map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                賣家名稱
              </label>
              <input
                type="text"
                value={filters.seller}
                onChange={(e) => handleUpdateFilter("seller", e.target.value)}
                placeholder="輸入賣家名稱..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div> */}
          </div>

          {/* 第二行：精煉等級範圍 */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                最低精煉
              </label>
              <input
                type="number"
                min="0"
                max="20"
                value={filters.minRefine}
                onChange={(e) =>
                  handleUpdateFilter("minRefine", e.target.value)
                }
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                最高精煉
              </label>
              <input
                type="number"
                min="0"
                max="20"
                value={filters.maxRefine}
                onChange={(e) =>
                  handleUpdateFilter("maxRefine", e.target.value)
                }
                placeholder="20"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div> */}

          {/* 第三行：排序 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                排序方式
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleUpdateFilter("sortBy", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                排序順序
              </label>
              <select
                value={filters.sortOrder}
                onChange={(e) =>
                  handleUpdateFilter(
                    "sortOrder",
                    e.target.value as "asc" | "desc"
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="desc">由高到低</option>
                <option value="asc">由低到高</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* 篩選結果統計 */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>套用中的篩選條件：</span>
          <div className="flex flex-wrap gap-2">
            {/* {filters.search && (
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs">
                搜尋: {filters.search}
              </span>
            )}
            {filters.category && (
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs">
                分類:{" "}
                {categories.find((c) => c.value === filters.category)?.label}
              </span>
            )}
            {(filters.minPrice || filters.maxPrice) && (
              <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-xs">
                價格: {filters.minPrice || "0"} - {filters.maxPrice || "∞"}
              </span>
            )}
            {showAdvanced && filters.seller && (
              <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-xs">
                賣家: {filters.seller}
              </span>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
