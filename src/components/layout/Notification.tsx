import { useContext } from 'react';
import { NotificationContext } from '../../contexts/NotificationContext';

export default function Notification() {
  const context = useContext(NotificationContext);
  if (!context || !context.notifications.length) return null;
  const { notifications } = context;
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {notifications.map(n => (
        <div
          key={n.id}
          className={`px-4 py-2 rounded shadow-lg text-white transition-all
            ${n.type === 'success' ? 'bg-green-600' : ''}
            ${n.type === 'error' ? 'bg-red-600' : ''}
            ${n.type === 'warning' ? 'bg-yellow-600 text-black' : ''}
            ${n.type === 'info' ? 'bg-blue-600' : ''}
          `}
        >
          {n.message}
        </div>
      ))}
    </div>
  );
}
