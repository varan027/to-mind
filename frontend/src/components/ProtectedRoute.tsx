import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token, loading } = useAuth();
  if (loading) {
    return (
      <div className="h-screen">
        <div className="bg-base-100 border-b border-base-content/10">
          <div className="p-4 max-w-6xl mx-auto">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-primary font-Cabin tracking-tighter">
                ToMind
              </h1>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto animate-pulse p-4 mt-4">
          <div className="flex justify-between items-center">
            <div className="h-6 bg-base-200 rounded-lg w-1/3"></div>
            <div className="h-10 bg-base-200 rounded-lg w-1/10"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 mt-8">
            <div className="bg-base-200/40 rounded-lg p-4">
              <div className="h-6 bg-base-200 rounded-lg w-4/6 mb-6"></div>
              <div className="h-3 bg-base-200 rounded-lg w-full mb-4"></div>
              <div className="h-3 bg-base-200 rounded-lg w-5/6"></div>
            </div>
            <div className="bg-base-200/40 rounded-lg p-4">
              <div className="h-6 bg-base-200 rounded-lg w-4/6 mb-6"></div>
              <div className="h-3 bg-base-200 rounded-lg w-full mb-4"></div>
              <div className="h-3 bg-base-200 rounded-lg w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
