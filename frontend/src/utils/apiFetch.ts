export const apiFetch = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'PostmanRuntime/7.43.4',
      'bypass-tunnel-reminder': 'true',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const json = await response.json();
  if (json.error) {
    throw new Error(json.error);
  }

  return json as T;
};
