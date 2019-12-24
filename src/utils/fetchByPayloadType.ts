import R from "ramda";

/**
 * Ensures a valid array is returned from a fetch call.
 */
export async function fetchArray<TResponse>(
  endpoint: string,
  fetchOptions: unknown = {},
): Promise<TResponse> {
  const response = await fetch(endpoint, fetchOptions as RequestInit);
  return R.isNil(response) ? [] : response;
}

/**
 * Ensures a valid object is returned from a fetch call.
 */
export async function fetchObject<TResponse>(
  endpoint: string,
  fetchOptions: unknown = {},
): Promise<TResponse> {
  const response = await fetch(endpoint, fetchOptions as RequestInit);
  return R.isNil(response) ? {} : response;
}