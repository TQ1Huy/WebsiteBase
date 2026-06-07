"use client";
import Link from "next/link";
import React, { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const onLogin  = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("dang nhap thanh cong:", response.data);
      toast.success(response.data.message || "Dang nhap thanh cong");
      router.push("/profile");
    } catch (error : any) {
      console.log("dang nhap that bai:", error.response.data);
      toast.error(error.response.data.message || "Dang nhap that bai");
    } finally {
      setLoading(false);  
    }
  };
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-center text-2xl text-dark">{loading ? "dang chay..." : "dang nhap"}</h1>
      <hr/>
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
        onClick={onLogin}>
        Login here  
      </button>
      <Link href="/signup">Đến trang đăng ký</Link>
    </div>
  );
}