/**
 * TableTimeCell.tsx
 * This component displays the time when a trade was listed, formatted as a relative time string.
 * It uses the dayjs library to handle date formatting and relative time calculations.
 * It also includes a tooltip that shows the exact date and time when hovered over.
 */

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-tw";
import { Tooltip } from "react-tooltip";

// 配置 dayjs
dayjs.extend(relativeTime);
dayjs.locale("zh-tw");

interface TableTimeCellProps {
  listedAt: string;
}

export default function TableTimeCell({ listedAt }: TableTimeCellProps) {
  const formatRelativeTime = (dateString: string) => {
    const now = dayjs();
    const listedTime = dayjs(dateString);
    const diffHours = now.diff(listedTime, "hour");

    if (diffHours === 0) {
      // 不滿一小時，使用 day.js 的相對時間
      return listedTime.fromNow();
    } else if (diffHours >= 1 && diffHours <= 2) {
      // 1~2小時，顯示小時和分鐘
      const diffMinutes = now.diff(listedTime, "minute");
      const remainingMinutes = diffMinutes % 60;
      return remainingMinutes > 0
        ? `${diffHours} 小時 ${remainingMinutes} 分鐘前`
        : `${diffHours} 小時前`;
    } else {
      // 大於等於3小時，使用 day.js 的相對時間（只顯示小時）
      return listedTime.fromNow();
    }
  };

  const tooltipId = `time-tooltip-${listedAt.replace(/[\s:]/g, "-")}`;

  return (
    <>
      <div
        className="text-sm text-gray-500 dark:text-gray-400 cursor-pointer"
        data-tooltip-id={tooltipId}
        data-tooltip-content={dayjs(listedAt).format("YYYY-MM-DD HH:mm:ss")}
      >
        {formatRelativeTime(listedAt)}
      </div>
      <Tooltip id={tooltipId} place="top" />
    </>
  );
}
