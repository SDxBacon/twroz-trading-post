"use client";

import Link from "next/link";
import { useState } from "react";
import { ROUTES } from "@/constants/router";
import Pagination from "@/components/Pagination";
import MyOfferListTable from "./components/MyOfferListTable";

function MyOfferPage() {
  // 篩選狀態
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [globalFilter, setGlobalFilter] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = 47; // This would come from API response
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 標籤選項
  const tabs = [
    { key: "all", label: "全部" },
    { key: "active", label: "上架中" },
    { key: "inactive", label: "已下架" },
    { key: "completed", label: "已完成" },
    { key: "archived", label: "封存" },
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">我的交易</h1>
          <p className="text-gray-600 dark:text-gray-400">
            管理您發布的交易提案，查看交易狀態和歷史記錄
          </p>
        </div>

        {/* Controls Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
          <div className="p-6">
            {/* Tabs and Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setSelectedTab(tab.key)}
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
                發布新交易
              </Link>
            </div>

            {/* Search */}
            <div className="mt-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜尋我的交易..."
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

        {/* Offers Results Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">交易列表</h3>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  共 47 筆交易
                </span>
                <select className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm dark:bg-gray-700 dark:text-white">
                  <option>最新發布</option>
                  <option>價格由低到高</option>
                  <option>價格由高到低</option>
                  <option>狀態排序</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* User Offers Table */}
            <MyOfferListTable />

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

export default MyOfferPage;
