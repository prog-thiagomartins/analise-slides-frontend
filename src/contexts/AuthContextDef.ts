import { createContext } from 'react';
import type { User } from '../types/User';

export interface AuthContextType {
  user: User | null;
  roles: string[];
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;
  register: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  getCurrentUser: () => Promise<void>;
  updateUser: (
    data: Partial<User>
  ) => Promise<{ success: boolean; message: string }>;
  updatePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<{ success: boolean; message: string }>;
  deleteAccount: () => Promise<{ success: boolean; message: string }>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
