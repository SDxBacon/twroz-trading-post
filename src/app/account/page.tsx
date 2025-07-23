import Image from "next/image";

export default function AccountPage() {
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
                  <Image
                    src="/avatar.jpg"
                    alt="User Avatar"
                    width={96}
                    height={96}
                    className="rounded-full object-cover border-4 border-blue-200 dark:border-blue-700"
                    // onError={(e) => {
                    //   // Fallback to a colored circle with initials if image fails
                    //   e.currentTarget.style.display = "none";
                    // }}
                  />
                  {/* Fallback avatar */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    用
                  </div>
                </div>
                <h2 className="text-xl font-semibold mb-1">用戶名稱</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  user@gmail.com
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    註冊時間
                  </span>
                  <span className="text-sm font-medium">2024-01-15</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    帳戶狀態
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    活躍
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Information */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">個人資訊</h3>
                <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                  編輯
                </button>
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
                    Gmail 帳號
                  </label>
                  <div className="flex items-center">
                    <input
                      type="email"
                      value="user@gmail.com"
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                    />
                    <div className="px-3 py-2 bg-green-100 dark:bg-green-900 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg">
                      <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                        已綁定
                      </span>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Discord 帳號
                  </label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value="User#1234"
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                    />
                    <div className="px-3 py-2 bg-green-100 dark:bg-green-900 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg">
                      <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                        已綁定
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order History */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-6">最近訂單</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-blue-600 dark:text-blue-400"
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
                    </div>
                    <div>
                      <h4 className="font-medium">訂單 #12345</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        2024-07-20
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">NT$ 1,299</p>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      已完成
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-orange-600 dark:text-orange-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">訂單 #12344</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        2024-07-18
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">NT$ 899</p>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      運送中
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-purple-600 dark:text-purple-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">訂單 #12343</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        2024-07-15
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">NT$ 2,199</p>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      處理中
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                  查看所有訂單
                </button>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
