# 🏷️ Padrões para Tipagens TypeScript

## Estrutura Obrigatória

### 1. Localização

- **Pasta**: `src/types/`
- **Extensão**: `.ts`
- **Nomenclatura**: camelCase para arquivos, PascalCase para tipos (ex: `user.ts`, `api.ts`)

### 2. Estrutura do Arquivo

```typescript
// Interfaces para entidades
export interface EntityName {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Types para variações
export type EntityStatus = 'active' | 'inactive' | 'pending';

// Tipos para operações
export type CreateEntityData = Omit<
  EntityName,
  'id' | 'createdAt' | 'updatedAt'
>;
export type UpdateEntityData = Partial<CreateEntityData>;

// Tipos para responses de API
export interface EntityResponse extends ApiResponse<EntityName> {}
export interface EntityListResponse extends ApiResponse<EntityName[]> {}
```

## Regras Mandatórias

### ✅ DEVE fazer:

- Usar `interface` para objetos
- Usar `type` para unions, intersections, etc.
- Separar por domínio (user.ts, api.ts, etc.)
- Exportar todos os tipos
- Documentar tipos complexos
- Usar utility types quando apropriado

### ❌ NÃO DEVE fazer:

- Misturar tipos de diferentes domínios
- Usar `any` (preferir `unknown`)
- Tipos inline complexos
- Duplicação de tipos
- Tipos muito genéricos

## Arquivo Principal: `src/types/index.ts`

```typescript
// Re-export de todos os tipos
export * from './api';
export * from './user';
export * from './auth';
export * from './common';
export * from './forms';
export * from './router';
```

## Exemplos

### Tipos de API (`src/types/api.ts`)

```typescript
// Response padrão da API
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  errors?: string[];
}

// Tipos para paginação
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Estados de loading
export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

// Tipos para HTTP
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface RequestConfig {
  method: HttpMethod;
  url: string;
  data?: any;
  headers?: Record<string, string>;
}
```

### Tipos de Usuário (`src/types/user.ts`)

```typescript
// Interface principal do usuário
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

// Enums para status e roles
export type UserRole = 'admin' | 'user' | 'moderator';
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending';

// Tipos para operações CRUD
export type CreateUserData = Pick<User, 'email' | 'name' | 'role'> & {
  password: string;
};

export type UpdateUserData = Partial<
  Pick<User, 'name' | 'avatar' | 'role' | 'status'>
>;

// Tipos específicos para UI
export interface UserProfile extends User {
  preferences: UserPreferences;
  statistics: UserStatistics;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notifications: NotificationSettings;
}

export interface UserStatistics {
  loginCount: number;
  lastActivity: Date;
  createdItemsCount: number;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  inApp: boolean;
}

// Tipos para autenticação
export interface UserSession {
  user: User;
  token: string;
  expiresAt: Date;
}
```

### Tipos de Autenticação (`src/types/auth.ts`)

```typescript
// Dados de login
export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// Dados de registro
export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

// Response de autenticação
export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

// Estado de autenticação
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error?: string;
}

// Tipos para recuperação de senha
export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

// Permissões
export type Permission =
  | 'users:read'
  | 'users:write'
  | 'users:delete'
  | 'admin:access'
  | 'reports:read'
  | 'reports:write';

export interface UserPermissions {
  userId: string;
  permissions: Permission[];
}
```

### Tipos Comuns (`src/types/common.ts`)

```typescript
// Tipos utilitários
export type ID = string | number;

export type Timestamp = Date | string;

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Estados de UI
export type ViewState = 'loading' | 'success' | 'error' | 'idle';

export interface UIState {
  view: ViewState;
  message?: string;
}

// Tipos para formulários
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState<T> {
  values: T;
  errors: Record<keyof T, string>;
  touched: Record<keyof T, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
}

// Tipos para modais
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// Tipos para tabelas
export interface TableColumn<T> {
  key: keyof T;
  title: string;
  sortable?: boolean;
  render?: (value: any, record: T) => React.ReactNode;
}

export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  pagination?: PaginationParams;
  onSort?: (field: keyof T, order: 'asc' | 'desc') => void;
}

// Tipos para notificações
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
  actions?: NotificationAction[];
}

export interface NotificationAction {
  label: string;
  action: () => void;
}
```

### Tipos para Rotas (`src/types/router.ts`)

```typescript
// Parâmetros de rota
export interface RouteParams {
  [key: string]: string | undefined;
}

// Configuração de rota
export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
  private?: boolean;
  roles?: UserRole[];
}

// Estados de navegação
export interface NavigationState {
  from?: string;
  returnUrl?: string;
  data?: any;
}

// Breadcrumb
export interface BreadcrumbItem {
  label: string;
  path?: string;
  active?: boolean;
}
```
