import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
}

export interface NotificationContextType {
  notifications: Notification[];
  notify: (message: string, type?: NotificationType) => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notify = useCallback(
    (message: string, type: NotificationType = 'info') => {
      const id = Math.random().toString(36).substr(2, 9);
      setNotifications(prev => [...prev, { id, message, type }]);
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, 3500);
    },
    []
  );

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications, notify, clearNotifications }}
    >
      {children}
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
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error(
      'useNotification deve ser usado dentro de NotificationProvider'
    );
  return context;
}
