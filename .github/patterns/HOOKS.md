# 🎣 Padrões para Hooks Customizados

## Estrutura Obrigatória

### 1. Localização

- **Pasta**: `src/hooks/`
- **Extensão**: `.ts`
- **Nomenclatura**: camelCase com prefixo "use" (ex: `useAuth.ts`, `useLocalStorage.ts`)

### 2. Estrutura do Arquivo

```typescript
import { useState, useEffect, useCallback } from 'react';
import type { HookReturnType } from '../types';

export const useHookName = (param?: any): HookReturnType => {
  // Estado interno
  const [state, setState] = useState(initialValue);

  // Funções
  const handleAction = useCallback(() => {
    // Lógica
  }, [dependencies]);

  // Effects
  useEffect(() => {
    // Side effects
  }, [dependencies]);

  // Retorno
  return {
    // valores e funções
  };
};
```

## Regras Mandatórias

### ✅ DEVE fazer:

- Prefixo "use" obrigatório
- Tipar o retorno do hook
- Usar `useCallback` para funções
- Usar `useMemo` quando apropriado
- Export nomeado (não default)
- Documentar parâmetros e retorno

### ❌ NÃO DEVE fazer:

- Usar sem prefixo "use"
- Retorno sem tipagem
- Lógica de UI dentro do hook
- Side effects desnecessários
- Dependências incorretas

## Exemplos

### Hook de Estado Simples

```typescript
interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useCounter = (initialValue: number = 0): UseCounterReturn => {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount(prev => prev - 1);
  }, []);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  return {
    count,
    increment,
    decrement,
    reset,
  };
};
```

### Hook de API

```typescript
interface UseApiReturn<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useApi = <T>(url: string): UseApiReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiService.get<T>(url);
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  };
};
```

### Hook de LocalStorage

```typescript
type SetValue<T> = T | ((val: T) => T);

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: SetValue<T>) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Erro ao ler localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: SetValue<T>) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Erro ao definir localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
};
```

### Hook de Form

```typescript
interface UseFormReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  handleChange: (field: keyof T, value: any) => void;
  handleSubmit: (onSubmit: (values: T) => Promise<void>) => Promise<void>;
  reset: () => void;
}

export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  validationRules?: Partial<Record<keyof T, (value: any) => string | undefined>>
): UseFormReturn<T> => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = useCallback(
    (field: keyof T, value: any): string | undefined => {
      if (validationRules && validationRules[field]) {
        return validationRules[field]!(value);
      }
      return undefined;
    },
    [validationRules]
  );

  const handleChange = useCallback(
    (field: keyof T, value: any) => {
      setValues(prev => ({ ...prev, [field]: value }));

      const error = validate(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    },
    [validate]
  );

  const handleSubmit = useCallback(
    async (onSubmit: (values: T) => Promise<void>) => {
      setIsSubmitting(true);

      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Erro no submit:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values]
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    reset,
  };
};
```
