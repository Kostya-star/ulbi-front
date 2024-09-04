/**
 * Adds query parameters to the current browser URL
 * @param params
 */

export function setQueryParams(params: Record<string, string | undefined>) {
  window.history.pushState(null, '', stringifyQueryParams(params));
}

/**
 * Parses query parameters from the current browser URL string into an object
 */

export function parseQueryParams() {
  return new URLSearchParams(window.location.search);
}

export function stringifyQueryParams(params: Record<string, string | undefined>) {
  const searchParams = new URLSearchParams(window.location.search);

  Object.entries(params).forEach(([param, value]) => {
    if (value !== undefined) {
      searchParams.set(param, value);
    }
  });

  return `?${searchParams.toString()}`;
}
