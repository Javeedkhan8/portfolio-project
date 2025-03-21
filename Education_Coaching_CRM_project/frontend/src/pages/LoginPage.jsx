import { useState } from "react";
import { login, getUserRole } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import LoginImage from "../assets/LoginImage.jpg";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const res = await login(email, password);
            if (res?.token) {
                const role = await getUserRole();

                if (role) {
                    localStorage.setItem("role", role);

                    if (role === "student") navigate("/dashboard/student");
                    else if (role === "instructor") navigate("/dashboard/instructor");
                    else if (role === "admin") navigate("/dashboard/admin");
                    else navigate("/login");
                } else {
                    setError("Failed to get user role.");
                }
            } else {
                setError("Invalid email or password.");
            }
        } catch (err) {
            setError("Invalid email or password");
            console.error("Login error:", err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-yellow-50 p-4">
            <div className="bg-white shadow-lg rounded-2xl flex flex-col md:flex-row max-w-4xl w-full overflow-hidden">
                {/* Left Section - Image (Visible on Medium and Larger Screens) */}
                <div className="hidden md:block md:w-1/2">
                    <img
                        src={LoginImage}
                        alt="Education"
                        className="w-full h-full object-cover p-6 "
                    />
                </div>

                {/* Right Section - Login Form */}
                <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
                    <div className="flex items-center justify-center mb-6">
                        <div className="bg-black w-10 h-10 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">E</span>
                        </div>
                        <span className="ml-2 text-xl font-semibold">TrackEd</span>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 text-center md:text-left">Let the Journey Begin!</h2>
                    <p className="text-gray-500 mb-6 text-center md:text-left">
                        Unlock a world of education with a single click! Please login to your account.
                    </p>

                    {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-yellow-400 text-black font-semibold p-3 rounded-lg hover:bg-yellow-500 transition"
                        >
                            Login
                        </button>
                    </form>

                    <p className="text-center text-gray-600 mt-4">
                        Don’t have an account?
                        <Link to="/register"
                        className="text-black font-semibold hover:underline ml-1">
                            Sign Up For Free
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
