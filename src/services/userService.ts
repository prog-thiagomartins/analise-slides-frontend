// src/services/userService.ts
// Responsável por operações do usuário
import { apiService } from './api';
import type { User } from '../types/User';
import type { ApiResponse } from '../types';

class UserService {
  private readonly endpoint = '/users';

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return apiService.get<User>(`${this.endpoint}/me`);
  }

  async updateUser(data: Partial<User>): Promise<ApiResponse<User>> {
    return apiService.put<User>(`${this.endpoint}/me`, data);
  }

  async updatePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<ApiResponse<void>> {
    return apiService.post<void>(`${this.endpoint}/update-password`, {
      currentPassword,
      newPassword,
    });
  }

  async deleteAccount(): Promise<ApiResponse<void>> {
    return apiService.delete<void>(`${this.endpoint}/me`);
  }
}

export const userService = new UserService();
