import { FiBookOpen } from 'react-icons/fi';

export default function Glossarios() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <FiBookOpen className="text-primary-600 text-5xl mb-4" />
      <h1 className="text-2xl font-bold text-primary-700 mb-2">Glossários</h1>
      <p className="text-gray-500">Em breve você poderá consultar e gerenciar glossários.</p>
    </div>
  );
}
