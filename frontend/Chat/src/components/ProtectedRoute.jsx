import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { authUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;