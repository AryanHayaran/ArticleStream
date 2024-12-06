import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { CiViewList } from 'react-icons/ci'
import { FiUser } from 'react-icons/fi'
import { IoCreateOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {

    const navigate = useNavigate()

    return (
 <div className="bg-white h-screen border-r shadow-lg">


  {/* Menu Items */}
  <div className="space-y-5 py-5 px-4">
    {/* Create Blog */}
    <div
      onClick={() => navigate('/create-blog')}
      className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-blue-100 group transition"
    >
      <IoCreateOutline size={24} className="text-blue-500 group-hover:text-blue-700" />
      <p className="font-semibold text-gray-700 group-hover:text-blue-700">Create Blog</p>
    </div>

    {/* Blog List */}
    <div
      onClick={() => navigate('/blog-list')}
      className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-blue-100 group transition"
    >
      <CiViewList size={24} className="text-blue-500 group-hover:text-blue-700" />
      <p className="font-semibold text-gray-700 group-hover:text-blue-700">Blog List</p>
    </div>

    {/* Profile */}
    <div
      onClick={() => navigate('/profile')}
      className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-blue-100 group transition"
    >
      <FiUser size={24} className="text-blue-500 group-hover:text-blue-700" />
      <p className="font-semibold text-gray-700 group-hover:text-blue-700">Profile</p>
    </div>
  </div>


</div>

    )
}

export default Sidebar