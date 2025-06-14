import { useEffect, useState, useRef } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types/User';
import { AuthContext } from './AuthContextDef';
import type { AuthContextType } from './AuthContextDef';
import { storage } from '../utils/storage';
import { withLoading } from '../utils/withLoading';
import { authService } from '../services/authService';
import { userService } from '../services/userService';
import { setupSessionTimeout } from '../utils/sessionTimeout';
import { useNavigate, useLocation } from 'react-router-dom';
import { useNotification } from '../hooks/useNotification';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState<string[]>([]);
  const isAuthenticated = !!user;
  const sessionTimeoutRef = useRef<(() => void) | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { notify } = useNotification();

  // Ativa/desativa session timeout
  useEffect(() => {
    if (isAuthenticated) {
      sessionTimeoutRef.current = setupSessionTimeout(() => {
        logout('Sessão expirada por inatividade.');
      });
    } else if (sessionTimeoutRef.current) {
      sessionTimeoutRef.current();
      sessionTimeoutRef.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  // Verificação ativa de sessão ao carregar
  useEffect(() => {
    const disableAuth = import.meta.env.VITE_DISABLE_AUTH === 'true';
    if (disableAuth) {
      setLoading(false);
      return;
    }
    withLoading(setLoading, async () => {
      try {
        const currentUserResp = await userService.getCurrentUser();
        setUser(currentUserResp.data);
        setRoles(currentUserResp.data.roles || []);
      } catch {
        logout('Sessão inválida ou expirada. Faça login novamente.');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login: AuthContextType['login'] = async (email, password) => {
    const disableAuth = import.meta.env.VITE_DISABLE_AUTH === 'true';
    if (disableAuth) {
      // Mock user para ambiente de desenvolvimento
      setUser({
        id: 'dev-user',
        name: 'Usuário Dev',
        email,
        avatar: undefined,
        roles: ['admin'],
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as User);
      setRoles(['admin']);
      return { success: true, message: 'Login simulado (DEV).' };
    }
    return withLoading(setLoading, async () => {
      try {
        const loginResp = await authService.login(email, password);
        setUser(loginResp.data.user);
        setRoles(loginResp.data.user.roles || []);
        return { success: true, message: 'Login realizado com sucesso.' };
      } catch (err) {
        // @ts-expect-error: erro pode ser de qualquer tipo
        if (err?.response?.status === 401 || err?.response?.status === 403) {
          return { success: false, message: 'Email ou senha incorretos.' };
        }
        // Erro de rede, conexão, timeout, etc.
        return {
          success: false,
          message: 'Erro de conexão com o servidor ou API indisponível.',
        };
      }
    });
  };

  const register: AuthContextType['register'] = async data =>
    withLoading(setLoading, async () => {
      try {
        const registerResp = await authService.register(data);
        const userObj = registerResp.data.user || registerResp.data;
        setUser(userObj);
        setRoles(userObj.roles || []);
        return {
          success: registerResp.success,
          message: registerResp.message || 'Cadastro realizado com sucesso.',
        };
      } catch (err: unknown) {
        // Tenta extrair mensagem detalhada do backend
        type BackendError = {
          response?: {
            status?: number;
            data?: {
              detail?: string;
              message?: string;
              errors?: { msg?: string }[];
            };
          };
        };
        const errorTyped = err as BackendError;
        const data = errorTyped.response?.data;
        const status = errorTyped.response?.status;
        const detail =
          data?.errors?.[0]?.msg ||
          data?.message ||
          data?.detail ||
          (status === 409 && (data?.detail || data?.message || 'Este e-mail já está cadastrado. Tente recuperar a senha ou use outro e-mail.'));
        return {
          success: false,
          message: detail || 'Falha no cadastro.',
        };
      }
    });

  function logout(message?: string) {
    storage.clearAll();
    setUser(null);
    setRoles([]);
    if (sessionTimeoutRef.current) sessionTimeoutRef.current();
    // Só exibe notificação se não estiver em /login, /register, /sobre, /forgot-password ou /reset-password
    const path = location.pathname;
    const isPublic =
      path === '/login' ||
      path === '/register' ||
      path === '/sobre' ||
      path === '/forgot-password' ||
      path.startsWith('/reset-password');
    if (message && !isPublic) {
      notify(message, 'info');
    }
    // Não redireciona para login se estiver em página pública
    if (!isPublic) {
      navigate('/login', { replace: true });
    }
  }

  const getCurrentUser: AuthContextType['getCurrentUser'] = () =>
    withLoading(setLoading, async () => {
      try {
        const currentUserResp = await userService.getCurrentUser();
        setUser(currentUserResp.data);
        setRoles(currentUserResp.data.roles || []);
      } catch {
        logout('Sessão inválida ou expirada. Faça login novamente.');
      }
    });

  const updateUser: AuthContextType['updateUser'] = async data =>
    withLoading(setLoading, async () => {
      try {
        const updatedResp = await userService.updateUser(data);
        setUser(updatedResp.data);
        setRoles(updatedResp.data.roles || []);
        return { success: true, message: 'Dados atualizados com sucesso.' };
      } catch {
        return { success: false, message: 'Erro ao atualizar dados.' };
      }
    });

  const updatePassword: AuthContextType['updatePassword'] = async (
    currentPassword,
    newPassword
  ) =>
    withLoading(setLoading, async () => {
      try {
        await userService.updatePassword(currentPassword, newPassword);
        return { success: true, message: 'Senha atualizada com sucesso.' };
      } catch {
        return { success: false, message: 'Erro ao atualizar senha.' };
      }
    });

  const deleteAccount: AuthContextType['deleteAccount'] = () =>
    withLoading(setLoading, async () => {
      try {
        await userService.deleteAccount();
        logout('Conta excluída com sucesso.');
        return { success: true, message: 'Conta excluída com sucesso.' };
      } catch {
        return { success: false, message: 'Erro ao excluir conta.' };
      }
    });

  return (
    <AuthContext.Provider
      value={{
        user,
        token: null, // Não usamos mais token no front
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        getCurrentUser,
        updateUser,
        updatePassword,
        deleteAccount,
        roles,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
