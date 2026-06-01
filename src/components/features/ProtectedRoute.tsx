import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, LayoutDashboard, Lock, LogIn, ShieldAlert, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getDefaultDashboardPath, hasRouteAccess, ROLE_LABELS } from '@/lib/rbac';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (isLoggedIn && hasRouteAccess(user?.role, location.pathname)) {
    return <>{children}</>;
  }

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-8 h-8 text-amber-600" />
          </div>
          <h2 className="text-2xl font-display font-bold text-gray-900 mb-3">
            Access Restricted
          </h2>
          <p className="text-gray-500 text-base leading-relaxed mb-6">
            This module is not available for the {user?.role ? ROLE_LABELS[user.role] : 'current'} role.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate(getDefaultDashboardPath(user?.role))}
              className="btn-primary w-full justify-center py-3.5 text-base"
            >
              <LayoutDashboard className="w-5 h-5" />
              Go to Dashboard
            </button>
            <button
              onClick={() => navigate(-1)}
              className="btn-outline w-full justify-center py-3.5 text-base"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show the modal overlay — page behind is blocked
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Blurred background preview */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-secondary-900/20 to-gray-900/40 backdrop-blur-sm" />

      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl" />
      </div>

      {/* Modal */}
      <div className="relative z-10 bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 max-w-md w-full animate-scale-in">
        {/* Close button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-brand">
          <Lock className="w-8 h-8 text-white" />
        </div>

        {/* Content */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-display font-bold text-gray-900 mb-3">
            Login Required
          </h2>
          <p className="text-gray-500 text-base leading-relaxed">
            This page is only accessible to registered users. Please log in or create a free account to continue.
          </p>
        </div>

        {/* Features preview */}
        <div className="bg-primary-50 rounded-2xl p-4 mb-6">
          <p className="text-sm font-semibold text-primary-700 mb-2">With a free account you get:</p>
          <ul className="space-y-1.5">
            {[
              'Full access to all dashboard tools',
              'Funnel builder with 50+ templates',
              'CRM, analytics & campaign manager',
              '14-day free trial, no credit card needed',
            ].map(item => (
              <li key={item} className="flex items-center gap-2 text-sm text-primary-700">
                <span className="w-1.5 h-1.5 bg-primary-500 rounded-full flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate('/login')}
            className="btn-primary w-full justify-center py-3.5 text-base"
          >
            <LogIn className="w-5 h-5" />
            Log In to Continue
          </button>
          <button
            onClick={() => navigate('/register')}
            className="btn-outline w-full justify-center py-3.5 text-base"
          >
            Create Free Account
          </button>
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors py-1"
          >
            Cancel and Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
