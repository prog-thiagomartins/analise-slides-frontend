import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import Loader from '../components/ui/Loader';
import NotFound from './NotFound';
import AccessDenied from './AccessDenied';
import { useAuth } from '../contexts/useAuth';
import AppLayout from '../components/layout/AppLayout';

// Lazy-loaded private pages (nomes dos arquivos em inglês)
const Dashboard = lazy(() => import('../pages/Dashboard'));
const NewAnalysis = lazy(() => import('../pages/NewAnalysis'));
const History = lazy(() => import('../pages/History'));
const Models = lazy(() => import('../pages/Models'));
const Glossaries = lazy(() => import('../pages/Glossaries'));
const AnalysisResult = lazy(() => import('../pages/AnalysisResult'));
const Account = lazy(() => import('../pages/Account'));

// Public pages
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/ResetPassword'));
const AboutPlatform = lazy(() => import('../pages/AboutPlatform'));

function AppRouter() {
  const { isAuthenticated } = useAuth();

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/sobre" element={<AboutPlatform />} />

        {/* Private routes com layout */}
        <Route
          path="/dashboard"
          element={
            <AppLayout>
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            </AppLayout>
          }
        />
        <Route
          path="/new-analysis"
          element={
            <AppLayout>
              <PrivateRoute>
                <NewAnalysis />
              </PrivateRoute>
            </AppLayout>
          }
        />
        <Route
          path="/history"
          element={
            <AppLayout>
              <PrivateRoute>
                <History />
              </PrivateRoute>
            </AppLayout>
          }
        />
        <Route
          path="/models"
          element={
            <AppLayout>
              <PrivateRoute>
                <Models />
              </PrivateRoute>
            </AppLayout>
          }
        />
        <Route
          path="/glossaries"
          element={
            <AppLayout>
              <PrivateRoute>
                <Glossaries />
              </PrivateRoute>
            </AppLayout>
          }
        />
        <Route
          path="/analysis/:id"
          element={
            <AppLayout>
              <PrivateRoute>
                <AnalysisResult />
              </PrivateRoute>
            </AppLayout>
          }
        />
        <Route
          path="/account"
          element={
            <AppLayout>
              <PrivateRoute>
                <Account />
              </PrivateRoute>
            </AppLayout>
          }
        />

        {/* Fallback: / → dashboard ou login */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* 404 */}
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
