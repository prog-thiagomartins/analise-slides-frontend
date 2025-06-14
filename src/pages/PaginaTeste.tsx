// @ts-nocheck
// Esta página é apenas para testes de componentes e será ignorada pelo git.
import MainContent from '../components/layout/MainContent';
import Loader from '../components/layout/Loader';
import Notification from '../components/layout/Notification';
import ConfirmationModal from '../components/layout/ConfirmationModal';
import EmptyState from '../components/layout/EmptyState';
import { useState } from 'react';

export default function PaginaTeste() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <MainContent>
        <h1 className="text-2xl font-bold mb-4">Testes de Componentes</h1>
        <div className="flex flex-wrap gap-6">
          <div className="border rounded p-4 w-80 bg-white shadow">
            <h2 className="font-semibold mb-2">Loader</h2>
            <Loader />
          </div>
          <div className="border rounded p-4 w-80 bg-white shadow">
            <h2 className="font-semibold mb-2">Notification</h2>
            <Notification />
          </div>
          <div className="border rounded p-4 w-80 bg-white shadow">
            <h2 className="font-semibold mb-2">ConfirmationModal</h2>
            <button className="bg-primary-600 text-white px-4 py-2 rounded" onClick={() => setModalOpen(true)}>
              Abrir Modal
            </button>
            <ConfirmationModal
              open={modalOpen}
              title="Tem certeza?"
              description="Esta é uma modal de confirmação."
              onConfirm={() => setModalOpen(false)}
              onCancel={() => setModalOpen(false)}
            />
          </div>
          <div className="border rounded p-4 w-80 bg-white shadow">
            <h2 className="font-semibold mb-2">EmptyState</h2>
            <EmptyState title="Sem dados" description="Nenhum registro encontrado." />
          </div>
        </div>
      </MainContent>
    </div>
  );
}
