import { Navigate } from "react-router";

const ProtectedRoute = ({children}: {children : React.ReactNode}) => {
  const token = localStorage.getItem("token");
  if(!token){
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute