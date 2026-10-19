export const ROUTE_ORDER: Record<string, number> = {
  "/": 0,
  "/about": 0,
  "/experiences": 1,
  "/projects": 2,
  "/blog": 3,
};

/**
 * Maps a pathname to a numerical index to determine navigation direction.
 */
export function getRouteIndex(pathname: string): number {
  if (pathname in ROUTE_ORDER) {
    return ROUTE_ORDER[pathname];
  }
  const normalized = pathname.replace(/\/$/, "");
  if (normalized in ROUTE_ORDER) {
    return ROUTE_ORDER[normalized];
  }
  if (pathname.startsWith("/blog/")) {
    return 4;
  }
  return 0;
}

/**
 * Sets document.documentElement.dataset.slideDirection to 'forward' or 'backward'
 * based on relative route indices.
 */
export function setSlideDirection(fromPath: string, toPath: string) {
  if (typeof document === "undefined") return;
  const fromIndex = getRouteIndex(fromPath);
  const toIndex = getRouteIndex(toPath);
  const direction = toIndex >= fromIndex ? "forward" : "backward";
  document.documentElement.dataset.slideDirection = direction;
}
