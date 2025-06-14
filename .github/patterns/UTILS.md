# 🛠️ Padrões para Utilitários e Helpers

## Estrutura Obrigatória

### 1. Localização

- **Pasta**: `src/utils/`
- **Extensão**: `.ts`
- **Nomenclatura**: camelCase (ex: `formatters.ts`, `validators.ts`, `constants.ts`)

### 2. Estrutura do Arquivo

```typescript
// Funções relacionadas por categoria
export const categoryName = {
  functionName: (param: Type): ReturnType => {
    // Implementação
  },

  anotherFunction: (param: Type): ReturnType => {
    // Implementação
  },
};

// Ou funções individuais quando apropriado
export const utilityFunction = (param: Type): ReturnType => {
  // Implementação
};
```

## Regras Mandatórias

### ✅ DEVE fazer:

- Agrupar funções relacionadas em objetos
- Tipar todos os parâmetros e retornos
- Funções puras (sem side effects)
- Testes unitários para cada função
- Documentação JSDoc quando necessário
- Export nomeado

### ❌ NÃO DEVE fazer:

- Funções com side effects
- Lógica de UI nos utils
- Funções muito específicas de um componente
- Mutação de parâmetros
- Export default

## Exemplos

### Formatadores (`src/utils/formatters.ts`)

```typescript
/**
 * Funções para formatação de dados
 */
export const formatters = {
  /**
   * Formata um número como moeda brasileira
   */
  currency: (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  },

  /**
   * Formata uma data no padrão brasileiro
   */
  date: (date: Date | string, options?: Intl.DateTimeFormatOptions): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      ...options,
    }).format(dateObj);
  },

  /**
   * Formata CPF
   */
  cpf: (cpf: string): string => {
    const numbers = cpf.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  },

  /**
   * Formata telefone
   */
  phone: (phone: string): string => {
    const numbers = phone.replace(/\D/g, '');

    if (numbers.length === 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }

    return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  },

  /**
   * Trunca texto com reticências
   */
  truncate: (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
  },

  /**
   * Primeira letra maiúscula
   */
  capitalize: (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  },

  /**
   * Formata bytes em unidades legíveis
   */
  fileSize: (bytes: number): string => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';

    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
  },
};
```

### Validadores (`src/utils/validators.ts`)

```typescript
/**
 * Funções para validação de dados
 */
export const validators = {
  /**
   * Valida email
   */
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Valida CPF
   */
  cpf: (cpf: string): boolean => {
    const numbers = cpf.replace(/\D/g, '');

    if (numbers.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(numbers)) return false;

    // Validação do primeiro dígito
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(numbers.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(numbers.charAt(9))) return false;

    // Validação do segundo dígito
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(numbers.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(numbers.charAt(10))) return false;

    return true;
  },

  /**
   * Valida CNPJ
   */
  cnpj: (cnpj: string): boolean => {
    const numbers = cnpj.replace(/\D/g, '');

    if (numbers.length !== 14) return false;
    if (/^(\d)\1{13}$/.test(numbers)) return false;

    // Validação dos dígitos verificadores
    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(numbers.charAt(i)) * weights1[i];
    }
    let remainder = sum % 11;
    const digit1 = remainder < 2 ? 0 : 11 - remainder;

    if (digit1 !== parseInt(numbers.charAt(12))) return false;

    sum = 0;
    for (let i = 0; i < 13; i++) {
      sum += parseInt(numbers.charAt(i)) * weights2[i];
    }
    remainder = sum % 11;
    const digit2 = remainder < 2 ? 0 : 11 - remainder;

    return digit2 === parseInt(numbers.charAt(13));
  },

  /**
   * Valida senha forte
   */
  strongPassword: (
    password: string
  ): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('Senha deve ter no mínimo 8 caracteres');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Senha deve conter pelo menos uma letra maiúscula');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Senha deve conter pelo menos uma letra minúscula');
    }

    if (!/\d/.test(password)) {
      errors.push('Senha deve conter pelo menos um número');
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Senha deve conter pelo menos um caractere especial');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },

  /**
   * Valida URL
   */
  url: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Valida se é número
   */
  number: (value: string): boolean => {
    return !isNaN(Number(value)) && value.trim() !== '';
  },

  /**
   * Valida range de data
   */
  dateRange: (startDate: Date, endDate: Date): boolean => {
    return startDate <= endDate;
  },
};
```

