"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BUTTON from "@/ui-components/BUTTON";
import Modal from "@/ui-components/modal";
import Link from "next/link";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const [error, setError] = useState({
    isError: false,
    message: "",
  });
  const [message, setMessage] = useState({
    show: false,
    message: "",
  });

  useEffect(() => {
    try {
      axios.post("/api/auth/login", { user }).then((res) => {
        const data = res.data;
        console.log("DATA : " + data);
        if (data.success) {
          router.push("/");
        } else {
          setError({ isError: true, message: data.message });
        }
      });
    } catch (err) {
      setError({
        isError: true,
        message: err.response.data.message,
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", { user });
      const data = res.data;
      console.log("DATA : " + data);
      if (data.success) {
        router.push("/");
      } else {
        setError({ isError: true, message: data.message });
      }
    } catch (err) {
      console.log(err);
      setMessage({
        show: true,
        message: "Login Successful, routing to home page",
      });
      setError({
        isError: true,
        message: err.response.data.message,
      });
    }
  };

  return (
    <div>
      <div className="w-[40%] mx-auto bg-slate-100 p-20 rounded-2xl m-3 pt-5 dark:bg-slate-800">
        <h1 className="text-6xl font-bold text-center mb-3">CONNECT</h1>
        <div className="p-4 bg-slate-200 mt-10 rounded-lg dark:bg-slate-700">
          <h1 className="text-3xl font-semibold text-center mb-3">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={user.email}
                onChange={(e) => {
                  e.preventDefault();
                  setUser({ ...user, email: e.target.value });
                }}
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="floating_password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={user.password}
                onChange={(e) => {
                  e.preventDefault();
                  setUser({ ...user, password: e.target.value });
                }}
              />
              <label
                htmlFor="floating_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
            </div>

            <div>
              {error.isError ? (
                <span className="text-red-600 text-sm">{error.message}</span>
              ) : (
                <></>
              )}
            </div>

            <div className="flex justify-center">
              <BUTTON text="Login" type="submit" />
            </div>
            <div className="flex justify-center p-4">
              <span>
                Not a user?{" "}
                <Link
                  href="/auth/signup"
                  className="text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-200 dark:hover:text-blue-300"
                >
                  Signup
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
      {/* <Modal
        isOpen={error.isError}
        onClose={() => {
          setError({ ...error, isError: false });
        }}
      >
        {error.message}
      </Modal> */}
    </div>
  );
};

export default Login;
