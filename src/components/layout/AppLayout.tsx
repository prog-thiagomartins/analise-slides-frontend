import Sidebar from './Sidebar';
import MainContent from './MainContent';
import Notification from '../ui/Notification';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <MainContent>{children}</MainContent>
      </div>
      <Notification />
    </div>
  );
}
