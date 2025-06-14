import { useState, useEffect, useRef } from 'react';
import {
  FiPlusCircle,
  FiClock,
  FiBookOpen,
  FiLogOut,
  FiMenu,
  FiX,
  FiUser,
  FiSettings,
  FiHome,
  FiDatabase,
} from 'react-icons/fi';
import clsx from 'clsx';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/santander-logo.svg';
import { useAuth } from '../../hooks/useAuth';

const menuItems = [
  { label: 'Dashboard', icon: <FiHome size={20} />, href: '/dashboard' },
  { label: 'Modelos', icon: <FiDatabase size={20} />, href: '/models' },
  {
    label: 'Nova análise',
    icon: <FiPlusCircle size={20} />,
    href: '/new-analysis',
  },
  { label: 'Histórico', icon: <FiClock size={20} />, href: '/history' },
  { label: 'Glossários', icon: <FiBookOpen size={20} />, href: '/glossaries' },
];

export default function Sidebar() {
  const { logout } = useAuth();
  const [open, setOpen] = useState(true);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);
  const location = useLocation();
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const settingsMenuRef = useRef<HTMLDivElement>(null);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        settingsMenuRef.current &&
        !settingsMenuRef.current.contains(event.target as Node) &&
        settingsButtonRef.current &&
        !settingsButtonRef.current.contains(event.target as Node)
      ) {
        setSettingsMenuOpen(false);
      }
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target as Node)
      ) {
        setAccountMenuOpen(false);
      }
    }
    if (accountMenuOpen || settingsMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [accountMenuOpen, settingsMenuOpen]);

  return (
    <aside
      className={clsx(
        'h-screen bg-white border-r border-gray-200 shadow-lg flex flex-col transition-all duration-300',
        open ? 'w-72' : 'w-20'
      )}
      style={{ minWidth: open ? 220 : 80, position: 'relative' }}
    >
      <div
        className="flex items-center justify-between px-4 py-6 border-b border-gray-100 relative"
        style={{ minHeight: 56 }}
      >
        <span
          className={clsx(
            'transition-all flex items-center gap-2',
            !open && 'opacity-0 w-0'
          )}
          style={{ transition: 'opacity 0.3s, width 0.3s' }}
        >
          <span
            className="bg-white rounded-full p-1 shadow-sm"
            style={{ display: 'inline-block', minWidth: 32, minHeight: 32 }}
          >
            <img
              src={logo}
              alt="Santander"
              style={{ width: 32, height: 32, display: 'block' }}
            />
          </span>
          <span
            className="font-extrabold text-xl tracking-tight text-[#EC0000]"
            style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
          >
            Santander
          </span>
        </span>
        <button
          className="ml-auto text-gray-500 hover:text-[#EC0000] focus:outline-none"
          onClick={() => setOpen(v => !v)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        >
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>
      <nav className={clsx('flex-1', open ? 'mt-4' : 'mt-2')}>
        <ul
          className={clsx(
            'flex flex-col',
            open ? 'gap-1' : 'gap-2',
            'items-stretch justify-start'
          )}
        >
          {menuItems.map(item => (
            <li key={item.label} className="w-full">
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center rounded-lg font-semibold text-gray-700 hover:bg-[#ffecec] hover:text-[#EC0000] transition-all',
                    open
                      ? 'gap-3 px-5 py-3 text-base'
                      : 'justify-center p-0 py-3 text-xl',
                    isActive || location.pathname === item.href
                      ? 'bg-[#EC0000] text-white shadow-md'
                      : ''
                  )
                }
                style={{ minHeight: open ? 48 : 48 }}
              >
                {item.icon}
                {open && (
                  <span className="transition-all whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div
        className={clsx('flex flex-col w-full', open ? 'p-4' : 'p-2')}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
      >
        <div className="relative flex w-full">
          <button
            ref={settingsButtonRef}
            className={clsx(
              'flex items-center rounded-lg font-medium text-gray-600 hover:bg-gray-100 hover:text-[#EC0000] transition-all w-full',
              open
                ? 'gap-3 px-4 py-2 text-base'
                : 'justify-center p-0 py-2 text-xl'
            )}
            style={{ minHeight: 44 }}
            onClick={e => {
              e.stopPropagation();
              setSettingsMenuOpen(v => !v);
            }}
            aria-haspopup="true"
            aria-expanded={settingsMenuOpen}
            type="button"
          >
            <FiSettings size={open ? 20 : 24} />
            {open && (
              <span className="transition-all whitespace-nowrap">
                Configurações
              </span>
            )}
          </button>
          {settingsMenuOpen && (
            <div
              ref={settingsMenuRef}
              className="absolute left-full bottom-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden animate-fade-in min-w-[180px] flex flex-col"
            >
              <NavLink
                to="/account"
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#EC0000] transition-all',
                    isActive ? 'bg-[#ffecec] text-[#EC0000]' : ''
                  )
                }
                style={{ minHeight: 44 }}
                onClick={() => setSettingsMenuOpen(false)}
              >
                <FiUser size={18} />
                <span>Minha Conta</span>
              </NavLink>
              <button
                className="flex items-center gap-3 px-4 py-2 w-full text-gray-500 hover:bg-red-50 hover:text-[#EC0000] transition-all"
                style={{ minHeight: 44 }}
                onClick={() => {
                  logout();
                  setSettingsMenuOpen(false);
                }}
                type="button"
              >
                <FiLogOut size={18} />
                <span>Sair</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
