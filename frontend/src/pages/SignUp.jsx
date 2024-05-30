import React from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
function SignUp() {
    const [name,setname]=useState('');
    const [email,setEmail]=useState('')
    const [password,setpassword]=useState('');
    const navigate=useNavigate()
    const onsubmit= async (e)=>{
        e.preventDefault()
        console.log('submitted..'+email+" "+password);
        //write backend

        console.log('submitted..'+email+" "+password);
             try {
                     const responce =await axiosInstance.post("/create-account",{
                          name:name,
                          email:email,
                          password:password
                     })
                     if(responce.data && responce.data.accessToken){
                            localStorage.setItem("token",responce.data.accessToken)
                            navigate('/todo')
                     }
             } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    toast.error(error.response.data.message);
                  } else {
                    toast.error("An unexpected error occurred");
                  }
             }
}
    const onnamechange=(e)=>{
           setname(e.target.value)
    }
    const onemailchange=(e)=>{
        setEmail(e.target.value)
}
const onpasswordchange=(e)=>{
       setpassword(e.target.value);
}
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={onsubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your name"
              value={name}
              onChange={onnamechange}
            />
          </div>
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
              onChange={onemailchange}
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
              onChange={onpasswordchange}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
