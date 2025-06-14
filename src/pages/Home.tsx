import React from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <section className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 shadow-md">
        <h1 className="text-center text-3xl font-bold text-gray-900">
          🎯 Bem-vindo à Plataforma de Análise Inteligente
        </h1>

        <p className="mt-4 text-center text-base text-gray-600">
          Este é o{' '}
          <span className="font-semibold text-primary-600">
            primeiro commit
          </span>{' '}
          da nossa plataforma.
        </p>

        <p className="mt-4 text-center text-base text-gray-600">
          Estamos construindo uma solução interna para simplificar, automatizar
          e potencializar as análises dentro do Finance. Nosso objetivo é
          transformar a maneira como lidamos com dados, relatórios e números no
          dia a dia.
        </p>

        <p className="mt-4 text-center text-base text-gray-600">
          🚧 Esta é uma versão inicial. Em breve, novas funcionalidades,
          interfaces e recursos estarão disponíveis por aqui.
        </p>

        <div className="mt-6 flex justify-center">
          <span className="rounded-full bg-primary-600 px-4 py-1 text-sm font-medium text-white">
            🚀 Desenvolvimento Iniciado
          </span>
        </div>
      </section>
    </main>
  );
}
