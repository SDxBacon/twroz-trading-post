import { ROItemId } from "@/constants/ro";
import { ItemInfo } from "@/hooks/useItemInfo";

export interface TradeListItem extends ItemInfo {
  price: number;
  category: string;
}

// TODO:
export interface TradeData {
  id: ROItemId;
  refineLevel: number;
  enchantments: any[];
  cardSlots: ROItemId[];
  price: number;
  seller: string;
  listedAt: string;
}
