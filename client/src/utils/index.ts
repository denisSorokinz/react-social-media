export const typedFetch = async <T>(
  url: RequestInfo | URL,
  init?: RequestInit
): Promise<T> => {
  const response = await fetch(url, init);
  const data = (await response.json());

  return data;
};
