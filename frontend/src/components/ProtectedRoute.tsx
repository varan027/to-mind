import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({children}: {children : React.ReactNode}) => {

  const { token, loading } = useAuth();
  if(loading){
    return <div>loading...</div>
  }
  
  if(!token){
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute