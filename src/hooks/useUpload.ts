import { useState } from 'react';
import axios, { AxiosError } from 'axios';

interface UploadResult {
  url: string;
  path: string;
}

interface UseUploadResult {
  uploadFile: (file: File) => Promise<UploadResult>;
  loading: boolean;
  error: string | null;
  progress: number;
}

export function useUpload(): UseUploadResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const uploadFile = async (file: File): Promise<UploadResult> => {
    setLoading(true);
    setError(null);
    setProgress(0);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post<UploadResult>('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (event) => {
          if (event.total) {
            setProgress(Math.round((event.loaded * 100) / event.total));
          }
        },
      });
      return response.data;
    } catch (err) {
      setError((err as AxiosError).message || 'Erro desconhecido');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { uploadFile, loading, error, progress };
}
