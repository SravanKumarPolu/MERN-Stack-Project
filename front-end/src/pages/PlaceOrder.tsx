import { useContext, useState } from "react"

import CartTotal from "../components/CartTotal"
import { ShopContext } from "../context/ShopContext"
import Title from "../components/Title"
import { assets } from "../assets/frontend_assets/assets"
import axios from 'axios';
import { toast } from "react-toastify"

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const context = useContext(ShopContext);
  if (!context) {
    return <div>Loading...</div>;
  }

  const { backendUrl, cartItems, products, token, navigate, getCartAmount, setCartItems, delivery_fee, } = context;

  const onSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const orderItems = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            const product = structuredClone(products.find((product) => product._id === itemId));
            if (product) {
              orderItems.push({
                ...product,
                size,
                quantity: cartItems[itemId][size],
              });
            }
          }
        }
      }

      console.log(orderItems);
      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }
      switch (method) {
        case 'cod': {
          // Wrap the code block in braces
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });
          console.log(response.data.success);
          if (response.data.success) {
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(response.data.message);
          }
          break;
        }
        default:
          break;
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  }
  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* Left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className=" text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY '} text2={'INFORMATION'} />

        </div>
        <div className="flex gap-3">
          <input required
            onChange={onChangeHandler} name="firstName" value={formData.firstName}
            type="text" className="border border-gra-300 rounded py-1.5 px-3.5 w-full" placeholder="First name" />
          <input required
            onChange={onChangeHandler} name="lastName" value={formData.lastName}
            type="text" className="border border-gra-300 rounded py-1.5 px-3.5 w-full" placeholder="Last name" />
        </div>
        <input required
          onChange={onChangeHandler} name="email" value={formData.email}
          type="email" className="border border-gra-300 rounded py-1.5 px-3.5 w-full" placeholder="Email address " />
        <input required
          onChange={onChangeHandler} name="street" value={formData.street}
          type="text" className="border border-gra-300 rounded py-1.5 px-3.5 w-full" placeholder="Street" />
        <div className="flex gap-3">
          <input required
            onChange={onChangeHandler} name="city" value={formData.city}
            type="text" className="border border-gra-300 rounded py-1.5 px-3.5 w-full" placeholder="City" />
          <input required
            onChange={onChangeHandler} name="state" value={formData.state}
            type="text" className="border border-gra-300 rounded py-1.5 px-3.5 w-full" placeholder="State" />
        </div>
        <div className="flex gap-3">
          <input required
            onChange={onChangeHandler} name="zipcode" value={formData.zipcode}
            type="number" className="border border-gra-300 rounded py-1.5 px-3.5 w-full" placeholder="ZipCode" />
          <input required
            onChange={onChangeHandler} name="country" value={formData.country}
            type="text" className="border border-gra-300 rounded py-1.5 px-3.5 w-full" placeholder="Country" />
        </div>
        <input required
          onChange={onChangeHandler} name="phone" value={formData.phone}
          type="number" className="border border-gra-300 rounded py-1.5 px-3.5 w-full" placeholder="Phone" />
      </div>
      {/* Right side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={'PAYMENT '} text2={'METHOD'} />
          {/* --- Payment Methods--- */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod('stripe')}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer ">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}>  </p>
              <img className="h-4 mx-4 " src={assets.stripe_logo} alt="" />


            </div>
            <div
              onClick={() => setMethod('razorpay')}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer ">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className="h-4 mx-4 " src={assets.razorpay_logo} alt="" />

            </div>
            <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer  ">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>

            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"

              className=" bg-gray-900 text-white px-16 py-3 text-sm">PLACE ORDER</button>
          </div>

        </div>
      </div>

    </form>
  )
}

export default PlaceOrder