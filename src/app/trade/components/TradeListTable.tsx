"use client";

import { TradeListItem } from "@/types/trade";

interface TradeListTableProps {
  items: TradeListItem[];
  onItemClick: (item: TradeListItem) => void;
}

export default function TradeListTable({
  items,
  onItemClick,
}: TradeListTableProps) {
  const iconGradient = "bg-gradient-to-br from-blue-400 to-blue-500"; // Default gradient

  const getCategoryColorClass = (categoryColor: string) => {
    const colorClasses: { [key: string]: string } = {
      blue: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200",
      purple:
        "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200",
      yellow:
        "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200",
      green:
        "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
      red: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200",
      orange:
        "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200",
    };
    return colorClasses[categoryColor] || colorClasses.blue;
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString();
  };

  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          onClick={() => onItemClick(item)}
        >
          <div
            className={`w-16 h-16 ${iconGradient} rounded-lg flex items-center justify-center mr-4`}
          >
            <span className="text-white font-bold text-lg">⚔️</span>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-lg">{item.name}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              {item.description}
            </p>
            <div className="flex items-center space-x-4">
              <span
                className={`text-sm px-2 py-1 rounded ${getCategoryColorClass(
                  "blue"
                )}`}
              >
                {item.category}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                發布者: TODO
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-green-600 dark:text-green-400">
              {formatPrice(item.price)} Zeny
            </p>
            <button
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              onClick={(e) => {
                e.stopPropagation(); // Prevent parent onClick
                onItemClick(item);
              }}
            >
              查看詳情
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export type { TradeListItem };
