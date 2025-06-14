// src/services/authService.ts
// Responsável por autenticação
import { apiService } from './api';
import type { User } from '../types/User';
import type { ApiResponse } from '../types';

class AuthService {
  private readonly endpoint = '/auth';

  async login(
    email: string,
    password: string
  ): Promise<ApiResponse<{ user: User; token: string }>> {
    return apiService.post<{ user: User; token: string }>(
      `${this.endpoint}/login`,
      { email, password }
    );
  }

  async register(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<ApiResponse<{ user: User; token: string }>> {
    return apiService.post<{ user: User; token: string }>(
      `${this.endpoint}/register`,
      data
    );
  }
}

export const authService = new AuthService();
