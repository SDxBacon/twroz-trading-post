import { ROItemId } from "@/constants/ro";
import { ItemInfo } from "@/hooks/useItemInfo";

export interface TradeListItem extends ItemInfo {
  price: number;
  category: string;
  // iconGradient: string;
  // publisher: string;
}
