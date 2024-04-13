"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";

export default function ProfilePage({params} : any) {
  const router = useRouter();
  const [data,setData] = useState('')

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  }

  const getUserDetails = async () => {
    try{
      const response = await axios.get("/api/users/profile");
      console.log(response.data);
      setData(response.data.data ? response.data.data._id : '');
    }
    catch (error){
      console.error(error);
    }
  }
  
  
  return (
    <div className="bg-black text-white">
      <h1>Profile</h1>
      <h2 className="text-yellow">{data == ''? 'data' : <Link className="text-white" href={`/profile/${data}`}>{data}</Link>}</h2>
      <p>Welcome to your profile page</p>

      <button onClick={logout}>Logout</button>
      <button onClick={getUserDetails}>Get User Details</button>
    </div>
  );
}