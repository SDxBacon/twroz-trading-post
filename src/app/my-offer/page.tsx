"use client";

import Link from "next/link";
import { useState } from "react";
import { ROUTES } from "../../constants/router";

interface OfferItem {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  status: "active" | "pending" | "completed" | "cancelled";
  createdAt: string;
  category: string;
}

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
];

export default function MyOfferPage() {
  const [selectedTab, setSelectedTab] = useState<
    "all" | "active" | "pending" | "completed"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOffers = mockOffers.filter((offer) => {
    const matchesTab = selectedTab === "all" || offer.status === selectedTab;
    const matchesSearch =
      offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "進行中";
      case "pending":
        return "等待中";
      case "completed":
        return "已完成";
      case "cancelled":
        return "已取消";
      default:
        return status;
    }
  };

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
                    onClick={() => setSelectedTab(tab.key as any)}
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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

        {/* Offers List */}
        <div className="space-y-4">
          {filteredOffers.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12 text-center">
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                沒有找到交易提案
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {searchTerm ? "嘗試調整搜尋條件" : "您還沒有發布任何交易提案"}
              </p>
              <Link
                href={ROUTES.TRADE}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors"
              >
                發布第一個提案
              </Link>
            </div>
          ) : (
            filteredOffers.map((offer) => (
              <div
                key={offer.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            {offer.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-3">
                            {offer.description}
                          </p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <span>類別：{offer.category}</span>
                            <span>發布日期：{offer.createdAt}</span>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            offer.status
                          )}`}
                        >
                          {getStatusText(offer.status)}
                        </span>
                      </div>
                    </div>

                    <div className="sm:text-right">
                      <div className="text-2xl font-bold text-blue-600 mb-2">
                        {offer.price.toLocaleString()}{" "}
                        {offer.currency === "zeny" ? "z" : offer.currency}
                      </div>
                      <div className="flex gap-2">
                        <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-1 rounded text-sm font-medium transition-colors">
                          編輯
                        </button>
                        {offer.status === "active" && (
                          <button className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 px-3 py-1 rounded text-sm font-medium transition-colors">
                            取消
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
