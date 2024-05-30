import React from 'react'
import { useNavigate } from 'react-router-dom';
function Logout() {
    const navigate = useNavigate();
    const handleLogout = () => {
        // Clear local storage or perform any other logout actions
        localStorage.removeItem('token');
        // Redirect to login page
        navigate('/signin');
    };
  return (
    <button
    onClick={handleLogout}
    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
>
    Logout
</button>
  )
}

export default Logout
