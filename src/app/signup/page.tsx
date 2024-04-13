"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onSignUp = async (e: any) => {
    e.preventDefault();
    try {
      const response : any = await axios.post("/api/users/signup", user);
      console.log(response);
      toast.success( "Success",response.data.message ,);
      router.push("/login");
    } catch (error : any) {
      console.error(error);
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    if (
      user.username.length > 2 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

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
      <button onClick={onSignUp}>
        {buttonDisabled ? "You Cant SignUp" : "SignUp"}
      </button>
      <Link href="/login">Visit Login</Link>
    </div>
  );
}
