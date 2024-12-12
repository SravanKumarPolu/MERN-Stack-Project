import React, { ReactNode, createContext, useState } from 'react';

import { products } from '../assets/frontend_assets/assets';
import { useNavigate } from 'react-router-dom';

// Define the shape of the context
interface ShopContextValue {
  products: typeof products;
  currency: string;
  delivery_fee: number;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: Record<string, Record<string, number>>;
  addToCart: (itemId: string, size: string) => void;
  getCartCount: () => number;
  getCartAmount: () => number;
  updateQuantity: (itemId: string, size: string, quantity: number) => void;
  navigate: ReturnType<typeof useNavigate>;
}

// Create the context
export const ShopContext = createContext<ShopContextValue | undefined>(undefined);

interface ShopContextProviderProps {
  children: ReactNode;
}

const ShopContextProvider: React.FC<ShopContextProviderProps> = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<Record<string, Record<string, number>>>({});
  const navigate = useNavigate();
  const addToCart = (itemId: string, size: string) => {
    const cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    setCartItems(cartData);
  };

  const getCartCount = (): number => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.error('Error calculating cart count:', error);
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = (itemId: string, size: string, quantity: number) => {
    const cartData = structuredClone(cartItems);
    if (cartData[itemId] && cartData[itemId][size] !== undefined) {
      cartData[itemId][size] = quantity;
    }
    setCartItems(cartData);
  };
  const getCartAmount = (): number => {
    let totalAmount = 0;
    for (const items in cartItems) {
      const itemInfo = products.find((product) => product._id === items);
      if (itemInfo) {
        for (const size in cartItems[items]) {
          try {
            if (cartItems[items][size] > 0) {
              totalAmount += itemInfo.price * cartItems[items][size];
            }
          } catch (error) {
            console.error('Error calculating cart amount:', error);
          }
        }
      }
    }
    return totalAmount;
  };
  const value: ShopContextValue = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
