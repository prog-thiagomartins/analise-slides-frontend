import React from 'react';
import PublicHeader from '../components/layout/PublicHeader';

const AboutPlatform: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col pt-16">
      <PublicHeader />
      <main className="flex-1 w-full">
        {/* Hero */}
        <section className="w-full bg-white py-16 px-4 md:px-0 text-center shadow-sm mb-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-neutral-900 tracking-tight mb-4">
            Transforme dados em decisões.
          </h1>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Plataforma inteligente para estruturar conhecimento, extrair
            insights e dar clareza aos números, siglas e informações que movem o
            Finance.
          </p>
        </section>

        {/* Por que essa plataforma */}
        <section className="w-full py-16 px-4 md:px-0 bg-neutral-50 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-12 text-center">
            Por que essa plataforma existe?
          </h2>
          <div className="max-w-5xl mx-auto text-center mb-16">
            <p className="text-lg text-neutral-700">
              No time de Finanças, lidamos diariamente com siglas, conceitos e
              números que mudam rápido. Relatórios densos, informações dispersas
              e linguagem técnica tornam a análise um desafio constante. Esta
              plataforma organiza esse conhecimento, mapeia termos e transforma
              dados em inteligência, dando suporte às análises, projeções e
              decisões estratégicas da nossa área.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🧠',
                title: 'Inteligência Aplicada',
                desc: 'Análises inteligentes com IA, modelos e contexto. Transformamos documentos e dados dispersos em conhecimento estruturado e relevante.',
              },
              {
                icon: '🗺️',
                title: 'Mapeamento de Conhecimento',
                desc: 'Padronização de conceitos, siglas e termos técnicos. Crie um repositório vivo da linguagem do Finance, refletindo como nossa área pensa e decide.',
              },
              {
                icon: '🔒',
                title: 'Centralização e Segurança',
                desc: 'Todos os dados, análises, modelos e glossários em um único lugar. Uma base segura, confiável e rastreável para suportar suas decisões.',
              },
            ].map(item => (
              <div
                key={item.title}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-sm text-neutral-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Funcionalidades */}
        <section className="w-full py-20 px-4 md:px-0 bg-white mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-12 text-center">
            O que você pode fazer aqui
          </h2>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: '📄',
                title: 'Upload Inteligente',
                desc: 'Envie relatórios, apresentações ou documentos e receba análises, resumos e extração de informações-chave automaticamente.',
              },
              {
                icon: '🧠',
                title: 'Modelos Personalizados',
                desc: 'Crie, salve e execute modelos de análise com contextos, glossários e parâmetros específicos da sua área.',
              },
              {
                icon: '📚',
                title: 'Glossários Financeiros',
                desc: 'Organize termos, siglas e linguagens do Finance, garantindo consistência e padronização nas análises.',
              },
              {
                icon: '📈',
                title: 'Histórico e Versionamento',
                desc: 'Acompanhe versões anteriores, revisões e mantenha um histórico organizado das suas análises.',
              },
              {
                icon: '🔍',
                title: 'Extração de Insights',
                desc: 'Identifique tópicos, conceitos e padrões presentes nos documentos, entregando resumos inteligentes e estruturados.',
              },
              {
                icon: '📊',
                title: 'Dashboards e Indicadores (em breve)',
                desc: 'Acompanhe temas recorrentes, evolução dos tópicos analisados e indicadores extraídos das análises.',
              },
            ].map(item => (
              <div
                key={item.title}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-sm text-neutral-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quem Somos */}
        <section className="w-full py-20 px-4 md:px-0 bg-neutral-50">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8 text-center">
            Quem somos
          </h2>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-neutral-600">
              Somos o <strong>Finance Analytics</strong>, um time que atua
              dentro de Finanças e Estratégia com a missão de transformar dados
              em inteligência, estruturar conhecimento e acelerar análises.
              Acreditamos que nosso maior ativo é o nosso conhecimento. Por
              isso, essa plataforma nasce para organizar informações, padronizar
              conceitos e dar clareza aos números, às siglas e aos dados que
              movem nossa área. Tudo para que nossas análises sejam mais
              rápidas, nossas interpretações mais precisas e nossas decisões
              mais inteligentes. Porque, no fim, clareza nos dados é clareza nas
              decisões — e é isso que fortalece nossa atuação, nosso impacto e a
              nossa estratégia.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white py-4 text-center text-xs text-neutral-400 select-none">
        Uma solução desenvolvida pelo time de Finance Analytics • © 2025 •{' '}
        <a
          href="https://santanderbr.atlassian.net/wiki/spaces/FINANCEANALYTICS"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-700 hover:text-primary-900 underline"
        >
          Acesse nosso Confluence
        </a>
      </footer>
    </div>
  );
};

export default AboutPlatform;
