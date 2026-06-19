import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const { authUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Logout failed");
    }
  };

  return (
    <div className="navbar bg-base-100 border-b border-base-300 px-4 sticky top-0 z-20">
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold">
          LangChat
        </Link>
      </div>

      <div className="flex-none gap-2">
        {authUser ? (
          <>
            <NavLink to="/" className="btn btn-ghost btn-sm">
              Home
            </NavLink>

            <NavLink to="/notifications" className="btn btn-ghost btn-sm">
              Notifications
            </NavLink>

            <button onClick={handleLogout} className="btn btn-error btn-sm">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost btn-sm">
              Login
            </Link>

            <Link to="/signup" className="btn btn-primary btn-sm">
              Signup
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;