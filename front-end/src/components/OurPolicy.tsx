
import exchangeIcon from '../assets/frontend_assets/exchange_icon.png'
import qualityIcon from "../assets/frontend_assets/quality_icon.png"
import supportIcon from "../assets/frontend_assets/support_img.png"
const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-12 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      <div>
        <img src={exchangeIcon} className='w-12 m-auto' alt='' />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className='text-gray-400'>We offer hassle free exchange policy</p>
      </div>
      <div>
        <img src={qualityIcon} className='w-12 m-auto' alt='' />
        <p className="font-semibold"> Between 7 Days Return Policy</p>
        <p className='text-gray-400'>We provide 7 days free return Policy</p>
      </div>
      <div>
        <img src={supportIcon} className='w-12 m-auto' alt='' />
        <p className="font-semibold">Best Custome Support</p>
        <p className='text-gray-400'>Custome support available 24/7</p>
      </div>
    </div>
  )
}

export default OurPolicy