// src/services/chatService.ts
import { apiService } from './api';
import type { Conversation } from '../types/Conversation';
import type { ApiResponse } from '../types';

class ChatService {
  private readonly endpoint = '/chats';

  async getAll(): Promise<ApiResponse<Conversation[]>> {
    return apiService.get<Conversation[]>(this.endpoint);
  }

  async getById(id: string): Promise<ApiResponse<Conversation>> {
    return apiService.get<Conversation>(`${this.endpoint}/${id}`);
  }

  async create(
    data: Omit<Conversation, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<ApiResponse<Conversation>> {
    return apiService.post<Conversation>(this.endpoint, data);
  }

  async update(
    id: string,
    data: Partial<Conversation>
  ): Promise<ApiResponse<Conversation>> {
    return apiService.put<Conversation>(`${this.endpoint}/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    return apiService.delete<void>(`${this.endpoint}/${id}`);
  }
}

export const chatService = new ChatService();
