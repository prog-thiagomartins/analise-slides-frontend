# Documentação do Frontend

## Índice

1. [Visão Geral](#visão-geral)
2. [Estrutura de Pastas](#estrutura-de-pastas)
3. [Principais Dependências](#principais-dependências)
4. [Padrões de Componentes](#padrões-de-componentes)
5. [Páginas e Rotas](#páginas-e-rotas)
6. [Hooks Customizados](#hooks-customizados)
7. [Contextos Globais](#contextos-globais)
8. [Serviços e Comunicação com API](#serviços-e-comunicação-com-api)
9. [Tipagens TypeScript](#tipagens-typescript)
10. [Utilitários e Helpers](#utilitários-e-helpers)
11. [Estilização com Tailwind CSS](#estilização-com-tailwind-css)
12. [Configuração e Scripts](#configuração-e-scripts)
13. [Boas Práticas e Contribuição](#boas-práticas-e-contribuição)

---

## 1. Visão Geral

Este projeto é um frontend desenvolvido em React 19, utilizando Vite como bundler, TypeScript para tipagem estática, Tailwind CSS para estilização, React Router DOM para roteamento, Axios para requisições HTTP, além de ESLint e Prettier para padronização de código.

O objetivo é fornecer uma interface moderna, responsiva e de fácil manutenção, seguindo padrões de desenvolvimento escaláveis e reutilizáveis.

---

## 2. Estrutura de Pastas

A estrutura do projeto segue o padrão abaixo:

```
src/
  components/      # Componentes reutilizáveis (UI, layout, forms)
  pages/           # Páginas principais da aplicação
  routes/          # Gerenciamento de rotas
  hooks/           # Hooks customizados
  contexts/        # Contextos globais (React Context)
  services/        # Serviços de comunicação com APIs
  types/           # Tipagens globais e entidades
  utils/           # Funções utilitárias e helpers
  assets/          # Imagens e SVGs
  styles/          # Arquivos de estilo (Tailwind)
```

Cada pasta possui um `README.md` ou documentação interna explicando seu propósito e exemplos de uso.

---

## 3. Principais Dependências

- **React 19**: Biblioteca principal para construção da UI.
- **Vite**: Bundler para desenvolvimento rápido.
- **TypeScript**: Tipagem estática.
- **Tailwind CSS**: Utilitário para estilização.
- **React Router DOM**: Gerenciamento de rotas.
- **Axios**: Requisições HTTP.
- **ESLint & Prettier**: Linting e formatação.

---

## 4. Padrões de Componentes

Os componentes seguem o padrão definido em `.github/patterns/COMPONENTS.md`. São funcionais, tipados, e organizados em subpastas por domínio (UI, layout, forms). Devem ser reutilizáveis e desacoplados.

Exemplo de estrutura:

- `components/ui/Loader.tsx`
- `components/layout/Header.tsx`

---

## 5. Páginas e Rotas

As páginas estão em `src/pages/` e representam telas completas. O roteamento é gerenciado em `src/routes/`, utilizando React Router DOM. Siga o padrão de `.github/patterns/PAGES.md` e `.github/patterns/STRUCTURE.md`.

---

## 6. Hooks Customizados

Hooks customizados ficam em `src/hooks/` e seguem o padrão de `.github/patterns/HOOKS.md`. Exemplos: `useApi`, `useAuth`, `useFetch`, `useLoading`, `useNotification`, `useUpload`.

---

## 7. Contextos Globais

Contextos React para estado global ficam em `src/contexts/`. Exemplos: `AuthContext`, `AppContext`, `NotificationContext`. Siga o padrão de composição e tipagem.

---

## 8. Serviços e Comunicação com API

Serviços para comunicação com backend ficam em `src/services/`. Cada serviço é responsável por um domínio (ex: `authService`, `analysisService`). Utilize Axios e siga o padrão de `.github/patterns/SERVICES.md`.

---

## 9. Tipagens TypeScript

Todas as tipagens globais e entidades ficam em `src/types/`. Siga o padrão de `.github/patterns/TYPES.md` para garantir consistência e segurança de tipos.

---

## 10. Utilitários e Helpers

Funções utilitárias e helpers ficam em `src/utils/`. Exemplos: `axiosInterceptors`, `sessionTimeout`, `storage`, `withLoading`.

---

## 11. Estilização com Tailwind CSS

A estilização é feita com Tailwind CSS, configurado em `tailwind.config.js` e `postcss.config.js`. Siga o padrão de `.github/patterns/STYLING.md` para garantir consistência visual.

---

## 12. Configuração e Scripts

- **Build**: `npm run build`
- **Dev**: `npm run dev`
- **Lint**: `npm run lint`
- **Format**: `npm run format`

Configurações principais:

- `vite.config.ts`: Configuração do Vite
- `tsconfig.json`: Configuração TypeScript
- `eslint.config.js`: Regras de lint
- `tailwind.config.js`: Configuração Tailwind

---

## 13. Boas Práticas e Contribuição

- Sempre siga os padrões definidos em `.github/patterns/`.
- Escreva código limpo, tipado e documentado.
- Prefira componentes reutilizáveis e hooks customizados.
- Mantenha a separação de responsabilidades.
- Antes de subir PR, rode lint e testes.
- Consulte os arquivos de padrões antes de criar novos arquivos.

---

Para dúvidas ou sugestões, consulte o time de desenvolvimento ou os arquivos de padrões na pasta `.github/patterns/`.
