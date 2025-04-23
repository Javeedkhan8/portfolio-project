import { useState, useContext } from 'react';
import { login } from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import { useNavigate,Link } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login: loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      loginUser(res.data);
      navigate('/chat');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="text-center absolute top-10 w-full">
        <h1 className="text-5xl font-bold text-white">ChatConnect</h1>
        <p className="text-xl text-white mt-2">Connecting you with your friends, one chat at a time</p>
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full space-y-6 mt-24">
        <h2 className="text-3xl font-semibold text-center text-gray-800">Login</h2>
        <div className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
        >
          Login
        </button>
        <p className="text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-purple-600 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
