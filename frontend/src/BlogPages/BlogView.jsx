import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { SlEye } from 'react-icons/sl';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../components/context/AuthContext';

function BlogView() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [detailsData, setDetailsData] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;

  const { isAuthenticated } = useContext(AuthContext);

  const fetchDetailsData = () => {
    const url = isAuthenticated
      ? `${apiUrl}/blog/${id}/details`
      : `${apiUrl}/blog/${id}/details/public`;

    axios
      .post(url, {}, { withCredentials: true })
      .then((res) => {
        setDetailsData(res.data);
        console.log('Details data fetched', res);
      })
      .catch((err) => {
        console.log('Error while fetching details data', err);
      });
  };

  const fetchData = () => {
    setLoading(true); // Start loading
    axios
      .get(`${apiUrl}/blog/blogs/${id}`, {}, { withCredentials: true })
      .then((res) => {
        setLoading(false);
        setData(res.data);
        console.log('User data fetched', res);
      })
      .catch((err) => {
        console.log('Error while fetching data', err);
        setLoading(false);
      });
  };

  const viewCountAPI = () => {
    axios.post(`${apiUrl}/blog/${id}/view-count`, {}, { withCredentials: true });
  };

  useEffect(() => {
    viewCountAPI();
    fetchDetailsData();
    fetchData();
  }, []);

  const handleLike = () => {
    axios
      .post(`${apiUrl}/blog/${id}/like`, {}, { withCredentials: true })
      .then((res) => {
        fetchDetailsData();
        console.log('User liked', res);
        toast('You Liked!');
      })
      .catch((err) => {
        console.log('Error while liking', err);
      });
  };

  const handleDislike = () => {
    axios
      .post(`${apiUrl}/blog/${id}/dislike`, {}, { withCredentials: true })
      .then((res) => {
        console.log('User disliked', res);
        fetchDetailsData();
        toast('You Disliked!');
      })
      .catch((err) => {
        console.log('Error while disliking', err);
      });
  };

  return loading ? (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
      {/* Spinner */}
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
  ) : (
    <div className="flex justify-center p-4 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">
        {/* Hero Image */}
        {data?.imageURL && (
          <img
            src={data?.imageURL}
            alt={data?.title}
            className="w-full h-64 object-cover"
          />
        )}

        {/* Content Section */}
        <div className="p-6 space-y-6">
          {/* Title */}
          <h2 className="sm:text-3xl text-xl font-bold text-gray-800">{data?.title}</h2>

          {/* Interaction Buttons */}
          <div className="flex justify-items-start gap-3 items-center">
            {/* Like Button */}
            <div
              onClick={handleLike}
              className={`flex items-center space-x-2 px-5 py-[5px] rounded-2xl cursor-pointer shadow transition-all 
                ${detailsData?.userLiked ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-md'}`}
            >
              <AiOutlineLike
                className={` ${detailsData?.userLiked ? 'text-green-600' : 'text-gray-500'}`}
              />
              <span className="font-medium">{detailsData?.likes}</span>
            </div>

            {/* Dislike Button */}
            <div
              onClick={handleDislike}
              className={`flex items-center space-x-2 px-5 py-[5px] rounded-2xl cursor-pointer shadow transition-all 
                ${detailsData?.userDisliked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-md'}`}
            >
              <AiOutlineDislike
                className={` ${detailsData?.userDisliked ? 'text-red-600' : 'text-gray-500'}`}
              />
              <span className="font-medium">{detailsData?.dislikes}</span>
            </div>

            {/* Views */}
            <div className="flex items-center space-x-2 px-5 py-[5px] bg-gray-rounded-2xltext-gray-600 rounded-full shadow hover:bg-gray-200 hover:shadow-md transition-all cursor-pointer">
              <SlEye className="text-2xl text-gray-500" />
              <span className="font-medium">{detailsData?.views}</span>
            </div>
          </div>

          {/* Blog Content */}
          <div className="whitespace-pre-line">
            {data?.content}
          </div>
          {/* Author & Date */}
          <div className="text-sm text-gray-500">
            <p>Author: {data?.author?.name}</p>
            <p>Last updated: {new Date(data?.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogView;
