import AppRouter from './routes/AppRouter';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AppProviders } from './contexts';

export default function App() {
  return (
    <Router>
      <AppProviders>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </AppProviders>
    </Router>
  );
}
