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
    // Adiciona log para depuração
    console.log('Enviando requisição de registro para:', `${this.endpoint}/register`, data);
    return apiService.post<{ user: User; token: string }>(
      `${this.endpoint}/register`,
      data
    ).then((response) => {
      console.log('Resposta do backend (register):', response);
      // Se a resposta indicar erro, lança para ser tratada no contexto
      if (!response.success) {
        const err = new Error(response.message || 'Erro no registro');
        // @ts-expect-error: adiciona detail se existir
        err.detail = response.message;
        throw err;
      }
      return response;
    }).catch((error) => {
      // Se vier erro do backend, tenta extrair detail
      const backendDetail = error?.response?.data?.detail || error.detail;
      if (backendDetail) {
        const err = new Error(backendDetail);
        // @ts-expect-error: adiciona detail
        err.detail = backendDetail;
        throw err;
      }
      console.error('Erro na requisição de registro:', error);
      throw error;
    });
  }

  async forgotPassword(email: string): Promise<ApiResponse<void>> {
    return apiService.post<void>(`${this.endpoint}/forgot-password`, { email });
  }

  async resetPassword(
    token: string,
    password: string
  ): Promise<ApiResponse<void>> {
    return apiService.post<void>(`${this.endpoint}/reset-password`, {
      token,
      password,
    });
  }
}

export const authService = new AuthService();
