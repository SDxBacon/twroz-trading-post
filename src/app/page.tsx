"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ROUTES } from "../constants/router";
import AnimatedTradingCounter from "../components/AnimatedTradingCounter";

export default function Home() {
  const { data: session } = useSession();

  // 使用 TanStack Query 調用 hello API
  const { data, error } = useQuery({
    queryKey: ["hello"],
    queryFn: async () => {
      const response = await fetch("/api/hello");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  // 使用 useEffect 來 console.log 結果
  useEffect(() => {
    if (data) {
      console.log("Hello API response:", data);
    }
    if (error) {
      console.error("Hello API error:", error);
    }
  }, [data, error]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TWROZ Trading Post
            </h1>

            {/* 歡迎訊息 */}
            {session && (
              <div className="mb-6">
                <p className="text-lg text-blue-600 font-medium">
                  歡迎回來，{session.user?.name}！
                </p>
              </div>
            )}

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
              台灣 RO
              樂園伺服器專屬的第三方交易平台，提供安全、便利的道具交易環境。
              讓玩家輕鬆買賣遊戲道具，享受更好的遊戲體驗。
            </p>

            {/* 交易統計 */}
            <div className="mb-12">
              <div className="text-3xl font-bold text-blue-600 mb-2 flex items-center justify-center gap-1">
                <AnimatedTradingCounter value={1} className="inline" />
                <span>,</span>
                <AnimatedTradingCounter value={234} className="inline" />
                <span className="ml-2">筆交易提案</span>
              </div>
            </div>

            <div className="flex justify-center mb-16">
              <Link
                href={ROUTES.TRADE}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors inline-flex items-center justify-center"
              >
                進入交易市場
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
