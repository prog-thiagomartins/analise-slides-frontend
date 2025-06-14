// Contextos globais da aplicação
// Exemplo: AuthContext, ThemeContext, etc.

import { NotificationProvider } from './NotificationContext';

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return <NotificationProvider>{children}</NotificationProvider>;
};
