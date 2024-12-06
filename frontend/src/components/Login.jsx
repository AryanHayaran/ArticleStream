import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from './context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const apiUrl = import.meta.env.VITE_API_URL;


    const navigate = useNavigate()

    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext)

    if (isAuthenticated) return <Navigate to="/profile" />

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            email: email,
            password: password
        }

        axios.post(`${apiUrl}/user/login`, payload, { withCredentials: true })
            .then((res) => {
                setIsAuthenticated(true)
                setLoading(false)
                toast("Login Successful");
                console.log("Login done", res);
                localStorage.setItem('token', JSON.stringify(res.data.token))
                navigate("/profile")
            })
            .catch((err) => {
                toast("Invalid Credencial");
                console.log("Error while login", err)
                setLoading(false)
            })
    };

    return (
<div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-lg" style={{ minHeight: '450px' }}>
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit}>
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
                {loading ? 'Submitting...' : "Login"}
            </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-600">
            Don’t have an account? <a href="/register" className="text-indigo-600 hover:underline">Signup</a>
        </p>
    </div>
</div>



    );
};

export default Login;
