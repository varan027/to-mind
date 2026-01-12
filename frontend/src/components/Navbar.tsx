import { TbLogout } from "react-icons/tb";
import { useAuth } from "../context/AuthContext";
import { useState, useRef, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="bg-base-100/50 backdrop-blur-md border-b border-base-content/5 sticky top-0 z-50 transition-colors duration-300">
      <div className="mx-auto p-4 max-w-7xl relative">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary font-Cabin tracking-tighter">
            ToMind
          </h1>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />

            <div className="relative" ref={dropdownRef}>
              {user && (
                <button 
                  className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="w-9 h-9 text-lg rounded-full bg-gradient-to-br from-primary to-secondary text-primary-content flex items-center justify-center font-bold shadow-lg shadow-primary/20">
                    {user?.username?.charAt(0).toUpperCase()}
                  </div>
                </button>
              )}

              {user && isDropdownOpen && (
                <div className="absolute top-12 right-0 z-20 w-48 bg-base-200 border border-base-content/10 shadow-2xl rounded-xl overflow-hidden animate-fade-in p-1 origin-top-right">
                  <div className="px-4 py-3 border-b border-base-content/10 mb-1">
                    <p className="text-sm font-medium text-base-content">{user.username}</p>
                    <p className="text-xs text-base-content/60 truncate">{user.email}</p>
                  </div>
                  <button
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-error hover:bg-error/10 rounded-lg transition-colors"
                    onClick={logout}
                  >
                    <TbLogout className="size-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;