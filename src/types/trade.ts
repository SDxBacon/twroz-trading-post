import { ROItemId } from "@/constants/ro";
import { ItemInfo } from "@/hooks/useItemInfo";

export interface TradeListItem extends ItemInfo {
  price: number;
  category: string;
}

// TODO:
export interface TradeData {
  id: string;
  itemId: ROItemId;
  refineLevel: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  enchantments: any[];
  cardSlots: ROItemId[];
  price: number;
  seller: string;
  listedAt: string;
}
