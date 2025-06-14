# 🧩 Padrões para Componentes React

## Estrutura Obrigatória

### 1. Localização

- **Pasta**: `src/components/`
- **Extensão**: `.tsx`
- **Nomenclatura**: PascalCase (ex: `UserProfile.tsx`)

### 2. Estrutura do Arquivo

```typescript
import React from 'react';
import type { ComponentProps } from '../types';

interface Props {
  // Sempre tipar props
}

const ComponentName: React.FC<Props> = ({ prop1, prop2 }) => {
  // Lógica do componente

  return (
    <div className="tailwind-classes">
      {/* JSX */}
    </div>
  );
};

export default ComponentName;
```

## Regras Mandatórias

### ✅ DEVE fazer:

- Usar `React.FC<Props>` para tipagem
- Criar interface `Props` para todas as props
- Usar Tailwind CSS para estilização
- Implementar loading states quando necessário
- Usar `React.memo()` para otimização quando apropriado
- Export default no final do arquivo

### ❌ NÃO DEVE fazer:

- Usar class components
- CSS inline ou styled-components
- Props sem tipagem
- Múltiplos exports default
- Lógica complexa dentro do JSX

## Exemplos

### Componente Simples

```typescript
interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  variant = 'primary',
  disabled = false
}) => {
  const baseClasses = "px-4 py-2 rounded font-medium transition-colors";
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300"
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
```

### Componente com Estado

```typescript
interface CounterProps {
  initialValue?: number;
  onValueChange?: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  initialValue = 0,
  onValueChange
}) => {
  const [count, setCount] = useState(initialValue);

  const handleIncrement = () => {
    const newValue = count + 1;
    setCount(newValue);
    onValueChange?.(newValue);
  };

  return (
    <div className="flex items-center space-x-4">
      <button onClick={() => setCount(count - 1)}>-</button>
      <span className="text-xl font-bold">{count}</span>
      <button onClick={handleIncrement}>+</button>
    </div>
  );
};
```
