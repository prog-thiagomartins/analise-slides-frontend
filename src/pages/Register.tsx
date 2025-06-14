import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Loader from '../components/ui/Loader';
import { useNavigate } from 'react-router-dom';
import PublicHeader from '../components/layout/PublicHeader';

function sanitizeInput(input: string, maxLength = 100) {
  return input
    .normalize('NFKC')
    .replace(/[<>"'`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

const Register: React.FC = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [formTouched, setFormTouched] = useState<boolean>(false);

  const validateName = (value: string) =>
    value.length >= 2 && value.length <= 80;
  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 120;
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
  const validateConfirmPassword = (value: string) =>
    value === password && value.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormTouched(true);
    setError('');
    setSuccess('');

    const sanitizedName = sanitizeInput(name, 80);
    const sanitizedEmail = sanitizeInput(email, 120);
    const sanitizedPassword = sanitizeInput(password, 64);

    if (!validateName(sanitizedName)) {
      setError('Nome obrigatório (mín. 2 e máx. 80 caracteres).');
      return;
    }
    if (!validateEmail(sanitizedEmail)) {
      setError('Informe um email válido.');
      return;
    }
    if (!validatePassword(sanitizedPassword)) {
      setError(
        'Senha inválida. Use maiúscula, minúscula, número ou caractere especial.'
      );
      return;
    }
    if (!validateConfirmPassword(confirmPassword)) {
      setError('As senhas não coincidem.');
      return;
    }

    try {
      const result = await register({
        name: sanitizedName,
        email: sanitizedEmail,
        password: sanitizedPassword,
      });
      if (!result.success) {
        setError(result.message || 'Erro desconhecido.');
      } else {
        setSuccess('Cadastro realizado com sucesso! Redirecionando...');
        setTimeout(() => navigate('/login'), 1800);
      }
    } catch {
      setError('Erro de conexão com o servidor ou API indisponível.');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col pt-20">
      <PublicHeader />
      <main className="flex-1 w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
          <h1 className="text-2xl font-bold text-primary-700 mb-1 text-center">
            Cadastrar
          </h1>
          <p className="text-gray-500 mb-4 text-center text-sm">
            Solicitação sujeita à aprovação do time de Finance Analytics.
          </p>
          {error && (
            <div className="w-full bg-red-100 text-red-700 px-4 py-2 rounded-md mb-4 text-center text-xs font-medium break-words">
              {error}
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
              <label
                htmlFor="name"
                className="text-sm font-medium text-left"
              >
                Nome completo
              </label>
              <input
                id="name"
                type="text"
                maxLength={80}
                placeholder="Seu nome"
                value={name}
                onChange={e => setName(e.target.value)}
                className={`border rounded-md px-4 py-3 focus:outline-none focus:ring-2 ${formTouched && !validateName(name) ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-primary-600'}`}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-left"
              >
                Email corporativo
              </label>
              <input
                id="email"
                type="email"
                maxLength={120}
                placeholder="email@empresa.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={`border rounded-md px-4 py-3 focus:outline-none focus:ring-2 ${formTouched && !validateEmail(email) ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-primary-600'}`}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="password"
                className="text-sm font-medium text-left"
              >
                Senha
              </label>
              <input
                id="password"
                type="password"
                minLength={8}
                maxLength={64}
                placeholder="Crie uma senha"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={`border rounded-md px-4 py-3 focus:outline-none focus:ring-2 ${formTouched && !validatePassword(password) ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-primary-600'}`}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-left"
              >
                Confirmar senha
              </label>
              <input
                id="confirmPassword"
                type="password"
                minLength={8}
                maxLength={64}
                placeholder="Repita sua senha"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className={`border rounded-md px-4 py-3 focus:outline-none focus:ring-2 ${formTouched && !validateConfirmPassword(confirmPassword) ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-primary-600'}`}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-md transition flex items-center justify-center disabled:opacity-60 hover:scale-105"
            >
              {loading ? <Loader /> : 'Cadastrar'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Register;
