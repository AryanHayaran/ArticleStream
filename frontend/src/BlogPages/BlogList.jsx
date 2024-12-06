import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function BlogList() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const fetchData = () => {
    setLoading(true); // Start loading
    axios
      .post(`${apiUrl}/blog/my-posts`, {}, { withCredentials: true })
      .then((res) => {
        setLoading(false);
        setData(res.data);
        console.log('User blog posts fetched', res);
      })
      .catch((err) => {
        console.log('Error while fetching data', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // For delete
  const handleDelete = (id) => {
    axios
      .get(`${apiUrl}/blog/delete-post/${id}`, { withCredentials: true })
      .then((res) => {
        toast('Post Deleted');
        fetchData();
        console.log('Blog post deleted', res);
      })
      .catch((err) => {
        toast('Something went wrong');
        console.log('Error while deleting data', err);
      });
  };

  const handleEdit = (id) => {
    navigate(`/edit-blog/${id}`);
    console.log(id);
  };

  return loading ? (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
      {/* Spinner */}
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
  ) : (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">User's Blog Posts</h1>

      <div className="p-6 bg-gray-100 min-h-screen">
        {data?.map((blog, i) => (
          <div
            key={blog._id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6 p-4 flex items-start sm:flex-row flex-col"
          >
            {/* Blog Image */}
            <div className="sm:w-1/4 w-full h-full">
              <img
                src={blog.imageURL}
                alt={blog.title}
                className="w-full h-max object-cover rounded-md"
              />
            </div>

            {/* Blog Details */}
            <div className="sm:w-3/4 w-full sm:pl-6 flex flex-col sm:justify-between">
              <div className="flex-grow">
                <h2 className="text-xl font-semibold text-gray-800">{blog.title}</h2>
                <p className="text-gray-600 mt-2 text-sm">
                  {blog.content.substring(0, 230)}
                  {blog.content.length > 120 && '...'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mt-4">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex space-x-4 items-center">
                <button
                  onClick={() => handleEdit(blog._id)}
                  className="text-blue-500 hover:text-blue-700 flex items-center"
                >
                  <FiEdit size={20} />
                  <span className="ml-1">Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="text-red-500 hover:text-red-700 flex items-center"
                >
                  <MdOutlineDeleteForever size={22} />
                  <span className="ml-1">Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogList;
