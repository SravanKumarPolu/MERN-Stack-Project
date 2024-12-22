import { useContext, useEffect, useState } from "react";

import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";

// Define types for better TypeScript support
interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  size: string;
  image: string[];
  date: number;
  payment: string;
  paymentMethod: string;
  status: string;
}

interface Order {
  items: OrderItem[];
  status: string;
  payment: string;
  paymentMethod: string;
  date: number;
}

const Orders = () => {
  const context = useContext(ShopContext);
  const [orderData, setOrderData] = useState<OrderItem[]>([]);

  // Define backendUrl and token with default values to prevent conditional useEffect execution
  const backendUrl = context?.backendUrl ?? "";
  const token = context?.token ?? "";

  const loadOrderData = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        const allOrdersItem: OrderItem[] = [];
        response.data.orders.forEach((order: Order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            });
          });
        });

        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (token) {
      loadOrderData();
    }
  }, [token]);

  // Render logic
  if (!context) {
    return <div>Loading...</div>;
  }

  const { currency } = context;

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY  "} text2={"ORDERS"} />
      </div>
      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            {/* Product Details */}
            <div className="flex items-start gap-6">
              <img
                className="w-20 h-20 rounded-lg object-cover"
                src={item.image[0]}
                alt={item.name}
              />
              <div>
                <p className="text-lg font-semibold text-gray-900">{item.name}</p>
                <div className="flex items-center gap-4 text-gray-700 mt-2 text-sm">
                  <p className="font-medium">
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span>
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Payment: <span className="text-gray-400">{item.paymentMethod}</span>
                </p>
              </div>
            </div>

            {/* Order Status and Action */}
            <div className="flex items-center justify-between md:justify-end gap-6 mt-4 md:mt-0 md:w-1/3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <p className="text-sm font-medium text-gray-700">{item.status}</p>
              </div>
              <button
                onClick={loadOrderData}
                className="border px-4 py-2 text-sm font-medium rounded-sm"
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
