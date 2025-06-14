// src/services/analysisService.ts
import { apiService } from './api';
import type { Analysis } from '../types/Analysis';
import type { ApiResponse } from '../types';

class AnalysisService {
  private readonly endpoint = '/analysis';

  async getAll(): Promise<ApiResponse<Analysis[]>> {
    return apiService.get<Analysis[]>(this.endpoint);
  }

  async getById(id: string): Promise<ApiResponse<Analysis>> {
    return apiService.get<Analysis>(`${this.endpoint}/${id}`);
  }

  async create(
    data: Omit<Analysis, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<ApiResponse<Analysis>> {
    return apiService.post<Analysis>(this.endpoint, data);
  }

  async update(
    id: string,
    data: Partial<Analysis>
  ): Promise<ApiResponse<Analysis>> {
    return apiService.put<Analysis>(`${this.endpoint}/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    return apiService.delete<void>(`${this.endpoint}/${id}`);
  }
}

export const analysisService = new AnalysisService();
