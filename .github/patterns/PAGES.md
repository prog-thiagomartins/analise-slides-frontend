# 📄 Padrões para Páginas e Rotas

## Estrutura Obrigatória

### 1. Localização

- **Pasta**: `src/pages/`
- **Extensão**: `.tsx`
- **Nomenclatura**: PascalCase (ex: `HomePage.tsx`, `UserProfile.tsx`)

### 2. Estrutura do Arquivo

```typescript
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLoading } from '../hooks/useLoading';
import type { PageProps } from '../types';

const PageName: React.FC = () => {
  const { isLoading, setLoading, setError } = useLoading();
  const navigate = useNavigate();
  const params = useParams();

  // Lógica da página

  if (isLoading) {
    return <div className="loading-component">Carregando...</div>;
  }

  return (
    <div className="page-container">
      {/* Conteúdo da página */}
    </div>
  );
};

export default PageName;
```

## Regras Mandatórias

### ✅ DEVE fazer:

- Implementar loading states
- Implementar error boundaries
- Usar React Router hooks quando necessário
- Layout responsivo com Tailwind
- SEO meta tags quando apropriado
- Lazy loading quando possível

### ❌ NÃO DEVE fazer:

- Lógica de negócio complexa na página
- Chamadas de API diretamente (use services)
- Estados globais sem Context API
- Múltiplas responsabilidades

## Configuração de Rotas

### Arquivo: `src/routes/index.tsx`

```typescript
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Lazy loading das páginas
const HomePage = React.lazy(() => import('../pages/HomePage'));
const AboutPage = React.lazy(() => import('../pages/AboutPage'));
const UserProfile = React.lazy(() => import('../pages/UserProfile'));

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="loading">Carregando...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/usuario/:id" element={<UserProfile />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
```

## Exemplos

### Página Simples

```typescript
const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Página Inicial
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4">
        {/* Conteúdo */}
      </main>
    </div>
  );
};
```

### Página com Parâmetros

```typescript
const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const { isLoading, setLoading, setError } = useLoading();

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const userData = await userService.getUserById(id);
        setUser(userData);
      } catch (error) {
        setError('Erro ao carregar usuário');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <div>Usuário não encontrado</div>;
  }

  return (
    <div className="user-profile">
      {/* Conteúdo do perfil */}
    </div>
  );
};
```
