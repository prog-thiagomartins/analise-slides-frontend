// src/services/executionHistoryService.ts
import { apiService } from './api';
import type { ExecutionHistory } from '../types/ExecutionHistory';
import type { ApiResponse } from '../types';

class ExecutionHistoryService {
  private readonly endpoint = '/execution-history';

  async getAll(): Promise<ApiResponse<ExecutionHistory[]>> {
    return apiService.get<ExecutionHistory[]>(this.endpoint);
  }

  async getById(id: string): Promise<ApiResponse<ExecutionHistory>> {
    return apiService.get<ExecutionHistory>(`${this.endpoint}/${id}`);
  }

  async create(
    data: Omit<ExecutionHistory, 'id' | 'createdAt'>
  ): Promise<ApiResponse<ExecutionHistory>> {
    return apiService.post<ExecutionHistory>(this.endpoint, data);
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    return apiService.delete<void>(`${this.endpoint}/${id}`);
  }
}

export const executionHistoryService = new ExecutionHistoryService();
