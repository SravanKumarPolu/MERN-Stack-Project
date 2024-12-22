import { useEffect, useState } from "react";

import { assets } from "../assets/assets.ts";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

// Interfaces to define structure for the order and address
interface OrdersProps {
  token: string;
}

interface OrderItem {
  name: string;
  quantity: number;
  size: string;
}

interface Address {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  phone: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  status: string;
  date: string;
  paymentMethod: string;
  address: Address;  // Added address structure here
}

const Orders: React.FC<OrdersProps> = ({ token }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  // Fetch orders from the backend
  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message || "Failed to fetch orders.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  // Fetch orders whenever the token changes
  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index} className="order-item">
              <div className="order-header">
                <img src={assets.parcel_icon} alt="Parcel Icon" />
                <p>Status: <strong>{order.status}</strong></p>
              </div>
              <div className="order-items">
                {order.items.map((item) => (
                  <p key={item.name + item.size}>  {/* Using item.name and item.size to form a unique key */}
                    {item.name} x {item.quantity}
                    <span> (Size: {item.size})</span>
                  </p>
                ))}
              </div>
              <div className="order-details">
                <p>
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                <p>Payment Method: {order.paymentMethod}</p>
              </div>
              <div className="order-address">
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                </p>
                <p>{order.address.phone}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
