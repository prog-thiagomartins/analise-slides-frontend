import { useState } from 'react';
import { FiPlusCircle, FiLayers, FiClock, FiBookOpen, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import clsx from 'clsx';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/santander-logo.svg';

const menuItems = [
  { label: 'Nova Análise', icon: <FiPlusCircle size={20} />, href: '/nova' },
  { label: 'Sugestões', icon: <FiLayers size={20} />, href: '/modelos' },
  { label: 'Histórico', icon: <FiClock size={20} />, href: '/historico' },
  { label: 'Glossários', icon: <FiBookOpen size={20} />, href: '/glossarios' },
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  return (
    <aside
      className={clsx(
        'h-screen bg-white border-r border-gray-200 shadow-lg flex flex-col transition-all duration-300',
        open ? 'w-72' : 'w-20'
      )}
      style={{ minWidth: open ? 220 : 80 }}
    >
      <div className="flex items-center justify-between px-4 py-6 border-b border-gray-100 relative" style={{ minHeight: 56 }}>
        <span className={clsx('transition-all flex items-center gap-2', !open && 'opacity-0 w-0')}
          style={{ transition: 'opacity 0.3s, width 0.3s' }}>
          <span className="bg-white rounded-full p-1 shadow-sm" style={{ display: 'inline-block', minWidth: 32, minHeight: 32 }}>
            <img src={logo} alt="Santander" style={{ width: 32, height: 32, display: 'block' }} />
          </span>
          <span className="font-extrabold text-xl tracking-tight text-[#EC0000]" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>Santander</span>
        </span>
        <button
          className="ml-auto text-gray-500 hover:text-[#EC0000] focus:outline-none"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        >
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>
      <nav className="flex-1 mt-8">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-3 px-5 py-3 rounded-lg font-semibold text-gray-700 hover:bg-[#ffecec] hover:text-[#EC0000] transition-all',
                    !open && 'justify-center px-2',
                    isActive || location.pathname === item.href ? 'bg-[#EC0000] text-white shadow-md' : ''
                  )
                }
                style={{ minHeight: 48 }}
              >
                {item.icon}
                <span className={clsx('transition-all', !open && 'opacity-0 w-0')}>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto p-4">
        <a
          href="/logout"
          className={clsx(
            'flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-gray-500 hover:bg-red-50 hover:text-[#EC0000] transition-all',
            !open && 'justify-center px-2'
          )}
          style={{ minHeight: 44 }}
        >
          <FiLogOut size={20} />
          <span className={clsx('transition-all', !open && 'opacity-0 w-0')}>Sair</span>
        </a>
      </div>
    </aside>
  );
}
