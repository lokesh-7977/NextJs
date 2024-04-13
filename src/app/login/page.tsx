"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const router = useRouter();

  async function onLogin(e: any) {
    e.preventDefault();

    if (!user.email || !user.password) {
      console.log('Please fill all fields');
      return;
    }

    try {
      const response : any = await axios.post("/api/users/login", user);
      console.log(response);
      router.push("/profile");
    } catch (error : any) {
      console.error(error);
    }
  }

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

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
        className="text-black"
        type="password"
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
      <button onClick={onLogin} disabled={buttonDisabled}>Login</button>
      <Link href="/signup">Visit Signup </Link>
    </div>
  );
}
