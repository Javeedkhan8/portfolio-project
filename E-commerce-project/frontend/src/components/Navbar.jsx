import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfile } from "../services/authService";
import { Menu, X } from "lucide-react"; 

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
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
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold hover:text-gray-300 transition">
          E-Shop
        </Link>

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex md:items-center md:space-x-6 absolute md:static top-[50px] left-0 w-full md:w-auto bg-gray-900 px-6 py-4 md:py-0 z-10`}
        >
          {isLoggedIn ? (
            <>
              <span className="block md:inline">Hi, {user?.name || "User"}</span>
              <Link to="/cart" className="block md:inline hover:text-gray-300 transition">
                Cart
              </Link>
              <Link to="/orders" className="block md:inline hover:text-gray-300 transition">
                Orders
              </Link>
              {user?.role === "admin" && (
                <Link to="/admin" className="block md:inline hover:text-gray-300 transition">
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="block md:inline bg-red-500 px-4 py-2 rounded-lg mt-2 md:mt-0 hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block md:inline bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
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
