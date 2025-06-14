# 🌐 Padrões para Serviços e APIs

## Estrutura Obrigatória

### 1. Localização

- **Pasta**: `src/services/`
- **Extensão**: `.ts`
- **Nomenclatura**: camelCase (ex: `userService.ts`, `authService.ts`)

### 2. Estrutura do Arquivo

```typescript
import { apiService } from './api';
import type { ApiResponse, EntityType } from '../types';

class EntityService {
  private readonly endpoint = '/entities';

  async getAll(): Promise<ApiResponse<EntityType[]>> {
    return await apiService.get<EntityType[]>(this.endpoint);
  }

  async getById(id: string): Promise<ApiResponse<EntityType>> {
    return await apiService.get<EntityType>(`${this.endpoint}/${id}`);
  }

  async create(data: Omit<EntityType, 'id'>): Promise<ApiResponse<EntityType>> {
    return await apiService.post<EntityType>(this.endpoint, data);
  }

  async update(
    id: string,
    data: Partial<EntityType>
  ): Promise<ApiResponse<EntityType>> {
    return await apiService.put<EntityType>(`${this.endpoint}/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    return await apiService.delete<void>(`${this.endpoint}/${id}`);
  }
}

export const entityService = new EntityService();
```

## Configuração Base da API

### Arquivo: `src/services/api.ts`

```typescript
import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError,
} from 'axios';
import type { ApiResponse } from '../types';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(this.handleError(error));
      }
    );
  }

  private handleError(error: AxiosError): Error {
    const message =
      error.response?.data?.message || error.message || 'Erro desconhecido';
    return new Error(message);
  }

  async get<T>(url: string): Promise<ApiResponse<T>> {
    const response = await this.api.get<ApiResponse<T>>(url);
    return response.data;
  }

  async post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    const response = await this.api.post<ApiResponse<T>>(url, data);
    return response.data;
  }

  async put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    const response = await this.api.put<ApiResponse<T>>(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    const response = await this.api.delete<ApiResponse<T>>(url);
    return response.data;
  }
}

export const apiService = new ApiService();
```

## Regras Mandatórias

### ✅ DEVE fazer:

- Usar classes para organizar endpoints relacionados
- Tipar todas as responses
- Implementar tratamento de erro
- Usar interceptors para auth
- Configurar timeout
- Usar variáveis de ambiente
- Export como instância singleton

### ❌ NÃO DEVE fazer:

- Funções soltas para cada endpoint
- Hardcode de URLs
- Ignorar tratamento de erro
- Multiple instances da API
- Lógica de UI nos services

## Exemplos

### Serviço de Usuários

```typescript
import { apiService } from './api';
import type {
  ApiResponse,
  User,
  CreateUserData,
  UpdateUserData,
} from '../types';

class UserService {
  private readonly endpoint = '/users';

  async getUsers(
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<User[]>> {
    return await apiService.get<User[]>(
      `${this.endpoint}?page=${page}&limit=${limit}`
    );
  }

  async getUserById(id: string): Promise<ApiResponse<User>> {
    return await apiService.get<User>(`${this.endpoint}/${id}`);
  }

  async createUser(userData: CreateUserData): Promise<ApiResponse<User>> {
    return await apiService.post<User>(this.endpoint, userData);
  }

  async updateUser(
    id: string,
    userData: UpdateUserData
  ): Promise<ApiResponse<User>> {
    return await apiService.put<User>(`${this.endpoint}/${id}`, userData);
  }

  async deleteUser(id: string): Promise<ApiResponse<void>> {
    return await apiService.delete<void>(`${this.endpoint}/${id}`);
  }

  async searchUsers(query: string): Promise<ApiResponse<User[]>> {
    return await apiService.get<User[]>(
      `${this.endpoint}/search?q=${encodeURIComponent(query)}`
    );
  }
}

export const userService = new UserService();
```

### Serviço de Autenticação

```typescript
import { apiService } from './api';
import type {
  ApiResponse,
  LoginData,
  RegisterData,
  AuthResponse,
} from '../types';

class AuthService {
  private readonly endpoint = '/auth';

  async login(credentials: LoginData): Promise<ApiResponse<AuthResponse>> {
    const response = await apiService.post<AuthResponse>(
      `${this.endpoint}/login`,
      credentials
    );

    if (response.success && response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response;
  }

  async register(userData: RegisterData): Promise<ApiResponse<AuthResponse>> {
    return await apiService.post<AuthResponse>(
      `${this.endpoint}/register`,
      userData
    );
  }

  async logout(): Promise<void> {
    try {
      await apiService.post(`${this.endpoint}/logout`);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    return await apiService.post<{ token: string }>(`${this.endpoint}/refresh`);
  }

  async forgotPassword(email: string): Promise<ApiResponse<void>> {
    return await apiService.post<void>(`${this.endpoint}/forgot-password`, {
      email,
    });
  }

  async resetPassword(
    token: string,
    newPassword: string
  ): Promise<ApiResponse<void>> {
    return await apiService.post<void>(`${this.endpoint}/reset-password`, {
      token,
      password: newPassword,
    });
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}

export const authService = new AuthService();
```
