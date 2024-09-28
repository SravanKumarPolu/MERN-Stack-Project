import React from 'react';
import logo from "../assets/frontend_assets/logo.png"; // Ensure the logo path is correct

const Footer: React.FC = () => {
  return (
    <div >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 py-10 my-10 mt-20 text-sm">

        {/* Company Information */}
        <div className='w-full'>
          <img src={logo} className='mb-5 w-32 mx-auto md:mx-0' alt='Company Logo' />
          <p className="text-gray-600 text-center md:text-left">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam harum odit soluta eius sint maiores amet dolore excepturi earum aperiam!
          </p>
        </div>

        {/* Company Links */}
        <div className='w-full'>
          <p className='text-xl font-medium mb-5 text-center md:text-left'>Company</p>
          <ul className='flex flex-col gap-2 text-gray-600 text-center md:text-left'>
            <li className="hover:text-gray-800 cursor-pointer">Home</li>
            <li className="hover:text-gray-800 cursor-pointer">About Us</li>
            <li className="hover:text-gray-800 cursor-pointer">Delivery</li>
            <li className="hover:text-gray-800 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Get In Touch */}
        <div className='w-full'>
          <p className='text-xl font-medium mb-5 text-center md:text-left'>Get In Touch</p>
          <ul className='flex flex-col gap-2 text-gray-600 text-center md:text-left'>
            <li>+00-000-000</li>
            <li>contact@foreveryou.com</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-300 py-5">
        <p className='text-sm text-center text-gray-600'>
          &copy; 2024 ForeverYou - All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
