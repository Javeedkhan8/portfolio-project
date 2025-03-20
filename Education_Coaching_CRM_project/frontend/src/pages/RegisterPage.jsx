import { useState } from "react";
import { register } from "../services/authServices";
import { enrollStudent } from "../services/courseServices";
import { useNavigate } from "react-router-dom";
import StudentImage from "../assets/RegisterImage.jpg"; 

const RegisterPage = () => {
    const [user, setUser] = useState({ name: "", email: "", password: "", role: "student", courseId: "" });
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const registeredUser = await register(user);

        if (registeredUser && user.role === "student" && user.courseId) {
            await enrollStudent(user.courseId, registeredUser._id);
        }

        navigate("/login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-2xl flex flex-col md:flex-row-reverse max-w-4xl w-full overflow-hidden">
                {/* Right Section - Image (Visible on Medium and Larger Screens) */}
                <div className="hidden md:block md:w-1/2">
                    <img
                        src={StudentImage}
                        alt="Education"
                        className="w-full h-full object-cover p-8 bo"
                    />
                </div>

                {/* Left Section - Register Form */}
                <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
                    <div className="flex items-center justify-center mb-6">
                        <div className="bg-black w-10 h-10 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">E</span>
                        </div>
                        <span className="ml-2 text-xl font-semibold">TrackEd</span>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 text-center md:text-left">Create Your Account</h2>
                    <p className="text-gray-500 mb-6 text-center md:text-left">
                        Join us today and start learning!
                    </p>

                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Name"
                                onChange={(e) => setUser({ ...user, name: e.target.value })}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                required
                                autoComplete="email"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                required
                                autoComplete="current-password"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <select
                                onChange={(e) => setUser({ ...user, role: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="student">Student</option>
                                <option value="instructor">Instructor</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-semibold p-3 rounded-lg hover:bg-blue-700 transition"
                        >
                            Register
                        </button>
                    </form>

                    <p className="text-center text-gray-600 mt-4">
                        Already have an account?
                        <a href="/login" className="text-black font-semibold hover:underline ml-1">
                            Login here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
