import { useState, useCallback } from 'react';
import type { LoadingState } from '../types';

export const useLoading = (initialState: boolean = false) => {
  const [state, setState] = useState<LoadingState>({
    isLoading: initialState,
    error: undefined,
  });

  const setLoading = useCallback((isLoading: boolean) => {
    setState({ isLoading, error: undefined });
  }, []);

  const setError = useCallback((error: string) => {
    setState({ isLoading: false, error });
  }, []);

  const reset = useCallback(() => {
    setState({ isLoading: false, error: undefined });
  }, []);

  return {
    ...state,
    setLoading,
    setError,
    reset,
  };
};
