import { FiZap, FiBarChart2, FiUsers, FiCpu } from 'react-icons/fi';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary-50 to-gray-50 px-4">
      <section className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-10 shadow-xl">
        <div className="flex flex-col items-center gap-2 mb-6">
          <span className="inline-flex items-center gap-2 text-4xl font-extrabold text-primary-700">
            <FiZap className="text-yellow-400" /> Plataforma de Análise Inteligente
          </span>
          <span className="text-base text-gray-500 font-medium">Inovação em Finanças & Estratégia</span>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-center text-lg text-gray-700">
            Este projeto representa uma iniciativa de inovação aplicada à realidade da área de Finanças e Estratégia (Macro), desenvolvido pelo time de <span className="font-semibold text-primary-600">Finance Analytics</span>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="flex flex-col items-center p-4 rounded-lg bg-primary-50">
              <FiCpu className="text-primary-600 text-3xl mb-2" />
              <span className="font-semibold text-primary-700">IA & Automação</span>
              <span className="text-xs text-gray-500 text-center">Utilizando inteligência artificial e automações para transformar a análise de dados e documentos.</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg bg-primary-50">
              <FiBarChart2 className="text-primary-600 text-3xl mb-2" />
              <span className="font-semibold text-primary-700">Escalabilidade</span>
              <span className="text-xs text-gray-500 text-center">Estruturas modulares que promovem precisão e crescimento sustentável nas entregas.</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg bg-primary-50">
              <FiUsers className="text-primary-600 text-3xl mb-2" />
              <span className="font-semibold text-primary-700">Time Especialista</span>
              <span className="text-xs text-gray-500 text-center">Desenvolvido por especialistas em finanças, dados e tecnologia.</span>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center">
            <span className="rounded-full bg-primary-600 px-6 py-2 text-lg font-semibold text-white shadow-md flex items-center gap-2">
              <FiZap className="text-yellow-300" /> Inovação em andamento
            </span>
            <span className="mt-2 text-sm text-gray-400">Versão inicial – Novas funcionalidades em breve.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
