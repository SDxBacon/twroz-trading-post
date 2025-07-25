"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { FaGoogle, FaDiscord } from "react-icons/fa";

export default function AccountPage() {
  const { data: session } = useSession();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">我的帳戶</h1>
          <p className="text-gray-600 dark:text-gray-400">
            管理您的個人資訊和帳戶設定
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-6">
                <div className="relative mx-auto w-24 h-24 mb-4">
                  {session?.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="User Avatar"
                      width={96}
                      height={96}
                      className="rounded-full object-cover border-4 border-blue-200 dark:border-blue-700"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold border-4 border-blue-200 dark:border-blue-700">
                      {session?.user?.name?.charAt(0) || "用"}
                    </div>
                  )}
                </div>
                <h2 className="text-xl font-semibold mb-1">
                  {session?.user?.name || "用戶"}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {session?.user?.email || "user@gmail.com"}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    註冊時間
                  </span>
                  <span className="text-sm font-medium">2024-01-15</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Information */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <h3 className="text-xl font-semibold">個人資訊</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    角色名稱
                  </label>
                  <input
                    type="text"
                    value="波利"
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    預留欄位
                  </label>
                  <input
                    type="text"
                    placeholder="功能開發中..."
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
                  />
                </div>

                {/* 已連動帳號 */}
                <div className="md:col-span-2">
                  <h4 className="text-lg font-bold mb-4">已連動帳號</h4>

                  <div className="space-y-3">
                    {/* Google 帳號 */}
                    <div className="flex items-center justify-between py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                      <div className="flex items-center space-x-3">
                        <FaGoogle className="text-red-500 text-lg" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Google 帳號
                        </span>
                      </div>
                      <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors">
                        開始綁定
                      </button>
                    </div>

                    {/* Discord 帳號 */}
                    <div className="flex items-center justify-between py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                      <div className="flex items-center space-x-3">
                        <FaDiscord className="text-indigo-500 text-lg" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Discord 帳號
                        </span>
                      </div>
                      <button className="text-green-600 dark:text-green-400 text-sm font-medium">
                        已綁定
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-6">帳戶設定</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-600">
                  <div>
                    <h4 className="font-medium">交易提案中顯示 Discord 資訊</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      允許其他用戶在交易提案中看到您的 Discord 帳號資訊
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="font-medium">刪除帳號</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      永久刪除您的帳號和所有相關資料，此操作無法復原
                    </p>
                  </div>
                  <button
                    disabled
                    className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg opacity-50 cursor-not-allowed"
                  >
                    刪除帳號
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
