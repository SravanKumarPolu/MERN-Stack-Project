import React from 'react'
import exchangeIcon from '../assets/frontend_assets/exchange_icon.png'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-12 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      <div>
        <img src={exchangeIcon} className='w-12 m-auto' alt='' />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className='text-gray-400'>We offer hassle free exchange policy</p>
      </div>
    </div>
  )
}

export default OurPolicy