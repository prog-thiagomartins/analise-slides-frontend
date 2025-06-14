// types/User.ts

export type UUID = string;

export type UserStatus = 'active' | 'inactive';

export interface User {
  id: UUID;
  name: string;
  email: string;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
  roles: string[];
}
