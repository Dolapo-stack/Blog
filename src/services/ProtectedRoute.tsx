import { Navigate } from "react-router-dom";

interface protectedRoute {
  children: React.ReactNode;
}
const protectedRoute = ({ children }: protectedRoute) => {
  const isAuth = sessionStorage.getItem("auth");
  return isAuth ? children : <Navigate to="/login" replace />;
};
export default protectedRoute;
