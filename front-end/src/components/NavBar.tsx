import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from "../assets/frontend_assets/logo.png";
import search from "../assets/frontend_assets/search_icon.png"
import profile from "../assets/frontend_assets/profile_icon.png"
import cart from "../assets/frontend_assets/cart_icon.png"
import menu from "../assets/frontend_assets/menu_icon.png"
import dropdown from "../assets/frontend_assets/dropdown_icon.png"
import { ShopContext } from '../context/ShopContext';

const NavBar: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const context = useContext(ShopContext);
  if (!context) {
    return null;
  }
  const { setShowSearch } = context;
  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to='/'>
      <img src={logo} className="w-36" alt="Logo" />
      </Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700 '>
        <NavLink to='/' className="flex flex-col items-center gap-1">
          <p>Home</p>
          <hr className='w-1/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/about' className="flex flex-col items-center gap-1">
          <p>About</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/collection' className="flex flex-col items-center gap-1">
          <p>Collection</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/contact' className="flex flex-col items-center gap-1">
          <p>Contact</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
      </ul>
      <div className='flex item-center gap-6'>
        <img onClick={() => setShowSearch(true)} src={search} className="w-6 cursor-pointer " alt="Search" />
        <div className='group relative'>
          <img src={profile} className="w-6 cursor-pointer " alt='Profile' />
          <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 px-5 bg-slate-100 text-gray-500 rounded '>
              <p className='cursor-pointer hover:text-black'>My Profile</p>
              <p className='cursor-pointer hover:text-black'>Orders</p>
              <p className='cursor-pointer hover:text-black'>Logout</p>
            </div>
          </div>
        </div>
        <Link to={'/cart'} className='relative'>
          <img src={cart} alt='cart' className="w-6 cursor-pointer " />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>10</p>
        </Link>
        <img onClick={() => setVisible(true)} src={menu} alt='menuIcon' className="w-6 cursor-pointer sm:hidden" />
      </div>
      {/* side bar menu for small screen */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img src={dropdown} className='h-4 rotate-180' />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to='/'>Home</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to='/collection'>Collection</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to='/about'>About</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to='/contact'>Contact</NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
