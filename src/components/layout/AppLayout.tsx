import Sidebar from './Sidebar';
// import Header from './Header';
import MainContent from './MainContent';
import Notification from './Notification';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* <Header /> */}
        <MainContent>{children}</MainContent>
      </div>
      <Notification />
    </div>
  );
}
