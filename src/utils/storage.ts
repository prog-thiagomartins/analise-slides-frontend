import type { User } from '../types/User';

const USER_KEY = 'auth_user';

export const storage = {
  setUser: (user: User) => localStorage.setItem(USER_KEY, JSON.stringify(user)),
  getUser: (): User | null => {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  },
  removeUser: () => localStorage.removeItem(USER_KEY),

  clearAll: () => {
    localStorage.removeItem(USER_KEY);
  },
};
