/**
 * Adds query parameters to the current browser URL
 * @param params
 */

type Params = Record<string, string | undefined>

export function setQueryParams(params: Params) {
  window.history.pushState(null, '', stringifyQueryParams(params));
}

/**
 * Parses query parameters from the current browser URL string into an object
 */

export function parseQueryParams() {
  return new URLSearchParams(window.location.search);
}

export function stringifyQueryParams(params: Params) {
  const searchParams = new URLSearchParams(window.location.search);

  Object.entries(params).forEach(([param, value]) => {
    if (value !== undefined) {
      searchParams.set(param, value);
    }
  });

  return `?${searchParams.toString()}`;
}
