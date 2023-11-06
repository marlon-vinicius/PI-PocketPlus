import { Outlet, Navigate } from "react-router-dom";

function PrivateRoutes() {
  const token = window.sessionStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoutes;
