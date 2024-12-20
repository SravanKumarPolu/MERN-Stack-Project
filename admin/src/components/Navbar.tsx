import { assets } from '../assets/assets.js'
interface NavbarProps {
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar: React.FC<NavbarProps> = ({ setToken }) => {
  return (
    <div className='flex items-center justify-between py-2 px-[4%] '>
      <img className="w-[max(10%,80px)] " alt='' src={assets.logo} />
      <button onClick={() => setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar