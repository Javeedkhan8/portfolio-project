import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";
import UserProfile from "./pages/UserProfile";
import AdminDashboard from "./pages/AdminDashboard";
import ManageProducts from "./pages/ManageProducts";
import ManageOrders from "./pages/ManageOrders";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useState, useEffect } from "react";
import { getUserProfile } from "./services/authService";
import BuyNowCheckout from "./pages/BuyNowCheckout";


const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserProfile().then(setUser).catch(() => setUser(null));
  }, []);

  return (
    
    <Router>
      <Navbar user={user} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        {/* Protected Routes for Customers */}
        {user && (
          <>
            <Route path="/orders" element={<Orders />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/buy/:id" element={<BuyNowCheckout/>} />
          </>
        )}

        {/* Protected Routes for Admin */}
        {user?.role === "admin" && (
          <>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<ManageProducts />} />
            <Route path="/admin/orders" element={<ManageOrders />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
