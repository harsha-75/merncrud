import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post("/login", {
                email: email,
                password: password
            });
            if (response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                navigate('/todo');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An unexpected error occurred");
            }
        }
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-center">Welcome to TodoList App</h1>
            <p className="mb-4 text-center">Please sign in for your todos</p>
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
                <div className="flex items-center justify-center mt-4">
                    <p className="text-gray-600 mr-2">Don't have an account?</p>
                    <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
