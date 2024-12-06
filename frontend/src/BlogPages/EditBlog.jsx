import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false)
    const [imageURL, setImageURL] = useState("")
    const apiUrl = import.meta.env.VITE_API_URL;

    const { id } = useParams();

    const fetchData = () => {
        axios.get(`${apiUrl}/blog/blogs/${id}`, {}, { withCredentials: true })
            .then((res) => {
                setTitle(res.data.title)
                setContent(res.data.content)
                setImageURL(res.data.imageURL)
                console.log("User data fetched", res);
            })
            .catch((err) => {
                console.log("Error while fetch data", err)
            })
    }

    useEffect(() => {
        fetchData();
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`${apiUrl}/blog/update-post/${id}`, { title, content,imageURL }, { withCredentials: true })
            .then((res) => {
                setLoading(false)
                console.log("Blog Submit", res);
                toast("Post updated.")
                setContent('')
                setTitle('')
                setImageURL('')
            })
            .catch((err) => {
                console.log("Error while update data", err)
                setLoading(false)
                toast("Something went Wrong")
            })

        console.log({ title, content ,imageURL});
    };

    return (
        <div className="max-w-3xl mx-auto mt-2 p-6">
            <h2 className="text-2xl font-bold mb-4">Create Blog Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="title"
                        type="text"
                        placeholder="Post Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Image Url
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="ImageURL"
                        type="text"
                        placeholder="Paste the image URL"
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                        Content
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="content"
                        rows="5"
                        placeholder="Post Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        disabled={loading}
                        className="bg-blue-500 disabled:opacity-70 disabled:cursor-wait hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditBlog