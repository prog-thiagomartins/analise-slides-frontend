import { Link } from 'react-router-dom';
import logo from '../../assets/santander-logo.svg';

export default function PublicHeader() {
  return (
    <header className="bg-white shadow-sm border-b border-neutral-200 fixed top-0 left-0 w-full z-30">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center h-20">
        <Link
          to="/sobre"
          className="flex items-center gap-3 group"
          tabIndex={0}
          aria-label="Ir para Sobre"
        >
          <img
            src={logo}
            alt="Santander"
            className="h-10 transition-transform group-hover:scale-105"
          />
          <span className="text-lg font-bold text-neutral-900 group-hover:text-primary-700 transition-colors select-none">
            Finance Analytics Platform
          </span>
        </Link>
        <nav className="flex gap-4 items-center">
          <Link
            to="/login"
            className="text-sm font-medium px-3 py-1.5 rounded transition-colors text-neutral-600 hover:text-primary-700"
          >
            Entrar
          </Link>
          <Link
            to="/register"
            className="text-sm font-semibold px-6 py-1.5 rounded bg-primary-700 text-white hover:bg-primary-800 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400 min-w-[120px] text-center"
          >
            Cadastrar
          </Link>
        </nav>
      </div>
    </header>
  );
}
