import { useLocation, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RequireAuth({ children }) {
  const { isLoggedIn } = useAuth();
  let location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
