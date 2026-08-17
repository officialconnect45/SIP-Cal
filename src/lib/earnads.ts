/** Official Earnads param. `adlinkfy` is accepted as a typo alias used in local tests. */
const QUERY_KEYS = ["adlinkfly", "adlinkfy"] as const;

export function getEarnadsCodeFromSearch(
  search = typeof window === "undefined" ? "" : window.location.search
): string {
  const params = new URLSearchParams(search);
  for (const key of QUERY_KEYS) {
    const value = (params.get(key) || "").trim();
    if (value) return value;
  }
  return "";
}
