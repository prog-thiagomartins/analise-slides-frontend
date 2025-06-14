import { FiPlusCircle } from 'react-icons/fi';

export default function Nova() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <FiPlusCircle className="text-primary-600 text-5xl mb-4" />
      <h1 className="text-2xl font-bold text-primary-700 mb-2">Nova Análise</h1>
      <p className="text-gray-500">Em breve você poderá criar uma nova análise aqui.</p>
    </div>
  );
}
