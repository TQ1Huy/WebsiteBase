"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("dang ky thanh cong:", response.data);
      // Your signup logic here
      router.push("/login");
    }  catch (error: any) {
  console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-center text-2xl text-dark">{loading ? "Loading..." : "Sign Up"}</h1>
      <hr/>
      <label htmlFor="username">Username</label>
      <input className="border border-gray-300 rounded-md p-2 w-full mb-4"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Username" />
        <label htmlFor="email">Email</label>
      <input className="border border-gray-300 rounded-md p-2 w-full mb-4"
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email" />
        <label htmlFor="password">Password</label>
      <input className="border border-gray-300 rounded-md p-2 w-full mb-4"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password" />
      <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        onClick={onSignup}>
        {buttonDisabled ? "Dien du thong tin" : "Dang ky"}  
      </button>
      <Link href="/login">Đến trang đăng nhập</Link>
    </div>
  );
}