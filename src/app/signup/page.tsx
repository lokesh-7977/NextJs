"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios  from "axios";

export default function SignupPage() {
  const [user, setUser] = useState({ username: "", email: "", password: "" });

  const onSignUp = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/signup", user);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="">
      <h1 className="text-center">Signup</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        type="text"
        id="username"
        value={user.username}
        onChange={(e) =>
          setUser({
            ...user,
            username: e.target.value,
          })
        }
        placeholder="username"
      />
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
      <button onClick={onSignUp} >Sign up</button>
      <Link href ='/login'>Visit Login</Link>
    </div>
  );
}
