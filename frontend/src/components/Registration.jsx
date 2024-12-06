import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

function Registration() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('')
    const [loading, setLoading] = useState(false)
    const apiUrl = import.meta.env.VITE_API_URL;

    // const notify = () => toast("Registration Successful");

    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault();

        const payload = {
            name: userName,
            email: email,
            password: password
        }

        axios.post(`${apiUrl}/user/register`, payload)
            .then((res) => {
                setLoading(false)
                toast("Registration Successful");
                console.log("User register", res);
            })
            .catch((err) => {
                toast("Registration Failed");
                console.log("Error while reiteration", err)
                setLoading(false)
            })

    };

    return (
<div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-lg" style={{ minHeight: '450px' }}>
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Sign Up</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-5">
                <label htmlFor="userName" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    id="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 sm:text-base"
                    placeholder="Enter your name"
                />
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 sm:text-base"
                    placeholder="Enter your email"
                />
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 sm:text-base"
                    placeholder="Enter your password"
                />
            </div>
            <button
                disabled={loading}
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-60 transition-all duration-300"
            >
                {loading ? 'Submitting...' : "Sign Up"}
            </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account? <a href="/login" className="text-indigo-600 hover:underline">Login</a>
        </p>
    </div>
</div>

    )
}

export default Registration