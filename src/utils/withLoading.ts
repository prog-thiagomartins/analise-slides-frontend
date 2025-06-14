// src/utils/withLoading.ts
export const withLoading = async <T>(
  setLoading: (value: boolean) => void,
  fn: () => Promise<T>
): Promise<T> => {
  setLoading(true);
  try {
    return await fn();
  } finally {
    setLoading(false);
  }
};
