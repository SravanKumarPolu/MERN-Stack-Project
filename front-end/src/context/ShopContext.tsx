import React, { ReactNode, createContext, useState } from 'react';

import { products } from '../assets/frontend_assets/assets';

// Define the shape of the context
interface ShopContextValue {
  products: typeof products;
  currency: string;
  delivery_fee: number;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  showSearch: boolean; // Remove optional flag
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>; // Remove optional flag
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

  const value: ShopContextValue = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,  // Always included
    setShowSearch,  // Always included
  };


  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
