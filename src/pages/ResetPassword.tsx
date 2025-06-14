import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import Loader from '../components/ui/Loader';

function sanitizeInput(input: string, maxLength = 100) {
  return input
    .normalize('NFKC')
    .replace(/[<>"]'/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

const isAuthDisabled = import.meta.env.VITE_DISABLE_AUTH === 'true';

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [formTouched, setFormTouched] = useState(false);

  const validatePassword = (value: string) => {
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecial = /[!@#$%^&*()_+\-={}[\];':"|,.<>/?]/.test(value);
    return (
      value.length >= 8 &&
      value.length <= 64 &&
      hasUpper &&
      hasLower &&
      (hasNumber || hasSpecial)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormTouched(true);
    setError('');
    setSuccess('');

    if (!token) {
      setError(
        'Token de redefinição inválido ou expirado. Solicite uma nova redefinição.'
      );
      return;
    }
    const sanitizedPassword = sanitizeInput(password, 64);
    if (!validatePassword(sanitizedPassword)) {
      setError(
        'Senha inválida. Use maiúscula, minúscula, número ou caractere especial.'
      );
      return;
    }
    if (sanitizedPassword !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    if (isAuthDisabled) {
      setSuccess('Redefinida com sucesso, voltar tela login');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    setLoading(true);
    try {
      // Supondo endpoint: /auth/reset-password
      await authService.resetPassword(token, sanitizedPassword);
      setSuccess('Senha redefinida com sucesso! Você pode fazer login.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      let errorMessage = 'Erro ao redefinir senha. Tente novamente.';
      if (err && typeof err === 'object' && 'response' in err) {
        const response = (
          err as { response?: { data?: { message?: string }; status?: number } }
        ).response;
        if (response?.status && response.status >= 500) {
          errorMessage =
            'Erro no servidor. Tente novamente mais tarde ou contate o suporte.';
        } else if (response?.data?.message) {
          // Mensagem específica para token inválido/expirado
          if (
            response.data.message.toLowerCase().includes('token') ||
            response.data.message.toLowerCase().includes('expirad')
          ) {
            errorMessage =
              'Token inválido ou expirado. Solicite uma nova redefinição.';
          } else {
            errorMessage = response.data.message;
          }
        }
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-2 text-center">Redefinir Senha</h1>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Crie uma nova senha para acessar sua conta.
        </p>
        {error && (
          <div className="w-full bg-red-100 text-red-700 px-4 py-2 rounded-md mb-4 text-center text-xs font-medium">
            {error}
            {error.includes('Token inválido ou expirado') && (
              <div className="mt-2">
                <Link
                  to="/forgot-password"
                  className="text-primary-600 hover:underline"
                >
                  Solicitar nova redefinição
                </Link>
              </div>
            )}
          </div>
        )}
        {success && (
          <div className="w-full bg-green-100 text-green-700 px-4 py-2 rounded-md mb-4 text-center text-xs font-medium">
            {success}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="w-full space-y-4"
          autoComplete="off"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium">
              Nova senha
            </label>
            <input
              id="password"
              type="password"
              minLength={8}
              maxLength={64}
              placeholder="Crie uma nova senha"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={`border rounded-md px-4 py-3 focus:outline-none focus:ring-2 ${formTouched && !validatePassword(password) ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-primary-600'}`}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirmar nova senha
            </label>
            <input
              id="confirmPassword"
              type="password"
              minLength={8}
              maxLength={64}
              placeholder="Repita a nova senha"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className={`border rounded-md px-4 py-3 focus:outline-none focus:ring-2 ${formTouched && password !== confirmPassword ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-primary-600'}`}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-md transition flex items-center justify-center disabled:opacity-60 hover:scale-105"
          >
            {loading ? <Loader /> : 'Redefinir Senha'}
          </button>
        </form>
        <div className="mt-4 text-sm">
          <Link to="/login" className="text-primary-600 hover:underline">
            Voltar ao login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
