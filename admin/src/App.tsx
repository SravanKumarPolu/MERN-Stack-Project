import 'react-toastify/dist/ReactToastify.css';

import { Route, Routes } from "react-router-dom"
import { useEffect, useState } from "react"

import Add from "./pages/Add"
import List from "./pages/List"
import Login from "./components/Login"
import Navbar from "./components/Navbar"
import Orders from "./pages/Orders"
import Sidebar from "./components/Sidebar"
import { ToastContainer } from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BACKED_URL
const App = () => {
  const [token, setToken] = useState<string>(
    localStorage.getItem('token') || ""
  );

  useEffect(() => {
    localStorage.setItem("token", token)
  }, [token])
  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {
        token === ""
          ? <Login setToken={setToken} />
          : <>
            <Navbar />
            <hr />
            <div className="flex w-full">
              <Sidebar />
              <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
                <Routes>
                  <Route path="/add" element={<Add />} />
                  <Route path="/list" element={<List />} />
                  <Route path="/orders" element={<Orders />} />
                </Routes>
              </div>
            </div>

          </>
      }

    </div>
  )
}

export default App