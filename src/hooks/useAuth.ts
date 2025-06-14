import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContextDef';
import type { AuthContextType } from '../contexts/AuthContextDef';

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
