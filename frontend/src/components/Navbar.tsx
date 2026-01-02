import { PlusIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { TbLogout } from "react-icons/tb";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <div className="bg-base-100 border-b border-base-content/10">
      <div className="mx-auto p-4 max-w-6xl">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary font-Cabin tracking-tighter">
            ToMind
          </h1>
          <div className="flex items-center gap-2">
            <Link to={"/create"} className="btn btn-primary rounded">
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>
            <button
              className="btn text-error/70 border-2 border-error/30 rounded"
              onClick={logout}
            >
              Logout <TbLogout />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
