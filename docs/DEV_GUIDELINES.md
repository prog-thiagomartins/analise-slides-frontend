# Configurações de Desenvolvimento

## Estrutura de Pastas Obrigatória

```
src/
├── components/     → Componentes reutilizáveis (.tsx)
├── pages/         → Páginas principais (.tsx)
├── routes/        → Configuração de rotas (.tsx)
├── hooks/         → Hooks customizados (.ts)
├── contexts/      → Context API (.tsx)
├── services/      → APIs e serviços (.ts)
├── types/         → Interfaces e tipos (.ts)
├── utils/         → Funções auxiliares (.ts)
└── assets/        → Imagens, ícones, etc.
```

## Padrões Mandatórios

### 1. Componentes (.tsx)

- Sempre funcionais com TypeScript
- Props tipadas com interface
- Export default no final
- Usar React.FC quando necessário

### 2. Hooks (.ts)

- Prefixo "use" obrigatório
- Retornar objeto ou array
- Tipar retorno quando necessário

### 3. Serviços (.ts)

- Usar Axios configurado
- Implementar tratamento de erro
- Tipar responses da API

### 4. Páginas (.tsx)

- Uma página por arquivo
- Nome do arquivo = nome da página
- Implementar loading e error states

### 5. Tipos (.ts)

- Interfaces para props de componentes
- Tipos para responses de API
- Enums quando apropriado

## Scripts de Desenvolvimento

- `npm run dev` - Desenvolvimento
- `npm run build` - Build produção
- `npm run lint` - Verificar código
- `npm run format` - Formatar código

## Comandos Git

- Feature: `git checkout -b feature/nome-da-feature`
- Bugfix: `git checkout -b fix/nome-do-bug`
- Commit: `git commit -m "tipo: descrição"`
