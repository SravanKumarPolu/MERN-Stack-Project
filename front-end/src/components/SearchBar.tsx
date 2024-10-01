import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import searchIcon from "../assets/frontend_assets/search_icon.png";
import crossIcon from "../assets/frontend_assets/cross_icon.png";

const SearchBar: React.FC = () => {
  // Use context safely
  const context = useContext(ShopContext);

  // If context is undefined, don't attempt to destructure it
  if (!context) {
    return null;
  }

  // Destructure context values
  const { search, setSearch, showSearch, setShowSearch } = context;

  return showSearch ? (
    <div className='border-t border-b bg-gray-50 text-center'>
      <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='flex-1 outline-none bg-inherit text-sm'
          type='text'
          placeholder='Search'
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
