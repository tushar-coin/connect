
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BUTTON from "@/ui-components/BUTTON";
import Link from "next/link";
import axios from "axios";
import Modal from "@/ui-components/modal";

const Signup = () => {
  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    repeatPassword: "",
  });
  const [disabled, setDisabled] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (
      user.email &&
      user.password &&
      user.repeatPassword &&
      user.firstName &&
      user.lastName
    ) {
      setDisabled(false);
    }
    setError({ isError: false, message: "" });
  }, [user]);

  const [error, setError] = useState({
    isError: false,
    message: "",
  });

  ////  TODO : add email verification
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password != user.repeatPassword) {
      setError({
        isError: true,
        message: "Passwords do not match",
      });
      return;
    }
    try {
      let res = await axios.put("/api/auth/signup", {
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
        },
      });
      res = await res.data;
      if (res.success) {
        alert("Signup successful");
        router.push("/auth/login");
      } else {
        setError({
          isError: true,
          message: res.message,
        });
      }
    } catch (err) {
      setError({
        isError: true,
        message: err.response.data.message,
      });
    }
  };
  console.log(error);

  return (
    <div>
      <div className="w-[40%] mx-auto bg-slate-100 p-20 rounded-2xl m-3 pt-5 dark:bg-slate-800">
        <h1 className="text-6xl font-bold text-center mb-3">CONNECT</h1>
        <div className="p-4 bg-slate-200 mt-10 rounded-lg dark:bg-slate-700">
          <h1 className="text-3xl font-semibold text-center mb-3">Signup</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row justify-between">
              <div className="relative z-0 w-[45%] mb-5 group">
                <input
                  type="text"
                  name="floating_first"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={user.firstName}
                  onChange={(e) => {
                    e.preventDefault();
                    setUser({ ...user, firstName: e.target.value });
                  }}
                />
                <label
                  htmlFor="floating_first"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  First Name
                </label>
              </div>

              <div className="relative z-0 w-[45%] mb-5 group">
                <input
                  type="text"
                  name="floating_last"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={user.lastName}
                  onChange={(e) => {
                    e.preventDefault();
                    setUser({ ...user, lastName: e.target.value });
                  }}
                />
                <label
                  htmlFor="floating_last"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Last Name
                </label>
              </div>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
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

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="floating_repeat"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={user.repeatPassword}
                onChange={(e) => {
                  e.preventDefault();
                  setUser({ ...user, repeatPassword: e.target.value });
                }}
              />
              <label
                htmlFor="floating_repeat"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Confirm Password
              </label>
            </div>
            <div className="flex justify-center">
              {disabled ? (
                <BUTTON text="Signup" type="button" disabled />
              ) : (
                <BUTTON text="Signup" type="submit" />
              )}
            </div>
            <div className="flex justify-center p-4">
              <span>
                Already a user?{" "}
                <Link
                  href="/auth/login"
                  className="text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-200 dark:hover:text-blue-300"
                >
                  Login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
      <Modal
        isOpen={error.isError}
        onClose={() => {
          setError({ ...error, isError: false });
        }}
      >
        {error.message}
      </Modal>
    </div>
  );
};

export default Signup;
