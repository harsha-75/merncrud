import React, { useEffect } from 'react'
import axiosInstance from '../utils/axiosInstance';
import { useState } from 'react';
function TodoHeader() {
    const [name,setname]=useState('');
    const getuserinfo =async ()=>{
           const responce = await axiosInstance.get("/getuser")
           if(responce.data &&responce.data.user)
            {
                  setname(responce.data.user.name);
            }
    }
    useEffect(()=>{
        getuserinfo()
        return ()=>{}
    },[])
  return (
    <div className="text-center my-4 py-2">
      <h1 className="text-3xl font-bold">Welcome, {name}!</h1>
    </div>

  )
}

export default TodoHeader
