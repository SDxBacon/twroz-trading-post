/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import Link from "next/link";
import { useMemo, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { ROUTES } from "../constants/router";

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

interface MyOfferTableProps {
  data: OfferItem[];
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
}

export default function MyOfferTable({
  data,
  globalFilter,
  onGlobalFilterChange,
}: MyOfferTableProps) {
  const getStatusColor = useCallback((status: string) => {
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
  }, []);

  const getStatusText = useCallback((status: string) => {
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
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "title",
        id: "item",
        header: "道具",
        cell: ({ row }: { row: any }) => (
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {row.original.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              {row.original.description}
            </p>
            <span className="text-xs text-gray-500 dark:text-gray-500">
              {row.original.category}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "price",
        header: "價格",
        cell: ({ getValue, row }: { getValue: any; row: any }) => (
          <div className="text-right">
            <div className="font-bold text-blue-600 text-lg">
              {getValue().toLocaleString()}{" "}
              {row.original.currency === "zeny" ? "z" : row.original.currency}
            </div>
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "狀態",
        cell: ({ getValue }: { getValue: any }) => (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
              getValue()
            )}`}
          >
            {getStatusText(getValue())}
          </span>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "發布日期",
        cell: ({ getValue }: { getValue: any }) => (
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {getValue()}
          </span>
        ),
      },
      {
        id: "actions",
        header: "操作",
        cell: ({ row }: { row: any }) => (
          <div className="flex gap-2">
            <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-1 rounded text-sm font-medium transition-colors">
              編輯
            </button>
            {row.original.status === "active" && (
              <button className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 px-3 py-1 rounded text-sm font-medium transition-colors">
                取消
              </button>
            )}
          </div>
        ),
      },
    ],
    [getStatusColor, getStatusText]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange,
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      {table.getRowModel().rows.length === 0 ? (
        <div className="p-12 text-center">
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
            {globalFilter ? "嘗試調整搜尋條件" : "您還沒有發布任何交易提案"}
          </p>
          <Link
            href={ROUTES.TRADE}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors"
          >
            發布第一個提案
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-2">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {{
                          asc: "↑",
                          desc: "↓",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export type { OfferItem };
