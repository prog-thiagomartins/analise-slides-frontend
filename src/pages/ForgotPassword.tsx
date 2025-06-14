import React, { useState } from 'react';
import logo from '../assets/santander-logo.svg';
import { Link } from 'react-router-dom';
import { authService } from '../services/authService';
import Loader from '../components/ui/Loader';
import PublicHeader from '../components/layout/PublicHeader';

function sanitizeInput(input: string, maxLength = 100) {
  return input
    .normalize('NFKC')
    .replace(/[<>"]'/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [formTouched, setFormTouched] = useState(false);

  const validateEmail = (value: string) => {
    if (!value) return false;
    if (value.length > 120) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormTouched(true);
    setError('');
    setSuccess('');
    const sanitizedEmail = sanitizeInput(email, 120);
    if (!validateEmail(sanitizedEmail)) {
      setError('Informe um email válido (máx. 120 caracteres).');
      return;
    }
    setLoading(true);
    try {
      await authService.forgotPassword(sanitizedEmail);
      setSuccess(
        'Se o email estiver cadastrado, você receberá instruções para redefinir sua senha.'
      );
      setEmail('');
      setFormTouched(false);
    } catch (err: unknown) {
      let errorMessage = 'Erro ao enviar instruções. Tente novamente.';
      if (err && typeof err === 'object' && 'response' in err) {
        const response = (
          err as { response?: { data?: { message?: string }; status?: number } }
        ).response;
        if (response?.status && response.status >= 500) {
          errorMessage =
            'Erro no servidor. Tente novamente mais tarde ou contate o suporte.';
        } else if (response?.data?.message) {
          errorMessage = response.data.message;
        }
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col pt-20">
      <PublicHeader />
      <main className="flex-1 w-full flex flex-col justify-center items-center">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
          <img src={logo} alt="Santander" className="h-12 mb-4" />
          <h1 className="text-2xl font-bold text-primary-700 mb-1 text-center">
            Esqueci minha senha
          </h1>
          <p className="text-gray-500 mb-6 text-center text-sm">
            Informe seu email corporativo para receber instruções de
            recuperação.
          </p>
          {error && (
            <div className="w-full bg-red-100 text-red-700 px-3 py-2 rounded mb-4 text-center text-sm font-medium">
              {error}
            </div>
          )}
          {success && (
            <div className="w-full bg-green-100 text-green-700 px-3 py-2 rounded mb-4 text-center text-sm font-medium">
              {success}
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
                Email corporativo
              </label>
              <input
                id="email"
                type="email"
                maxLength={120}
                className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-600 ${formTouched && !validateEmail(email) ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="email@empresa.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoFocus
              />
              {formTouched && !validateEmail(email) && (
                <span className="text-xs text-red-500">
                  Email obrigatório, válido e até 120 caracteres.
                </span>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 rounded transition flex items-center justify-center disabled:opacity-60"
              disabled={loading}
            >
              {loading ? <Loader /> : 'Enviar instruções'}
            </button>
          </form>
          <div className="mt-4 text-sm text-center">
            <Link to="/login" className="text-primary-600 hover:underline">
              Voltar para login
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
