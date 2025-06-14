// src/services/glossaryService.ts
import { apiService } from './api';
import type { Glossary } from '../types/Glossary';
import type { ApiResponse } from '../types';

class GlossaryService {
  private readonly endpoint = '/glossaries';

  async getAll(): Promise<ApiResponse<Glossary[]>> {
    return apiService.get<Glossary[]>(this.endpoint);
  }

  async getById(id: string): Promise<ApiResponse<Glossary>> {
    return apiService.get<Glossary>(`${this.endpoint}/${id}`);
  }

  async create(
    data: Omit<Glossary, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<ApiResponse<Glossary>> {
    return apiService.post<Glossary>(this.endpoint, data);
  }

  async update(
    id: string,
    data: Partial<Glossary>
  ): Promise<ApiResponse<Glossary>> {
    return apiService.put<Glossary>(`${this.endpoint}/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    return apiService.delete<void>(`${this.endpoint}/${id}`);
  }
}

export const glossaryService = new GlossaryService();
