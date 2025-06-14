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
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../hooks/useNotification';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState<string[]>([]);
  const isAuthenticated = !!user;
  const sessionTimeoutRef = useRef<(() => void) | null>(null);
  const navigate = useNavigate();
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
    withLoading(setLoading, async () => {
      try {
        const currentUser = await userService.getCurrentUser();
        setUser(currentUser);
        setRoles(currentUser.roles || []);
      } catch {
        logout('Sessão inválida ou expirada. Faça login novamente.');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login: AuthContextType['login'] = async (email, password) =>
    withLoading(setLoading, async () => {
      try {
        const { user } = await authService.login(email, password);
        setUser(user);
        setRoles(user.roles || []);
        return { success: true, message: 'Login realizado com sucesso.' };
      } catch {
        logout('Falha no login.');
        return { success: false, message: 'Falha no login.' };
      }
    });

  const register: AuthContextType['register'] = async data =>
    withLoading(setLoading, async () => {
      try {
        const { user } = await authService.register(data);
        setUser(user);
        setRoles(user.roles || []);
        return { success: true, message: 'Cadastro realizado com sucesso.' };
      } catch {
        logout('Falha no cadastro.');
        return { success: false, message: 'Falha no cadastro.' };
      }
    });

  function logout(message?: string) {
    storage.clearAll();
    setUser(null);
    setRoles([]);
    if (sessionTimeoutRef.current) sessionTimeoutRef.current();
    if (message) {
      notify(message, 'info');
    }
    navigate('/login', { replace: true });
  }

  const getCurrentUser: AuthContextType['getCurrentUser'] = () =>
    withLoading(setLoading, async () => {
      try {
        const currentUser = await userService.getCurrentUser();
        setUser(currentUser);
        setRoles(currentUser.roles || []);
      } catch {
        logout('Sessão inválida ou expirada. Faça login novamente.');
      }
    });

  const updateUser: AuthContextType['updateUser'] = async data =>
    withLoading(setLoading, async () => {
      try {
        const updated = await userService.updateUser(data);
        setUser(updated);
        setRoles(updated.roles || []);
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
