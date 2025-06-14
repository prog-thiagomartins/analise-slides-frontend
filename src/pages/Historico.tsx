import { FiClock } from 'react-icons/fi';

export default function Historico() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <FiClock className="text-primary-600 text-5xl mb-4" />
      <h1 className="text-2xl font-bold text-primary-700 mb-2">Histórico</h1>
      <p className="text-gray-500">Aqui você verá o histórico de análises realizadas.</p>
    </div>
  );
}
