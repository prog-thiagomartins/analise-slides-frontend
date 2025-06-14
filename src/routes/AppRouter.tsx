import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import Loader from '../components/ui/Loader';
import NotFound from './NotFound';
import AccessDenied from './AccessDenied';
import { useAuth } from '../contexts/useAuth';

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

        {/* Private routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/new-analysis"
          element={
            <PrivateRoute>
              <NewAnalysis />
            </PrivateRoute>
          }
        />
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <History />
            </PrivateRoute>
          }
        />
        <Route
          path="/models"
          element={
            <PrivateRoute>
              <Models />
            </PrivateRoute>
          }
        />
        <Route
          path="/glossaries"
          element={
            <PrivateRoute>
              <Glossaries />
            </PrivateRoute>
          }
        />
        <Route
          path="/analysis/:id"
          element={
            <PrivateRoute>
              <AnalysisResult />
            </PrivateRoute>
          }
        />
        <Route
          path="/account"
          element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
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