### Constantes (`src/utils/constants.ts`)

```typescript
/**
 * Constantes da aplicação
 */

// URLs e endpoints
export const API_ENDPOINTS = {
  USERS: '/users',
  AUTH: '/auth',
  POSTS: '/posts',
  UPLOAD: '/upload',
} as const;

// Configurações
export const APP_CONFIG = {
  NAME: 'Projeto Análises',
  VERSION: '1.0.0',
  DESCRIPTION: 'Sistema de análises e relatórios',
  AUTHOR: 'Equipe de Desenvolvimento',
} as const;

// Limites e configurações
export const LIMITS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_FILES: 10,
  PAGE_SIZE: 20,
  TIMEOUT: 30000,
} as const;

// Mensagens
export const MESSAGES = {
  SUCCESS: {
    SAVE: 'Dados salvos com sucesso!',
    DELETE: 'Item excluído com sucesso!',
    LOGIN: 'Login realizado com sucesso!',
    LOGOUT: 'Logout realizado com sucesso!',
  },
  ERROR: {
    GENERIC: 'Ocorreu um erro inesperado. Tente novamente.',
    NETWORK: 'Erro de conexão. Verifique sua internet.',
    UNAUTHORIZED: 'Você não tem permissão para esta ação.',
    NOT_FOUND: 'Item não encontrado.',
    VALIDATION: 'Dados inválidos. Verifique os campos.',
  },
  LOADING: {
    DEFAULT: 'Carregando...',
    SAVING: 'Salvando...',
    DELETING: 'Excluindo...',
    UPLOADING: 'Enviando arquivo...',
  },
} as const;

// Status codes HTTP
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Regex patterns
export const PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
  CPF: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  CNPJ: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
  PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
} as const;

// Cores do Tailwind (para uso em JS)
export const COLORS = {
  PRIMARY: '#3b82f6',
  SECONDARY: '#6b7280',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  INFO: '#06b6d4',
} as const;

// Breakpoints responsivos
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;
```

### Helpers Diversos (`src/utils/helpers.ts`)

```typescript
/**
 * Funções auxiliares diversas
 */

/**
 * Gera ID único
 */
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Deep clone de objeto
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
  if (obj instanceof Array)
    return obj.map(item => deepClone(item)) as unknown as T;

  const cloned = {} as T;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }

  return cloned;
};

/**
 * Remove propriedades undefined/null de um objeto
 */
export const cleanObject = <T extends Record<string, any>>(
  obj: T
): Partial<T> => {
  const cleaned: Partial<T> = {};

  for (const key in obj) {
    if (obj[key] !== undefined && obj[key] !== null) {
      cleaned[key] = obj[key];
    }
  }

  return cleaned;
};

/**
 * Converte query string em objeto
 */
export const parseQueryString = (
  queryString: string
): Record<string, string> => {
  const params = new URLSearchParams(queryString);
  const result: Record<string, string> = {};

  for (const [key, value] of params) {
    result[key] = value;
  }

  return result;
};

/**
 * Converte objeto em query string
 */
export const objectToQueryString = (obj: Record<string, any>): string => {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  }

  return params.toString();
};

/**
 * Verifica se é mobile
 */
export const isMobile = (): boolean => {
  return window.innerWidth < 768;
};

/**
 * Scroll suave para elemento
 */
export const scrollToElement = (elementId: string): void => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

/**
 * Download de arquivo
 */
export const downloadFile = (data: Blob, filename: string): void => {
  const url = URL.createObjectURL(data);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Copy to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback para navegadores mais antigos
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textArea);
    return success;
  }
};
```
