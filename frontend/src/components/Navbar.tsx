import { TbLogout } from "react-icons/tb";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
                <button className="flex items-center gap-2 cursor-pointer"
                onClick={() => setIsDropdownOpen((!isDropdownOpen))}>
                  <div className="w-9 h-9 text-xl rounded-full bg-primary text-black flex items-center justify-center font-semibold">
                    {user?.username?.charAt(0).toUpperCase()}
                  </div>
                </button>
              )}
            </div>

            {user && isDropdownOpen && (
              <div className="bg-black/70 rounded-lg border border-gray-700 shadow-lg absolute top-10 right-30 z-10">
                <ul>
                  <li >
                    <button
                      className="btn bg-transparent border-none rounded-lg hover:text-red-600 gap-2 text-white"
                      onClick={logout}
                    >
                      Logout <TbLogout />
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
