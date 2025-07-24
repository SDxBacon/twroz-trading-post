"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { TradeData } from "@/types/trade";
import TradeListTimeCell from "./TradeListTimeCell";
import TradeListItemNameCell from "./TradeListItemNameCell";
import TradeListEnchantmentsCell from "./TradeListEnchantmentsCell";
import TradeListCardSlotsCell from "./TradeListCardSlotsCell";
import TradeListSellerCell from "./TradeListSellerCell";

// Create placeholder data
const mockData: TradeData[] = [
  {
    id: "2301",
    refineLevel: 10,
    enchantments: ["力量+3, 敏捷+2"],
    cardSlots: [],
    price: 1500000,
    seller: "玩家A",
    listedAt: "2025-07-24 10:30",
  },
  {
    id: "2302",
    refineLevel: 7,
    enchantments: ["力量+3, 敏捷+2"],
    cardSlots: [],
    price: 800000,
    seller: "玩家B",
    listedAt: "2025-07-24 09:15",
  },
  {
    id: "2302",
    refineLevel: 7,
    enchantments: ["力量+3, 敏捷+2"],
    cardSlots: ["4002"],
    price: 800000,
    seller: "玩家B",
    listedAt: "2025-07-24 09:15",
  },
  {
    id: "500086",
    refineLevel: 7,
    enchantments: ["力量+3, 敏捷+2"],
    cardSlots: ["4002"],
    price: 800000,
    seller: "玩家B",
    listedAt: "2025-07-24 09:15",
  },
  {
    id: "1301",
    refineLevel: 7,
    enchantments: ["力量+3, 敏捷+2"],
    cardSlots: ["4002"],
    price: 800000,
    seller: "玩家B",
    listedAt: "2025-07-24 09:15",
  },
  {
    id: "3",
    refineLevel: 15,
    enchantments: ["體質+4, 防禦+10"],
    cardSlots: [],
    price: 2200000,
    seller: "玩家C",
    listedAt: "2025-07-24 08:45",
  },
];

interface TradeListTableProps {
  items?: TradeData[];
  onItemClick?: (item: TradeData) => void;
}

export default function TradeListTable({
  items = mockData,
  onItemClick,
}: TradeListTableProps) {
  const columnHelper = createColumnHelper<TradeData>();

  const columns = [
    // # (index)
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
    columnHelper.accessor("id", {
      header: "道具名稱",
      cell: (info) => (
        <TradeListItemNameCell
          id={info.getValue()}
          refineLevel={info.row.original.refineLevel}
        />
      ),
      size: 250,
    }),

    // 詞綴
    columnHelper.accessor("enchantments", {
      header: "詞綴",
      cell: (info) => (
        <TradeListEnchantmentsCell enchantments={info.getValue()} />
      ),
      size: 150,
    }),

    // 卡槽
    columnHelper.accessor("cardSlots", {
      header: "卡槽",
      cell: (info) => (
        <TradeListCardSlotsCell
          id={info.row.original.id}
          cardSlots={info.getValue()}
        />
      ),
      size: 70,
    }),

    // 單價
    columnHelper.accessor("price", {
      header: "單價",
      cell: (info) => (
        <div className="text-right font-semibold text-green-600 dark:text-green-400">
          {info.getValue().toLocaleString()} Z
        </div>
      ),
      size: 120,
    }),

    // 賣家
    columnHelper.accessor("seller", {
      header: "賣家",
      cell: (info) => <TradeListSellerCell seller={info.getValue()} />,
      size: 100,
    }),

    // 上架時間
    columnHelper.accessor("listedAt", {
      header: "上架時間",
      cell: (info) => <TradeListTimeCell listedAt={info.getValue()} />,
      size: 130,
    }),

    // 聯繫賣家
    columnHelper.display({
      id: "contact",
      header: "聯繫賣家",
      cell: (info) => (
        <div className="flex gap-2">
          <button
            onClick={() => onItemClick?.(info.row.original)}
            className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            查看
          </button>
          <button className="px-3 py-1 text-xs bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors">
            收藏
          </button>
        </div>
      ),
      size: 120,
    }),
  ];

  const table = useReactTable({
    data: items,
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
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                  onClick={() => onItemClick?.(row.original)}
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
        {items.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 text-lg mb-2">
              📦
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              目前沒有符合條件的交易項目
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
