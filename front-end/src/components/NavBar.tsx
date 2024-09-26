import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../assets/frontend_assets/logo.png";

const NavBar: React.FC = () => {
  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <img src={logo} className="w-36" alt="Logo" />
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
    </div>
  );
};

export default NavBar;
