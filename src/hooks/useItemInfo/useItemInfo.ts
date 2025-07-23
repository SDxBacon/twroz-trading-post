import isNil from "lodash/isNil";
import { ROItemId } from "@/constants/ro";
import ItemInfoJSON from "@/constants/iteminfo_new.json";

export interface ItemInfo {
  id: ROItemId;
  name: string;
  description: string;
  slotCount: number;
}

const useItemInfo = () => {
  // getitemInfoById function to retrieve item information by ID
  const getItemInfoById = (id: ROItemId): ItemInfo | null => {
    const item = ItemInfoJSON[id as keyof typeof ItemInfoJSON] as
      | {
          name: string;
          description: string;
          slotCount: number;
        }
      | undefined;

    // If the item is not found, return null
    if (isNil(item)) {
      return null;
    }

    return {
      ...item,
      id,
    };
  };

  const getItemNameWithSlotCount = (id: ROItemId): string => {
    const itemInfo = getItemInfoById(id);
    // If itemInfo is null, return a default message
    if (!itemInfo) {
      return "Unknown Item";
    }
    // If slotCount is 0, return just the name
    if (itemInfo.slotCount === 0) {
      return itemInfo.name;
    }
    // Otherwise, return the name with slot count
    return `${itemInfo.name} [${itemInfo.slotCount}]`;
  };

  // searchItemsByName function to find matching items by name
  // TODO: perform test
  const searchItemsByName = (searchQuery: string): ItemInfo[] => {
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase().trim();
    const results: Array<{ item: ItemInfo; score: number }> = [];

    // Search through all items in ItemInfoJSON
    Object.entries(ItemInfoJSON).forEach(([id, itemData]) => {
      const item = itemData as {
        name: string;
        description: string;
        slotCount: number;
      };

      const itemName = item.name.toLowerCase();
      let score = 0;

      // Exact match gets highest score
      if (itemName === query) {
        score = 100;
      }
      // Starts with query gets high score
      else if (itemName.startsWith(query)) {
        score = 80;
      }
      // Contains query gets medium score
      else if (itemName.includes(query)) {
        score = 60;
      }
      // No match
      else {
        return;
      }

      // Create ItemInfo object
      const itemInfo: ItemInfo = {
        id: id as ROItemId,
        ...item,
      };

      results.push({ item: itemInfo, score });
    });

    // Sort by score (highest first) and return top 6 items
    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map((result) => result.item);
  };

  return {
    getItemInfoById,
    getItemNameWithSlotCount,
    searchItemsByName,
  };
};

export default useItemInfo;
