import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageURL, setimageURL] = useState('');
    const [loading, setLoading] = useState(false)
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${apiUrl}/blog/create-post`, { title, content,imageURL }, { withCredentials: true })
            .then((res) => {
                setLoading(false)
                console.log("Blog Submit", res);
                toast("Post Created.")
                setContent('')
                setTitle('')
                setimageURL('')
            })
            .catch((err) => {
                console.log("Error while fetch data", err)
                setLoading(false)
                toast("Something went Wrong")
            })

        console.log({ title, content,imageURL });
    };

    return (
<div className="max-w-3xl mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg">
    <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Create Blog Post</h2>
    <form onSubmit={handleSubmit}>
        <div className="mb-6">
            <label
                className="block text-gray-600 text-lg font-semibold mb-2"
                htmlFor="title"
            >
                Title
            </label>
            <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                id="title"
                type="text"
                placeholder="Enter your post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
        </div>
        <div className="mb-6">
            <label
                className="block text-gray-600 text-lg font-semibold mb-2"
                htmlFor="imageURL"
            >
                Image URL
            </label>
            <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                id="imageURL"
                type="text"
                placeholder="Paste the image URL"
                value={imageURL}
                onChange={(e) => setimageURL(e.target.value)}
                required
            />
        </div>
        <div className="mb-6">
            <label
                className="block text-gray-600 text-lg font-semibold mb-2"
                htmlFor="content"
            >
                Content
            </label>
            <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                id="content"
                rows="6"
                placeholder="Write your post content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            ></textarea>
        </div>
        <div className="flex justify-center">
            <button
                disabled={loading}
                className="bg-gradient-to-r from-blue-500 to-purple-600 disabled:opacity-70 disabled:cursor-wait text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="submit"
            >
                Submit
            </button>
        </div>
    </form>
</div>

    );
};

export default CreateBlog