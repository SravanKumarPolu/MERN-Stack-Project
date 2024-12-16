import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { useState } from 'react';

// Define props type for Login component
interface LoginProps {
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

const Login: React.FC<LoginProps> = ({ setToken }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + "/api/user/admin", { email, password });
      console.log(response);
      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }

  };

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='mb-4 font-bold text-2xl'>Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
              type="email"
              placeholder='your@email.com'
              required
            />
          </div>
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
              type="password"
              placeholder='Enter your password'
              required
            />
          </div>
          <button
            className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black'
            type='submit'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
