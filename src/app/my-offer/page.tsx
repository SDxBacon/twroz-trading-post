"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { ROUTES } from "../../constants/router";
import MyOfferTable, { OfferItem } from "../../components/MyOfferTable";

const mockOffers: OfferItem[] = [
  {
    id: "1",
    title: "+10 神聖復活長袍",
    description: "精煉+10，附魔魔力+2，狀態極佳",
    price: 50000000,
    currency: "zeny",
    status: "active",
    createdAt: "2024-01-15",
    category: "防具",
  },
  {
    id: "2",
    title: "古城白騎士卡片",
    description: "稀有卡片，增加攻擊力",
    price: 80000000,
    currency: "zeny",
    status: "pending",
    createdAt: "2024-01-10",
    category: "卡片",
  },
  {
    id: "3",
    title: "血腥骨刺",
    description: "+15 強化，帶有致命毒附魔",
    price: 120000000,
    currency: "zeny",
    status: "completed",
    createdAt: "2024-01-05",
    category: "武器",
  },
  {
    id: "4",
    title: "惡魔女僕頭飾",
    description: "稀有時裝頭飾，增加魅力",
    price: 25000000,
    currency: "zeny",
    status: "active",
    createdAt: "2024-01-12",
    category: "頭飾",
  },
  {
    id: "5",
    title: "MVP 波利王卡片",
    description: "極稀有 MVP 卡片，大幅提升生命值",
    price: 200000000,
    currency: "zeny",
    status: "pending",
    createdAt: "2024-01-08",
    category: "卡片",
  },
];

export default function MyOfferPage() {
  const [selectedTab, setSelectedTab] = useState<
    "all" | "active" | "pending" | "completed"
  >("all");
  const [globalFilter, setGlobalFilter] = useState("");

  const filteredData = useMemo(() => {
    return mockOffers.filter((offer) => {
      const matchesTab = selectedTab === "all" || offer.status === selectedTab;
      return matchesTab;
    });
  }, [selectedTab]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            我的交易提案
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            管理您發布的所有交易提案
          </p>
        </div>

        {/* Actions Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "all", label: "全部" },
                  { key: "active", label: "進行中" },
                  { key: "pending", label: "等待中" },
                  { key: "completed", label: "已完成" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() =>
                      setSelectedTab(
                        tab.key as "all" | "active" | "pending" | "completed"
                      )
                    }
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      selectedTab === tab.key
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <Link
                href={ROUTES.TRADE}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors inline-flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                發布新提案
              </Link>
            </div>

            {/* Search */}
            <div className="mt-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜尋交易提案..."
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
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
          </div>
        </div>

        {/* Table */}
        <MyOfferTable
          data={filteredData}
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
        />
      </div>
    </div>
  );
}
