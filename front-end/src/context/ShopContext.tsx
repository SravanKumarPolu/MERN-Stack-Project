import React, { createContext, ReactNode } from "react";
import { products } from "../assets/frontend_assets/assets";

// Define the shape of the context value
interface ShopContextValue {
  products: typeof products;
  currency: string;
  delivery_fee: number;
}

// Initialize the context with the appropriate type
export const ShopContext = createContext<ShopContextValue | undefined>(undefined);

// Define the props for the provider
interface ShopContextProviderProps {
  children: ReactNode;
}

const ShopContextProvider = ({ children }: ShopContextProviderProps) => {
  const currency = "$";
  const delivery_fee = 10;

  const value: ShopContextValue = {
    products,
    currency,
    delivery_fee,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
