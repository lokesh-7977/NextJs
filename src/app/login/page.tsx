"use client";
import React, {useEffect , useState} from 'react';
import Link from 'next/link'
import axios from 'axios';

export default function LoginPage() {
  const [user, setUser] = useState({ email: "", password: "" });

  async function onLogin(e : any)  {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", user);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col w-50% text-white bg-black text-center">
      <h1 className="text-center">Login</h1>
      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        value={user.email}
        onChange={(e) =>
          setUser({
            ...user,
            email: e.target.value,
          })
        }
        placeholder="email"
      />

      <label htmlFor="password">Password</label>
      <input
        type="text"
        id="password"
        value={user.password}
        onChange={(e) =>
          setUser({
            ...user,
            password: e.target.value,
          })
        }
        placeholder="password"
      />
      <button onClick={onLogin} >Login</button>
      <Link href ='/signup'>Visit Signup </Link>
    </div>

  );
}
