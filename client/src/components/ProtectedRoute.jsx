import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();
  // make sure `user` comes from your AuthContext and includes a role field

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // ✅ role-based check
  if (user?.role !== "admin") {
    return <Navigate to="/" />; // or maybe redirect to dashboard
  }

  return children;
};

export default ProtectedRoute;
