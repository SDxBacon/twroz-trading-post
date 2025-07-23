import Image from "next/image";
import Link from "next/link";
import AvatarDropdown from "./AvatarDropdown";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 dark:border-gray-800 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                className="dark:invert"
                src="/next.svg"
                alt="Logo"
                width={120}
                height={25}
                priority
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <div className="flex items-baseline space-x-8">
              <Link
                href="/"
                className="text-foreground hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 text-sm font-medium transition-colors"
              >
                首頁
              </Link>
              <Link
                href="/page-A"
                className="text-foreground hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 text-sm font-medium transition-colors"
              >
                頁面 A
              </Link>
            </div>

            {/* Avatar Dropdown */}
            <AvatarDropdown />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">開啟主選單</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 block px-3 py-2 text-base font-medium transition-colors"
            >
              首頁
            </Link>
            <Link
              href="/page-A"
              className="text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 block px-3 py-2 text-base font-medium transition-colors"
            >
              頁面 A
            </Link>
            <Link
              href="/account"
              className="text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 block px-3 py-2 text-base font-medium transition-colors"
            >
              我的帳戶
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
