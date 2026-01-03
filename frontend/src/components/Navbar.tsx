import { TbLogout } from "react-icons/tb";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="bg-base-100 border-b border-base-content/10">
      <div className="mx-auto p-4 max-w-6xl">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary font-Cabin tracking-tighter">
            ToMind
          </h1>
          <div className="flex items-center gap-2">
            <div>
              {user && (
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 text-xl rounded-full bg-primary text-black flex items-center justify-center font-semibold">
                      {user.username.charAt(0).toUpperCase()}
                  </div>
                </div>
              )}
            </div>

            {user && (
              <button
                className="btn text-error/70 border-2 border-error/30 rounded"
                onClick={logout}
              >
                Logout <TbLogout />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
