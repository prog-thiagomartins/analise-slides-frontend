import axios from 'axios';
import { storage } from './storage';

// Função para exibir notificação fora do React tree
let notify:
  | ((msg: string, type?: 'success' | 'error' | 'info' | 'warning') => void)
  | null = null;
export function setGlobalNotify(fn: typeof notify) {
  notify = fn;
}

axios.interceptors.request.use(config => {
  // Não precisa mais adicionar token manualmente (cookie HttpOnly)
  return config;
});

axios.interceptors.response.use(
  response => response,
  error => {
    let message = 'Erro inesperado. Tente novamente.';
    if (error.response) {
      if (error.response.status === 401) {
        message = 'Sessão expirada. Faça login novamente.';
        storage.clearAll();
        if (notify) notify(message, 'error');
        window.location.href = '/login';
      } else if (error.response.status === 403) {
        message = 'Acesso negado. Você não tem permissão.';
        if (notify) notify(message, 'warning');
      } else if (error.response.status === 500) {
        message = 'Erro interno do servidor. Tente novamente mais tarde.';
        if (notify) notify(message, 'error');
      }
    }
    return Promise.reject(error);
  }
);
