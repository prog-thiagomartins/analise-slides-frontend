import React from 'react';
import { MdMenuBook } from 'react-icons/md';

const Documentation: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-primary-700 mb-4 text-center flex items-center gap-2">
          <MdMenuBook className="text-4xl text-primary-700" />
          Documentação
        </h1>
        <p className="text-gray-600 text-center text-lg mb-6">
          Esta página será dedicada à documentação da plataforma Finance Analytics.<br />
          Em breve você encontrará aqui guias, exemplos de uso, perguntas frequentes e muito mais para facilitar sua experiência.
        </p>
        <div className="text-gray-400 text-sm">(Em construção)</div>
      </div>
    </div>
  );
};

export default Documentation;
