import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const apiUrl = import.meta.env.VITE_API_URL;

  const navigate = useNavigate()

  const fetchData = () => {
    setLoading(true); // Start loading
    axios.get(`${apiUrl}/blog/blogs`, {}, { withCredentials: true })
      .then((res) => {
        setLoading(false);
        setData(res.data);
        console.log("User data fetched", res);
      })
      .catch((err) => {
        console.log("Error while fetching data", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4 sm:py-6 sm:px-[40px] md:px-[80px] lg:px-[170px] p-4">
      {loading ? (
        <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-75 z-10">
          {/* Spinner */}
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        data?.map((item, index) => (
          <div
            key={index}
            className="relative flex flex-col sm:flex-row border border-gray-200 shadow-md rounded-lg p-3 bg-white hover:shadow-lg w-full"
          >
            {/* Image */}
            <img
              src={item?.imageURL}
              alt={item?.title}
              className="w-full sm:w-[200px] sm:h-[200px] h-auto object-cover rounded-sm sm:mr-4 mb-4 sm:mb-0"
            />

            {/* Blog Content */}
            <div className="flex flex-col justify-between w-full">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{item?.title}</h2>
                <p className="text-gray-600 mb-4">{item?.content?.substring(0, 250)}...</p>
              </div>

              {/* Footer Section */}
              <div className="flex justify-between items-end mt-4">
                <div className="flex flex-col">
                  <p className="text-gray-500 text-sm mb-2">Author: {item?.author?.name}</p>
                  <p className="text-gray-400 text-xs">{new Date(item?.updatedAt).toLocaleDateString()}</p>
                </div>

                {/* View More Button */}
                <button
                  onClick={() => navigate(`/${item?._id}`)}
                  className="text-[14px] font-sm text-gray-500 px-4 py-2 hover:text-[#0A5EB0]"
                >
                  View More
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
