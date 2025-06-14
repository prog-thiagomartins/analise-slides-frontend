// src/services/modelService.ts
import { apiService } from './api';
import type { AnalysisTemplate } from '../types/AnalysisModel';
import type { ApiResponse } from '../types';

class ModelService {
  private readonly endpoint = '/models';

  async getAll(): Promise<ApiResponse<AnalysisTemplate[]>> {
    return apiService.get<AnalysisTemplate[]>(this.endpoint);
  }

  async getById(id: string): Promise<ApiResponse<AnalysisTemplate>> {
    return apiService.get<AnalysisTemplate>(`${this.endpoint}/${id}`);
  }

  async create(
    data: Omit<AnalysisTemplate, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<ApiResponse<AnalysisTemplate>> {
    return apiService.post<AnalysisTemplate>(this.endpoint, data);
  }

  async update(
    id: string,
    data: Partial<AnalysisTemplate>
  ): Promise<ApiResponse<AnalysisTemplate>> {
    return apiService.put<AnalysisTemplate>(`${this.endpoint}/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    return apiService.delete<void>(`${this.endpoint}/${id}`);
  }
}

export const modelService = new ModelService();
