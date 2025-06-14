import type { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';

interface PrivateRouteProps {
  children: ReactElement;
  roles?: string[];
}

export function PrivateRoute({ children, roles }: PrivateRouteProps) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ message: 'Faça login para acessar esta página.' }}
      />
    );
  }

  if (roles && user && !roles.some(role => user.roles?.includes(role))) {
    return (
      <Navigate
        to="/"
        replace
        state={{ message: 'Acesso negado: permissão insuficiente.' }}
      />
    );
  }

  return children;
}
