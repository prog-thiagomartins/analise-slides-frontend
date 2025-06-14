import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Loader from '../components/ui/Loader';
import PublicHeader from '../components/layout/PublicHeader';
import { MdMenuBook } from 'react-icons/md';
import { MdInfo, MdLogin, MdCheckCircle } from 'react-icons/md';

function sanitizeInput(input: string, maxLength = 100) {
  return input
    .normalize('NFKC')
    .replace(/[<>"'`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

const SuccessMessage: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
      <div className="flex flex-col items-center mb-2">
        <MdCheckCircle className="text-green-500 text-5xl mb-2" />
        <h1 className="text-2xl font-bold text-primary-700 text-center">
          Cadastro realizado com sucesso!
        </h1>
      </div>
      <p className="bg-green-100 text-green-700 px-4 py-2 rounded-md mb-6 text-center text-sm">
        {message}
      </p>
      <div className="flex gap-8 mt-2 justify-center">
        <a
          href="/documentacao"
          className="text-primary-700 underline text-base flex items-center gap-1 font-medium"
        >
          <MdMenuBook className="text-base align-middle" />
          Documentação
        </a>
        <a
          href="/sobre"
          className="text-primary-700 underline text-base flex items-center gap-1 font-medium"
        >
          <MdInfo className="text-base align-middle" />
          Sobre
        </a>
        <a
          href="/login"
          className="text-primary-700 underline text-base flex items-center gap-1 font-medium"
        >
          <MdLogin className="text-base align-middle" />
          Ir para Login
        </a>
      </div>
    </div>
  );
};

const Register: React.FC = () => {
  const { register, loading } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formTouched, setFormTouched] = useState(false);

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
        setSuccess(
          'Usuário registrado com sucesso. Em breve você receberá um e-mail para validar seu acesso. Por favor, aguarde a aprovação e confira nossas novidades enquanto isso.'
        );
      }
    } catch (err) {
      // Captura a mensagem do backend de forma flexível e prioriza a mensagem específica
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
      const errorObj = err as BackendError;
      console.log('Erro backend:', errorObj?.response?.data);
      const data = errorObj?.response?.data;
      const backendMsg =
        data?.errors?.[0]?.msg ||
        data?.message ||
        data?.detail ||
        (errorObj?.response?.status === 409 && data
          ? data.detail || data.message || 'Este e-mail já está cadastrado. Tente recuperar a senha ou use outro e-mail.'
          : null) ||
        'Erro de conexão com o servidor ou API indisponível.';
      setError(backendMsg);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col pt-20">
      <PublicHeader />
      <main className="flex-1 w-full flex flex-col items-center justify-center">
        {success ? (
          <SuccessMessage message={success} />
        ) : (
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

            <form
              onSubmit={handleSubmit}
              className="w-full space-y-4"
              autoComplete="off"
            >
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-sm font-medium">
                  Nome completo
                </label>
                <input
                  id="name"
                  type="text"
                  maxLength={80}
                  placeholder="Seu nome"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className={`border rounded-md px-4 py-3 focus:outline-none focus:ring-2 ${
                    formTouched && !validateName(name)
                      ? 'border-red-500 focus:ring-red-400'
                      : 'border-gray-300 focus:ring-primary-600'
                  }`}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm font-medium">
                  Email corporativo
                </label>
                <input
                  id="email"
                  type="email"
                  maxLength={120}
                  placeholder="email@empresa.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={`border rounded-md px-4 py-3 focus:outline-none focus:ring-2 ${
                    formTouched && !validateEmail(email)
                      ? 'border-red-500 focus:ring-red-400'
                      : 'border-gray-300 focus:ring-primary-600'
                  }`}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-sm font-medium">
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
                  className={`border rounded-md px-4 py-3 focus:outline-none focus:ring-2 ${
                    formTouched && !validatePassword(password)
                      ? 'border-red-500 focus:ring-red-400'
                      : 'border-gray-300 focus:ring-primary-600'
                  }`}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium"
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
                  className={`border rounded-md px-4 py-3 focus:outline-none focus:ring-2 ${
                    formTouched && !validateConfirmPassword(confirmPassword)
                      ? 'border-red-500 focus:ring-red-400'
                      : 'border-gray-300 focus:ring-primary-600'
                  }`}
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
        )}
      </main>
    </div>
  );
};

export default Register;