import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <p className="text-text-secondary font-inter text-xs">Checking authorization...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if unauthenticated
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // If role-specific guards are defined
  if (allowedRoles && !allowedRoles.includes(role)) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-6">
        <div className="bg-white border border-border rounded-3xl p-10 max-w-md text-center shadow-sm">
          <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <h2 className="font-poppins font-extrabold text-2xl text-text-primary mb-3">Access Denied</h2>
          <p className="text-text-secondary font-inter text-sm mb-6 leading-relaxed">
            Your whitelisted account ({user.email}) does not have permission to view this section. Allowed roles: {allowedRoles.join(', ')}. Your role: {role}.
          </p>
          <Link to="/admin/dashboard" className="btn-primary inline-flex items-center gap-2 px-6 py-2.5">
            <ArrowLeft className="w-4 h-4" /> Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return children;
}
