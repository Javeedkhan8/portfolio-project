import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/authServices";
import { FaBars, FaTimes } from "react-icons/fa";

const Sidebar = () => {
    const navigate = useNavigate();
    const user = getCurrentUser();
    const [isOpen, setIsOpen] = useState(false); // State to handle mobile menu toggle

    const dashboardRoutes = {
        student: "/dashboard/student",
        instructor: "/dashboard/instructor",
        admin: "/dashboard/admin",
    };

    const menuItems = {
        student: [
            { name: "Courses", path: "/courses" },
            { name: "Payments", path: "/payment" },
            { name: "Chat", path: "/chat" },
        ],
        instructor: [
            { name: "My Courses", path: "/instructor/courses" },
            { name: "Attendance", path: "/instructor/attendance" },
            { name: "Chat", path: "/chat" },
        ],
        admin: [
            { name: "Manage Users", path: "/admin/users" },
            { name: "Manage Payments", path: "/admin/payments" },
            { name: "Reports", path: "/admin/reports" },
            { name: "Enroll Student", path: "/admin/enroll" },
            { name: "Create Course", path: "/admin/create-course" },
        ],
    };

    return (
        <>
           
            <button
                className="lg:hidden p-4 fixed top-4 left-4 z-50 text-white bg-gray-900 rounded-full shadow-lg"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>

        
            <aside
                className={`fixed lg:relative top-0 left-0 h-screen bg-gray-900 text-white p-6 shadow-lg z-10 w-64 
                    transform transition-transform duration-300 ${
                        isOpen ? "translate-x-0" : "-translate-x-64"
                    } lg:translate-x-0 lg:flex lg:w-64`}
            >
                <div className="w-full">
                    {/* Dashboard Heading */}
                    <h3
                        className="text-2xl font-semibold mb-6 cursor-pointer hover:text-gray-400 transition duration-200"
                        onClick={() => navigate(dashboardRoutes[user?.role] || "/")}
                    >
                        Dashboard
                    </h3>

                    
                    <ul className="space-y-3">
                        {menuItems[user?.role]?.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    navigate(item.path);
                                    setIsOpen(false); 
                                }}
                                className="cursor-pointer p-3 rounded-lg hover:bg-gray-700 transition duration-200"
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            {/* Overlay for Mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 lg:hidden"
                    onClick={() => setIsOpen(false)}
                >
                    <h3
                        className="text-2xl font-semibold mb-6 cursor-pointer hover:text-gray-400 transition duration-200"
                        onClick={() => navigate(dashboardRoutes[user?.role] || "/")}
                    >
                        Dashboard
                    </h3>
                     <ul className="space-y-3">
                        {menuItems[user?.role]?.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    navigate(item.path);
                                    setIsOpen(false); 
                                }}
                                className="cursor-pointer p-3 rounded-lg hover:bg-gray-700 transition duration-200"
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default Sidebar;
