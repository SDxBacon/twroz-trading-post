// 應用程式路由常數
export const ROUTES = {
  HOME: "/",
  TRADE: "/trade",
  ACCOUNT: "/account",
  ORDERS: "/orders",
} as const;

// 導航選單項目
export const NAVIGATION_ITEMS = [
  { href: ROUTES.HOME, label: "首頁" },
  { href: ROUTES.TRADE, label: "交易市場" },
] as const;

// 用戶選單項目（不包含設定）
export const USER_MENU_ITEMS = [
  {
    href: ROUTES.ACCOUNT,
    label: "我的帳戶",
  },
  {
    href: ROUTES.ORDERS,
    label: "我的訂單",
  },
] as const;

// 路由工具函數
export const isActiveRoute = (pathname: string, route: string): boolean => {
  return pathname === route;
};

export const getRouteLabel = (route: string): string => {
  const item = NAVIGATION_ITEMS.find((item) => item.href === route);
  return item?.label ?? "";
};
