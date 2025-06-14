import { useEffect, useRef, useState, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import type { CancelTokenSource } from 'axios';

interface UseFetchResult<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  refetch: () => Promise<void>;
}

export function useFetch<T = unknown>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const cancelSource = useRef<CancelTokenSource | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    cancelSource.current = axios.CancelToken.source();
    try {
      const response = await axios.get<T>(url, {
        cancelToken: cancelSource.current.token,
      });
      setData(response.data);
    } catch (err) {
      if (axios.isCancel(err)) return;
      setError((err as AxiosError).message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
    return () => {
      cancelSource.current?.cancel('Request cancelled by component unmount');
    };
  }, [fetchData]);

  return { data, error, loading, refetch: fetchData };
}
