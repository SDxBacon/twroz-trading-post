import { useState, useEffect, useRef, useCallback } from "react";
import useItemInfo, { ItemInfo } from "@/hooks/useItemInfo";

interface TradeFilterItemNameInputProps {
  onSelected?: (itemId: string) => void;
}

export default function TradeFilterItemNameInput(
  props: TradeFilterItemNameInputProps
) {
  const { onSelected } = props;

  const [itemName, setItemName] = useState("");
  const [searchResults, setSearchResults] = useState<ItemInfo[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { searchItemsByName } = useItemInfo();

  // Perform search
  const performSearch = useCallback(
    (query: string) => {
      if (query.trim()) {
        const results = searchItemsByName(query);
        setSearchResults(results);
        setShowDropdown(results.length > 0);
        setSelectedIndex(-1);
      } else {
        setSearchResults([]);
        setShowDropdown(false);
        setSelectedIndex(-1);
      }
    },
    [searchItemsByName]
  );

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setItemName(value);

    // Only search if not composing
    if (!isComposing) {
      performSearch(value);
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = (
    e: React.CompositionEvent<HTMLInputElement>
  ) => {
    setIsComposing(false);
    // Perform search after composition ends
    performSearch((e.target as HTMLInputElement).value);
  };

  const handleItemSelect = (item: ItemInfo) => {
    setItemName(item.name);
    setShowDropdown(false);
    setSelectedIndex(-1);
    if (onSelected) {
      onSelected(item.id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || searchResults.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
          handleItemSelect(searchResults[selectedIndex]);
        }
        break;
      case "Escape":
        setShowDropdown(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        搜尋物品
      </label>
      <input
        ref={inputRef}
        type="text"
        value={itemName}
        onChange={handleInputChange}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        onKeyDown={handleKeyDown}
        placeholder="輸入物品名稱..."
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
      />

      {/* Dropdown */}
      {showDropdown && searchResults.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {searchResults.map((item, index) => (
            <div
              key={item.id}
              className={`px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                index === selectedIndex ? "bg-blue-100 dark:bg-blue-900" : ""
              }`}
              onClick={() => handleItemSelect(item)}
            >
              <div className="font-medium text-gray-900 dark:text-white">
                {item.name}
              </div>
              {item.description && (
                <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {item.description}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
