import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

interface UseApiResult {
  request: (config: AxiosRequestConfig) => Promise<AxiosResponse>;
  loading: boolean;
  error: string | null;
}

export function useApi(): UseApiResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = async (config: AxiosRequestConfig): Promise<AxiosResponse> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.request(config);
      return response;
    } catch (err) {
      setError((err as AxiosError).message || 'Erro desconhecido');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { request, loading, error };
}
