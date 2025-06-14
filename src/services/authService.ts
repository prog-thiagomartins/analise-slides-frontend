// src/services/authService.ts
// Responsável por autenticação
import axios from 'axios';
import type { User } from '../types/User';

const API = '/api/auth';

export const authService = {
  login: async (email: string, password: string) => {
    const response = await axios.post(`${API}/login`, { email, password });
    return response.data as { token: string; user: User };
  },

  register: async (data: { name: string; email: string; password: string }) => {
    const response = await axios.post(`${API}/register`, data);
    return response.data as { token: string; user: User };
  },
};
