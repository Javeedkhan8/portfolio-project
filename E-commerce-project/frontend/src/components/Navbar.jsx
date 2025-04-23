import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfile } from "../services/authService";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const userData = await getUserProfile();
          setUser(userData);
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Invalid token or failed to fetch user");
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          setUser(null);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6">
        <Link to="/" className="text-xl font-semibold hover:text-gray-300 transition">
          E-Shop
        </Link>
        <div className="flex space-x-6 items-center">
          {isLoggedIn ? (
            <>
              <span>Hi, {user?.name || "User"}</span>
              <Link to="/cart" className="hover:text-gray-300 transition">Cart</Link>
              <Link to="/orders" className="hover:text-gray-300 transition">Orders</Link>
              {user?.role === "admin" && (
                <Link to="/admin" className="hover:text-gray-300 transition">Admin</Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
