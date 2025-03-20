import { useEffect, useState } from "react";
import { getCurrentUser, logout } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false); // For mobile menu
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = getCurrentUser();
        console.log("Navbar - Retrieved User:", currentUser); 
        setUser(currentUser);
    }, []);

    const handleLogout = () => {
        logout();
        setUser(null);
        navigate("/login");
    };

    return (
        <nav className="bg-white shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <div>
                <div className="bg-blue-600 w-10 h-10 rounded-lg px-3 py-2 items-center justify-center inline">
                            <span className="text-white font-bold text-lg">E</span>
                        </div>
                <h2 className="text-xl font-bold text-blue-600 inline">  TrackEdu</h2>
                </div>

                {/* Hamburger Icon (Mobile) */}
                <button
                    className="md:hidden text-gray-700"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>

                {/* Navbar Links (Desktop & Mobile) */}
                <div className={`absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent md:flex items-center gap-4 transition-all duration-300 ease-in-out ${isOpen ? "block" : "hidden"}`}>
                    {user ? (
                        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 p-4 md:p-0">
                            <span className="text-gray-700 font-medium">
                                Welcome, {user.name} <span className="text-sm text-gray-500">({user.role})</span>
                            </span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate("/login")}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 block md:inline"
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
