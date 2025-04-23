import { useEffect, useState } from "react";
import { getAllOrders } from "../services/orderService";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllOrders().then(setOrders);
  }, []);

  return (
    <div>
      <h1>Manage Orders</h1>
      {orders.map((order) => (
        <div key={order._id}>
          <h3>Order ID: {order._id}</h3>
          <p>Total Amount: ₹{order.totalPrice}</p>
        </div>
      ))}
    </div>
  );
};

export default ManageOrders;
