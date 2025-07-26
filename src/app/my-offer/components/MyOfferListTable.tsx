"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

// import table cell components
import { TimeCell, CardSlotsCell, ItemNameCell } from "./table-cells";

// 定義用戶交易狀態類型
export type OfferStatus =
  | "active" // 上架中
  | "inactive" // 已下架
  | "expired" // 已下架（過期）
  | "archived" // 封存
  | "completed"; // 交易完成

// 定義用戶交易數據類型
export interface UserOfferData {
  id: string;
  itemId: string; // 道具ID
  refineLevel: number; // 精煉等級
  enchantments: string[]; // 詞綴
  cardSlots: string[]; // 卡槽
  price: number; // 價格
  listedAt: string; // 上架時間
  status: OfferStatus; // 狀態
}

// 狀態顯示配置
const statusConfig = {
  active: {
    label: "上架中",
    className:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
  inactive: {
    label: "已下架",
    className: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
  },
  expired: {
    label: "已下架（過期）",
    className:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  },
  archived: {
    label: "封存",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  },
  completed: {
    label: "交易完成",
    className:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  },
};

// 創建模擬數據
const mockUserOffers: UserOfferData[] = [
  {
    id: "1",
    itemId: "500087",
    refineLevel: 10,
    enchantments: ["魔力+2", "詠唱時間-10%"],
    cardSlots: ["27266", "27266"],
    price: 50000000,
    listedAt: "2025-07-24 10:30",
    status: "active",
  },
  {
    id: "2",
    itemId: "500087",
    refineLevel: 8,
    enchantments: [],
    cardSlots: [],
    price: 80000000,
    listedAt: "2025-07-23 15:20",
    status: "completed",
  },
  {
    id: "3",
    itemId: "500087",
    refineLevel: 7,
    enchantments: ["致命毒", "攻擊力+20"],
    cardSlots: ["27266"],
    price: 120000000,
    listedAt: "2025-07-22 09:15",
    status: "inactive",
  },
  {
    id: "4",
    itemId: "500087",
    refineLevel: 5,
    enchantments: ["魅力+5"],
    cardSlots: [],
    price: 25000000,
    listedAt: "2025-07-21 14:45",
    status: "expired",
  },
  {
    id: "5",
    itemId: "500087",
    refineLevel: 7,
    enchantments: ["魔法攻擊力+50", "詠唱時間-15%"],
    cardSlots: ["27266", "27266"],
    price: 180000000,
    listedAt: "2025-07-20 11:00",
    status: "archived",
  },
];

// 格式化價格函數
const formatPrice = (price: number): string => {
  if (price >= 100000000) {
    return `${(price / 100000000).toFixed(1)}億`;
  } else if (price >= 10000000) {
    return `${(price / 10000000).toFixed(1)}千萬`;
  } else if (price >= 10000) {
    return `${(price / 10000).toFixed(1)}萬`;
  }
  return price.toLocaleString();
};

// 創建 column helper
const columnHelper = createColumnHelper<UserOfferData>();

// 定義表格欄位
const columns = [
  // # 序號
  columnHelper.display({
    id: "index",
    header: "#",
    cell: (info) => (
      <div className="text-center text-gray-500 dark:text-gray-400">
        {info.row.index + 1}
      </div>
    ),
    size: 50,
  }),

  // 道具名稱
  columnHelper.display({
    header: "道具名稱",
    size: 250,
    cell: (info) => (
      <ItemNameCell
        itemId={info.row.original.itemId}
        refineLevel={info.row.original.refineLevel}
      />
    ),
  }),

  // 詞綴
  columnHelper.accessor("enchantments", {
    header: "詞綴",
    cell: (info) => {
      const enchantments = info.getValue();
      if (enchantments.length === 0) {
        return (
          <span className="text-gray-500 dark:text-gray-400 text-sm">無</span>
        );
      }
      return (
        <div className="space-y-1">
          {enchantments.map((enchantment, index) => (
            <div
              key={index}
              className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs px-2 py-1 rounded-full mr-1"
            >
              {enchantment}
            </div>
          ))}
        </div>
      );
    },
    size: 150,
  }),

  // 卡槽
  columnHelper.accessor("cardSlots", {
    header: "卡槽",
    cell: (info) => {
      return (
        <CardSlotsCell
          itemId={info.row.original.itemId}
          cardSlots={info.getValue()}
        />
      );
    },
    size: 70,
  }),

  // 價格
  columnHelper.accessor("price", {
    header: "價格",
    cell: (info) => (
      <div className="text-right font-semibold text-green-600 dark:text-green-400">
        {formatPrice(info.getValue())} Z
      </div>
    ),
    size: 120,
  }),

  // 上架時間
  columnHelper.accessor("listedAt", {
    header: "上架時間",
    cell: (info) => <TimeCell listedAt={info.getValue()} />,
    size: 130,
  }),

  // 狀態
  columnHelper.accessor("status", {
    header: "狀態",
    cell: (info) => {
      const status = info.getValue();
      const config = statusConfig[status];
      return (
        <span
          className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${config.className}`}
        >
          {config.label}
        </span>
      );
    },
    size: 120,
  }),

  // 操作
  columnHelper.display({
    id: "actions",
    header: "操作",
    cell: () => (
      <div className="flex gap-2">
        <button className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
          編輯
        </button>
        <button className="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors">
          下架
        </button>
      </div>
    ),
    size: 120,
  }),
];

export default function MyOfferListTable() {
  const table = useReactTable({
    data: mockUserOffers,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-gray-200 dark:border-gray-600"
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-4 whitespace-nowrap text-sm"
                      style={{ width: cell.column.getSize() }}
                    >
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

        {/* Empty state */}
        {mockUserOffers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 text-lg mb-2">
              📦
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              您還沒有發布任何交易
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
