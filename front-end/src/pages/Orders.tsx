import { useContext, useEffect, useState } from "react"

import { ShopContext } from "../context/ShopContext"
import Title from "../components/Title"
import axios from "axios"

const Orders = () => {
  const context = useContext(ShopContext)
  // Handle context being undefined in the render logic
  if (!context) {
    return <div>Loading...</div>;
  }
  const { backendUrl, token, currency } = context;
  const [orderData, setOrderData] = useState([])
  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentmethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse())
      }
      console.log(response.data)

    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");

    }
  }
  useEffect(() => {
    loadOrderData()
  }, [token])
  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={'MY  '} text2={'ORDERS'} />
      </div>
      <div >
        {orderData.map((item, index) => (
          <div key={index} className="  py-4 border-t text-gray-700 flex flex-col md:flex-row md:items-center
         md:justify-between gap-4">
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
                  <p className="font-medium">{currency}{item.price}</p>
                  <p>Quantity: 1</p>
                  <p>Size: M</p>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Date: <span className="text-gray-400">12, Dec, 2024</span>
                </p>
              </div>
            </div>

            {/* Order Status and Action */}
            <div className="flex items-center justify-between md:justify-end gap-6 mt-4 md:mt-0 md:w-1/3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <p className="text-sm font-medium text-gray-700">Ready to Ship</p>
              </div>
              <button className="border px-4 py-2 text-sm font-medium rounded-sm">Track Order</button>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

export default Orders