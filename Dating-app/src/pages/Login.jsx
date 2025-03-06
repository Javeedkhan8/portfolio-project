import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      setUser(storedUser);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-96 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome Back 👋</h2>
        <p className="text-gray-500 mb-6">Connect with your companion</p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-purple-500 text-white p-3 rounded-full hover:bg-purple-600 transition"
        >
          Login
        </button>

        <p className="mt-4 text-sm text-gray-500">
          Don't have an account?{" "}
          <a href="/register" className="text-purple-600 font-medium hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
