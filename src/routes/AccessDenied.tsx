import React from 'react';

const AccessDenied: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 className="text-4xl font-bold text-yellow-600 mb-4">Acesso Negado</h1>
    <p className="text-lg text-gray-700 mb-2">
      Você não tem permissão para acessar esta página.
    </p>
    <a href="/" className="text-blue-500 hover:underline">
      Voltar para o início
    </a>
  </div>
);

export default AccessDenied;
