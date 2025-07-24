import { TradeData } from "@/types/trade";
import useItemInfo from "@/hooks/useItemInfo";

interface TradeListCardSlotsCellProps {
  id: TradeData["id"];
  cardSlots: TradeData["cardSlots"];
}

export default function TradeListCardSlotsCell({
  id,
  cardSlots,
}: TradeListCardSlotsCellProps) {
  const { getItemInfoById } = useItemInfo();
  const itemInfo = getItemInfoById(id);

  // If itemInfo is null or slotCount is 0, display a placeholder
  if (!itemInfo || itemInfo.slotCount === 0) {
    return <div className="text-center">-</div>;
  }

  const emptySlots = Math.max(itemInfo.slotCount - cardSlots.length, 0);

  return (
    <div className="text-center">
      {
        /**
         * Display cards
         */
        cardSlots.length > 0 &&
          cardSlots.map((cardId, index) => {
            const cardItemInfo = getItemInfoById(cardId);

            if (!cardItemInfo) {
              return (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-700 text-red-800 dark:text-red-200 mr-1"
                >
                  Unknown Card
                </span>
              );
            }

            return (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 mr-1"
              >
                {cardItemInfo.name}
              </span>
            );
          })
      }

      {
        /**
         * Display empty slots
         */
        emptySlots > 0 &&
          Array.from({ length: emptySlots }).map((_, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 mr-1"
            >
              空卡槽
            </span>
          ))
      }
    </div>
  );
}
