import axios from 'axios'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from './context/AuthContext'

function Header() {
    const apiUrl = import.meta.env.VITE_API_URL;


    const navigate = useNavigate()

    const { setIsAuthenticated, isAuthenticated, myData } = useContext(AuthContext)

    const handleLogout = () => {
        axios.post(`${apiUrl}/user/logout`, {}, { withCredentials: true })
            .then((res) => {
                setIsAuthenticated(false)
                toast("Logout Successful");
                console.log("User logout success", res);
            })
            .catch((err) => {
                console.log("Error while logout", err)

            })
        navigate('/login')
    }

    return (
<div className="border-b bg-white shadow-md h-16 flex justify-between items-center px-6">
  {/* Left Section */}
  <div className="flex items-center space-x-4">
    {/* <div className="text-xl font-semibold text-gray-800">BlogApp</div> */}
    <Link
      to="/"
      className="text-xl font-semibold text-gray-700 hover:text-blue-500 transition-colors"
    >
      ArticleStream
    </Link>
    {isAuthenticated && (
      <Link
        to="/profile"
        className="text-md font-medium text-gray-700 hover:text-blue-500 transition-colors"
      >
        Profile
      </Link>
    )}
  </div>

  {/* Right Section */}
  <div className="flex items-center space-x-4">
    {isAuthenticated ? (
      <>

        <button
          onClick={handleLogout}
          className="text-md font-medium text-red-600 hover:underline transition"
        >
          Log Out
        </button>
      </>
    ) : (
      <>
        <Link
          to="/login"
          className="text-md font-medium text-blue-600 hover:underline transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="text-md font-medium text-green-600 hover:underline transition"
        >
          Sign Up
        </Link>
      </>
    )}
  </div>
</div>




    )
}

export default Header