import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Persist user state after refresh
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, [setUser]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove user from localStorage
    navigate("/login");
  };

  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between items-center fixed w-full z-10">
      <div className="text-xl font-bold">Companio</div>

      <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </button>

      <div
        className={`absolute top-16 left-0 w-full bg-blue-500 md:bg-transparent md:static md:flex md:space-x-4 transition-all duration-300 ${
          isOpen ? "block" : "hidden"
        } md:block`}
      >
        <Link to="/dashboard" className="block py-2 px-4 hover:underline">
          Home
        </Link>
        {user ? (
          <>
            <Link to="/liked" className="block py-2 px-4 hover:underline">
              Liked
            </Link>
            <Link to="/profile" className="block py-2 px-4 hover:underline">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="block py-2 px-4 text-left hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="block py-2 px-4 hover:underline">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
