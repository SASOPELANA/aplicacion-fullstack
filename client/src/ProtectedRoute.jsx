import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";

function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth();
  console.log(loading, isAuthenticated);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
