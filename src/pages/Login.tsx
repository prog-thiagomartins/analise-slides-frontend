import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Loader from '../components/ui/Loader';
import PublicHeader from '../components/layout/PublicHeader';

// Função reforçada de sanitização
function sanitizeInput(input: string, maxLength = 100) {
  return input
    .normalize('NFKC') // Normaliza unicode
    .replace(/[<>"'`]/g, '') // Remove caracteres perigosos
    .replace(/\s+/g, ' ') // Reduz múltiplos espaços
    .trim() // Remove espaços nas pontas
    .slice(0, maxLength); // Limita tamanho
}

const Login: React.FC = () => {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepConnected, setKeepConnected] = useState(false);
  const [error, setError] = useState('');
  const [formTouched, setFormTouched] = useState(false);

  const validateEmail = (value: string) => {
    if (!value) return false;
    if (value.length > 120) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };
  const validatePassword = (value: string) => {
    if (!value) return false;
    if (value.length < 8) return false;
    if (value.length > 64) return false;
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormTouched(true);
    setError('');
    const sanitizedEmail = sanitizeInput(email, 120);
    const sanitizedPassword = sanitizeInput(password, 64);
    if (!sanitizedEmail || !validateEmail(sanitizedEmail)) {
      setError('Informe um email válido (máx. 120 caracteres).');
      return;
    }
    if (!sanitizedPassword || !validatePassword(sanitizedPassword)) {
      setError('Senha obrigatória (mín. 8 e máx. 64 caracteres).');
      return;
    }
    try {
      const result = await login(sanitizedEmail, sanitizedPassword);
      if (!result.success) {
        setError(result.message || 'Erro desconhecido.');
      }
    } catch {
      setError('Erro de conexão com o servidor ou API indisponível.');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col pt-20">
      <PublicHeader />
      <main className="flex-1 w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
          <h1 className="text-2xl font-bold text-primary-700 mb-1 text-center">
            Entrar
          </h1>
          <p className="text-gray-500 mb-6 text-center text-sm">
            Acesso restrito aos colaboradores do Finance Analytics
          </p>
          {error && (
            <div className="w-full bg-red-100 text-red-700 px-3 py-2 rounded mb-4 text-center text-sm font-medium">
              {error}
            </div>
          )}
          <form
            className="w-full flex flex-col gap-4"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                maxLength={120}
                className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-600 ${formTouched && (!email || !validateEmail(email)) ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="email@empresa.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoFocus
              />
              {formTouched && (!email || !validateEmail(email)) && (
                <span className="text-xs text-red-500">
                  Email obrigatório, válido e até 120 caracteres.
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Senha
              </label>
              <input
                id="password"
                type="password"
                minLength={8}
                maxLength={64}
                className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-600 ${formTouched && (!password || !validatePassword(password)) ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              {formTouched && (!password || !validatePassword(password)) && (
                <span className="text-xs text-red-500">
                  Senha obrigatória (mín. 8 e máx. 64 caracteres).
                </span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={keepConnected}
                  onChange={e => setKeepConnected(e.target.checked)}
                  className="accent-primary-600"
                />
                Manter conectado
              </label>
              <a
                href="/forgot-password"
                className="text-primary-600 text-sm hover:underline"
              >
                Esqueci minha senha
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 rounded transition flex items-center justify-center disabled:opacity-60"
              disabled={loading}
            >
              {loading ? <Loader /> : 'Entrar'}
            </button>
          </form>
          <footer className="mt-6 text-xs text-gray-400 text-center">
            Santander Finance Analytics • © 2025
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Login;
