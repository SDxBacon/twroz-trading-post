// 女武神-西格倫
export const SERVER_SIGRUN = "Sigrun";

// 艾克瑟
export const SERVER_AXL = "Axl";

/**
 * 台灣RO Zero伺服器常數
 * An object containing the available TWROZ server constants.
 * Each key and value represents a server identifier.
 *
 * @remarks
 * The keys and values are derived from the constants `SERVER_SIGRUN` and `SERVER_AXL`.
 * This object is marked as `const` to ensure type safety and immutability.
 */
export const TWROZServers = {
  [SERVER_SIGRUN]: SERVER_SIGRUN,
  [SERVER_AXL]: SERVER_AXL,
} as const;

/**
 * The maximum amount of Zeny (in-game currency) allowed.
 * Calculated as 2^32 / 2, which equals 2,147,483,648.
 * This limit is typically based on the constraints of a 32-bit signed integer.
 */
export const MAX_ZENY = Math.pow(2, 32) / 2; // 2^32 / 2 = 2,147,483,648
