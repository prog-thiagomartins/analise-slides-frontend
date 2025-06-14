import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Loader from '../components/ui/Loader';
import logo from '../assets/santander-logo.svg';
import { Link, useNavigate } from 'react-router-dom';

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
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      {/* Container principal */}
      <main className="flex flex-1 items-center justify-center w-full">
        <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl flex flex-col md:flex-row overflow-hidden">
          {/* Lado Esquerdo */}
          <div className="hidden md:flex flex-col justify-center gap-8 px-12 py-14 w-1/2 bg-primary-50">
            <div className="flex flex-col gap-4">
              <img src={logo} alt="Santander" className="h-12" />
              <h2 className="text-2xl font-bold text-primary-900">
                Plataforma de Análise Inteligente
              </h2>
              <p className="text-sm text-primary-800 leading-relaxed">
                Ferramenta exclusiva do Finance Analytics para automação de
                análises, geração de relatórios inteligentes e suporte na tomada
                de decisão.
              </p>
            </div>

            <div
              className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 rounded px-3 py-2 text-sm"
              role="alert"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-14 w-14 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
              Após o cadastro, sua solicitação será analisada pela equipe do
              Finance Analytics. Você receberá um e-mail assim que seu acesso
              for aprovado.
            </div>

            <ul className="mt-4 text-sm text-left list-disc list-inside text-primary-700">
              <li>Automatize suas análises financeiras.</li>
              <li>Gere insights em minutos.</li>
              <li>Acesse históricos e modelos de forma inteligente.</li>
              <li>Transforme dados em decisões.</li>
            </ul>
            <p className="mt-4 text-xs text-primary-700 text-center md:text-left font-medium">
              Dúvidas? Entre em contato com o time.
            </p>
          </div>

          {/* Lado Direito - Formulário */}
          <div className="flex-1 flex flex-col items-center justify-center px-8 py-14">
            <img src={logo} alt="Santander" className="h-10 mb-4 md:hidden" />
            <h1 className="text-2xl font-bold mb-1 text-center">
              Criar uma conta
            </h1>
            <p className="text-sm text-gray-500 mb-6 text-center">
              Acesso exclusivo para colaboradores do Finance Analytics
            </p>

            {error && (
              <div className="w-full bg-red-100 text-red-700 px-4 py-2 rounded-md mb-4 text-center text-xs font-medium">
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
              className="w-full max-w-[450px] space-y-4"
              autoComplete="off"
            >
              {/* Nome */}
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

              {/* Email */}
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

              {/* Senha */}
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

              {/* Confirmar senha */}
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

            <div className="mt-4 text-sm">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-primary-600 hover:underline">
                Entrar
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Rodapé Fora do Container */}
      <footer className="w-full text-center text-xs text-gray-400 py-4">
        Santander Finance Analytics • © 2025
      </footer>
    </div>
  );
};

export default Register;
