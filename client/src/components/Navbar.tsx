import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authReducer";
import { LogOut, User } from "lucide-react";
import type { RootState } from "../redux/store";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const navigate = useNavigate();


  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="w-full shadow bg-white fixed top-0 left-0 z-20">
      <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">

        <Link
          to="/"
          
        >
          <h1 className="text-2xl font-bold text-blue-600">StoreRating</h1>
        </Link>

        

        {/* RIGHT SECTION */}
        <div className="space-x-4 flex items-center">

          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-100 transition"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              {/* Profile Icon */}
              <Link to="/user/profile">
                <User className="w-6 h-6 text-blue-600 hover:text-blue-800 cursor-pointer" />
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-red-600 hover:text-red-800 transition"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
