import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Loader2 } from "lucide-react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="h-screen w-full bg-mesh flex flex-col justify-center items-center gap-4">
        <Loader2 className="size-10 text-primary animate-spin" />
        <p className="text-base-content/50 text-sm animate-pulse">Initializing your mind...</p>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;