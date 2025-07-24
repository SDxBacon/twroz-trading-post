import { ROItemId } from "@/constants/ro";
import useItemInfo from "@/hooks/useItemInfo";

interface TradeListItemNameCellProps {
  id: ROItemId;
  refineLevel: number;
}

export default function TradeListItemNameCell({
  id,
  refineLevel,
}: TradeListItemNameCellProps) {
  const { getItemInfoById } = useItemInfo();

  const itemInfo = getItemInfoById(id);
  if (!itemInfo) {
    return <div className="text-gray-500">Unknown Item</div>;
  }

  const showRefineLevel = refineLevel > 0;
  const showSlotCount = itemInfo.slotCount > 0;

  const prefix = showRefineLevel ? `+${refineLevel} ` : "";
  const suffix = showSlotCount ? ` [${itemInfo.slotCount}]` : "";

  return (
    <div className="font-medium text-gray-900 dark:text-white">
      {prefix + itemInfo.name + suffix}
    </div>
  );
}
