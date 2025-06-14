import AppLayout from './components/layout/AppLayout';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import { AuthProvider } from './contexts/AuthContext';
import { AppProviders } from './contexts';

const PUBLIC_ROUTES = ['/login', '/register', '/forgot-password'];

function MainApp() {
  const location = useLocation();
  const isPublicPage =
    PUBLIC_ROUTES.includes(location.pathname) ||
    location.pathname.startsWith('/reset-password');
  return isPublicPage ? (
    <AppRouter />
  ) : (
    <AppLayout>
      <AppRouter />
    </AppLayout>
  );
}

export default function App() {
  return (
    <Router>
      <AppProviders>
        <AuthProvider>
          <MainApp />
        </AuthProvider>
      </AppProviders>
    </Router>
  );
}
