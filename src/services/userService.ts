// src/services/userService.ts
// Responsável por operações do usuário
import axios from 'axios';
import type { User } from '../types/User';

const API = '/api/user';

export const userService = {
  async getCurrentUser() {
    const response = await axios.get(`${API}/me`);
    return response.data as User;
  },
  async updateUser(data: Partial<User>) {
    const response = await axios.put(`${API}/me`, data);
    return response.data as User;
  },
  async updatePassword(currentPassword: string, newPassword: string) {
    await axios.post(`${API}/update-password`, {
      currentPassword,
      newPassword,
    });
  },
  async deleteAccount() {
    await axios.delete(`${API}/me`);
  },
};
