# 📁 Estrutura de Arquivos e Pastas

## Estrutura Obrigatória do Projeto

```
projeto-analises/
├── .github/                    → Configurações do GitHub
│   ├── patterns/              → Padrões de desenvolvimento
│   │   ├── COMPONENTS.md      → Padrões para componentes
│   │   ├── PAGES.md           → Padrões para páginas
│   │   ├── HOOKS.md           → Padrões para hooks
│   │   ├── SERVICES.md        → Padrões para serviços
│   │   ├── TYPES.md           → Padrões para tipagens
│   │   ├── UTILS.md           → Padrões para utilitários
│   │   ├── STYLING.md         → Padrões para estilização
│   │   └── STRUCTURE.md       → Este arquivo
│   ├── ISSUE_TEMPLATE/        → Templates para issues
│   ├── workflows/             → GitHub Actions
│   ├── CONTRIBUTING.md        → Guia de contribuição
│   ├── SECURITY.md           → Política de segurança
│   └── copilot-instructions.md → Instruções para Copilot
├── .vscode/                   → Configurações do VS Code
│   └── tasks.json            → Tasks do projeto
├── docs/                      → Documentação adicional
├── public/                    → Arquivos públicos
├── src/                       → Código fonte
│   ├── components/           → Componentes reutilizáveis
│   │   ├── ui/              → Componentes de UI base
│   │   ├── forms/           → Componentes de formulário
│   │   ├── layout/          → Componentes de layout
│   │   └── index.ts         → Export de componentes
│   ├── pages/               → Páginas da aplicação
│   │   ├── auth/           → Páginas de autenticação
│   │   ├── dashboard/      → Páginas do dashboard
│   │   └── index.ts        → Export de páginas
│   ├── routes/              → Configuração de rotas
│   │   ├── PrivateRoute.tsx → Rota privada
│   │   ├── PublicRoute.tsx  → Rota pública
│   │   └── index.tsx       → Configuração principal
│   ├── hooks/               → Hooks customizados
│   │   ├── api/            → Hooks para API
│   │   ├── ui/             → Hooks para UI
│   │   └── index.ts        → Export de hooks
│   ├── contexts/            → Contextos React
│   │   ├── AuthContext.tsx  → Contexto de autenticação
│   │   ├── ThemeContext.tsx → Contexto de tema
│   │   └── index.tsx       → Export de contextos
│   ├── services/            → Serviços e APIs
│   │   ├── api.ts          → Configuração base da API
│   │   ├── authService.ts  → Serviço de autenticação
│   │   ├── userService.ts  → Serviço de usuários
│   │   └── index.ts        → Export de serviços
│   ├── types/               → Tipagens TypeScript
│   │   ├── api.ts          → Tipos para API
│   │   ├── user.ts         → Tipos de usuário
│   │   ├── auth.ts         → Tipos de autenticação
│   │   ├── common.ts       → Tipos comuns
│   │   └── index.ts        → Export de tipos
│   ├── utils/               → Utilitários e helpers
│   │   ├── formatters.ts   → Formatadores
│   │   ├── validators.ts   → Validadores
│   │   ├── constants.ts    → Constantes
│   │   ├── helpers.ts      → Funções auxiliares
│   │   └── index.ts        → Export de utils
│   ├── assets/              → Recursos estáticos
│   │   ├── images/         → Imagens
│   │   ├── icons/          → Ícones
│   │   └── fonts/          → Fontes
│   ├── styles/              → Estilos globais
│   │   ├── globals.css     → Estilos globais
│   │   └── components.css  → Estilos de componentes
│   ├── App.tsx              → Componente principal
│   ├── main.tsx            → Entry point
│   ├── index.css           → Estilos base + Tailwind
│   └── vite-env.d.ts       → Tipos do Vite
├── .env.example               → Exemplo de variáveis ambiente
├── .gitignore                → Arquivos ignorados pelo Git
├── .prettierrc               → Configuração Prettier
├── eslint.config.js          → Configuração ESLint
├── index.html                → HTML principal
├── package.json              → Dependências e scripts
├── postcss.config.js         → Configuração PostCSS
├── README.md                 → Documentação do projeto
├── tailwind.config.js        → Configuração Tailwind
├── tsconfig.json            → Configuração TypeScript
├── tsconfig.app.json        → Config TS para app
├── tsconfig.node.json       → Config TS para Node
└── vite.config.ts           → Configuração Vite
```

## Regras de Organização

### 📂 Estrutura de Pastas

#### ✅ DEVE fazer:

- **Agrupar por funcionalidade**: Componentes relacionados na mesma pasta
- **Usar index.ts**: Para facilitar imports
- **Separar por tipo**: Componentes, hooks, services em pastas específicas
- **Subpastas lógicas**: ui/, forms/, layout/ dentro de components/
- **Nomenclatura consistente**: PascalCase para componentes, camelCase para outros

#### ❌ NÃO DEVE fazer:

- **Pastas muito profundas**: Máximo 3 níveis de profundidade
- **Arquivos soltos**: Sempre organizar em pastas apropriadas
- **Misturar tipos**: Não colocar hooks dentro de components/
- **Nomes genéricos**: Evitar nomes como "common", "shared" sem contexto

### 📄 Convenções de Nomenclatura

#### Arquivos:

- **Componentes**: `PascalCase.tsx` (ex: `UserProfile.tsx`)
- **Hooks**: `camelCase.ts` (ex: `useAuth.ts`)
- **Services**: `camelCase.ts` (ex: `userService.ts`)
- **Types**: `camelCase.ts` (ex: `user.ts`)
- **Utils**: `camelCase.ts` (ex: `formatters.ts`)
- **Pages**: `PascalCase.tsx` (ex: `HomePage.tsx`)

#### Pastas:

- **Tudo em lowercase**: `components/`, `hooks/`, `services/`
- **Separadas por hífen**: `user-profile/` (quando necessário)
- **Agrupamento lógico**: `auth/`, `dashboard/`, `ui/`

### 🔄 Exports e Imports

#### Estrutura de index.ts:

```typescript
// src/components/index.ts
export { default as Button } from './ui/Button';
export { default as Modal } from './ui/Modal';
export { default as UserCard } from './cards/UserCard';

// src/hooks/index.ts
export { useAuth } from './useAuth';
export { useLocalStorage } from './useLocalStorage';
export { useApi } from './api/useApi';

// src/services/index.ts
export { authService } from './authService';
export { userService } from './userService';
export { apiService } from './api';

// src/types/index.ts
export * from './user';
export * from './auth';
export * from './api';
export * from './common';
```

#### Padrão de Imports:

```typescript
// 1. React e bibliotecas
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// 2. Imports locais (mesmo nível ou acima)
import { Button, Modal } from '../components';
import { useAuth, useApi } from '../hooks';
import { userService } from '../services';

// 3. Imports de tipos
import type { User, ApiResponse } from '../types';

// 4. Imports relativos (mesmo diretório)
import { validateForm } from './helpers';
```

## Configurações de Arquivos

### package.json - Scripts Obrigatórios:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "preview": "vite preview",
    "format": "prettier --write src/**/*.{ts,tsx,css,md}",
    "format:check": "prettier --check src/**/*.{ts,tsx,css,md}",
    "type-check": "tsc --noEmit"
  }
}
```

### .gitignore Essencial:

```
# Dependencies
node_modules/
.pnp
.pnp.js

# Production
/dist
/build

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/settings.json
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*
```

### tsconfig.json - Configuração Base:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/services/*": ["./src/services/*"],
      "@/types/*": ["./src/types/*"],
      "@/utils/*": ["./src/utils/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```
