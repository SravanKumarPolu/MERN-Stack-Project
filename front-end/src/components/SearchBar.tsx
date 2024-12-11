import React, { useContext, useEffect, useState } from 'react';

import { ShopContext } from '../context/ShopContext';
import crossIcon from "../assets/frontend_assets/cross_icon.png";
import searchIcon from "../assets/frontend_assets/search_icon.png";
import { useLocation } from 'react-router-dom';

const SearchBar: React.FC = () => {
  const context = useContext(ShopContext);

  // State and location hooks
  const [visible, setVisible] = useState<boolean>(false);
  const location = useLocation();

  // Destructure context values, making sure it's not undefined
  const { search, setSearch, showSearch, setShowSearch } = context ?? {};

  useEffect(() => {
    // Unconditionally run the effect and set visibility conditionally inside
    if (location.pathname.includes('collection')) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location, showSearch]);

  // If context is undefined or values are missing, return null early
  if (!context || !setSearch || !setShowSearch) {
    return null;
  }

  return showSearch && visible ? (
    <div className='border-t border-b bg-gray-50 text-center'>
      <div className='inline-flex items-center justify-center border border-gray-400 bg-white px-5 py-2 my-5 mx-3 rounded-md w-3/4 sm:w-1/2'>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='flex-1 outline-none bg-inherit text-sm'
          type='text'
          placeholder='Search...'
        />
        <img className='w-4' src={searchIcon} alt='Search Icon' />
      </div>
      <img
        onClick={() => setShowSearch(false)}
        src={crossIcon}
        alt='Close Icon'
        className='inline w-3 cursor-pointer'
      />
    </div>
  ) : null;
};

export default SearchBar;
