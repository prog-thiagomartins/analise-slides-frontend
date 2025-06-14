// src/services/termService.ts
import { apiService } from './api';
import type { Term } from '../types/Term';
import type { ApiResponse } from '../types';

class TermService {
  private readonly endpoint = '/terms';

  async getAll(): Promise<ApiResponse<Term[]>> {
    return apiService.get<Term[]>(this.endpoint);
  }

  async getById(id: string): Promise<ApiResponse<Term>> {
    return apiService.get<Term>(`${this.endpoint}/${id}`);
  }

  async create(
    data: Omit<Term, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<ApiResponse<Term>> {
    return apiService.post<Term>(this.endpoint, data);
  }

  async update(id: string, data: Partial<Term>): Promise<ApiResponse<Term>> {
    return apiService.put<Term>(`${this.endpoint}/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    return apiService.delete<void>(`${this.endpoint}/${id}`);
  }
}

export const termService = new TermService();
