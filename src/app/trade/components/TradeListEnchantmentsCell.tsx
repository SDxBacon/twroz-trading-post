import { TradeData } from "@/types/trade";

interface TradeListEnchantmentsCellProps {
  enchantments: TradeData["enchantments"];
}

export default function TradeListEnchantmentsCell({
  enchantments,
}: TradeListEnchantmentsCellProps) {
  return (
    <div className="text-sm text-gray-600 dark:text-gray-400 max-w-40 truncate">
      {enchantments}
    </div>
  );
}
