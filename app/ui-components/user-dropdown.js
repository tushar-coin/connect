"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const UserDropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  let User = {};
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // todo : get token from local memory
    // const token = localStorage.getItem("token");
    // const res = await fetch(`/getUserData/${token}`);
    // const data = await res.json();
    // User = data.user;
    /*
    required format for user object
    User = {
        id
        name
        email
        profilePic
    }
     */
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { user } = props;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center text-sm focus:outline-none"
      >
        <Image src={User.profilePic} width={45} alt="User" />
      </button>
      {isOpen ? (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 dark:bg-gray-700">
          <div className="block px-4 py-2 text-sm text-gray-700 border-b-4 dark:text-slate-200 cursor-default">
            {`${user.firstName} ${user.lastName}`}
            <p>{`${user.email}`}</p>
          </div>
          <Link
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-slate-200 hover:dark:text-slate-100"
          >
            Profile
          </Link>
          <Link
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-slate-200 hover:dark:text-slate-100"
          >
            Settings
          </Link>
          <Link
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:rounded-lg dark:hover:bg-gray-600 dark:text-slate-200 hover:dark:text-slate-100"
          >
            Sign out
          </Link>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserDropdown;
