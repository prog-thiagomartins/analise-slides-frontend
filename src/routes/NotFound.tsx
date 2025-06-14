import React from 'react';

const NotFound: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
    <p className="text-xl text-gray-700 mb-2">Página não encontrada</p>
    <a href="/" className="text-blue-500 hover:underline">
      Voltar para o início
    </a>
  </div>
);

export default NotFound;
