import { useState, useEffect, useCallback } from 'react';

type UseFetchResult<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
};

export function useFetch<T = unknown>(
  url: string,
  options?: RequestInit
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [reloadFlag, setReloadFlag] = useState<number>(0);

  const refetch = useCallback(() => {
    setReloadFlag((flag) => flag + 1);
  }, []);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    async function fetchData() {
      await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'PostmanRuntime/7.43.4',
          'bypass-tunnel-reminder': 'true',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          ...options?.headers,
        },
      })
        .then(async (response) => {
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          const result = (await response.json()) as T;
          if (isMounted) setData(result);
        })
        .catch((err) => {
          if (isMounted) setError(err as Error);
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });
    }

    fetchData();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, JSON.stringify(options), reloadFlag]);

  return { data, loading, error, refetch };
}
