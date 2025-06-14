// Contextos globais da aplicação
// Exemplo: AuthContext, ThemeContext, etc.

import { NotificationProvider } from './NotificationContext';
import { setGlobalNotify } from '../utils/axiosInterceptors';
import { useNotification } from './NotificationContext';

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const { notify } = useNotification();
  setGlobalNotify(notify);
  return <NotificationProvider>{children}</NotificationProvider>;
};
