import { useState } from "react";
import { FaRegCopy } from "react-icons/fa6";
import { Tooltip } from "react-tooltip";

interface TradeListSellerCellProps {
  seller: string;
}

export default function TradeListSellerCell({
  seller,
}: TradeListSellerCellProps) {
  const [showCopied, setShowCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation(); // 防止觸發表格行的點擊事件

    try {
      await navigator.clipboard.writeText(seller);
      setShowCopied(true);
    } catch (err) {
      console.error("Failed to copy seller name:", err);
    }
  };

  const handleMouseLeave = () => {
    setShowCopied(false);
  };

  const tooltipId = `seller-tooltip-${seller.replace(/\s/g, "-")}`;

  return (
    <>
      <div
        className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        onMouseLeave={handleMouseLeave}
        onClick={handleCopy}
        data-tooltip-id={tooltipId}
      >
        <span>{seller}</span>
        <FaRegCopy
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          size={12}
        />
      </div>

      <Tooltip
        id={tooltipId}
        place="top"
        content="Copied!"
        isOpen={showCopied}
        style={{
          backgroundColor: "#10b981",
          color: "#ffffff",
          fontSize: "12px",
          borderRadius: "6px",
          padding: "4px 8px",
        }}
      />
    </>
  );
}
