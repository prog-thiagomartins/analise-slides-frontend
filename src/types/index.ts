// Tipos globais da aplicação

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

// Tipos para roteamento
export interface RouteParams {
  [key: string]: string | undefined;
}

// Tipos para formulários
export interface FormState<T> {
  values: T;
  errors: Record<keyof T, string>;
  isSubmitting: boolean;
}
