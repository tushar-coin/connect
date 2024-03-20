"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../public/images/logo.png";
import SearchBar from "./searchBar";

const Header = () => {
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0  border-b border-gray-200 dark:border-gray-600">
      <div className="flex items-center space-x-3 rtl:space-x-reverse ">
        <Link
          href="/"
          className="flex flex-row items-center space-x-3 rtl:space-x-reverse basis-1/6"
        >
          <Image width={45} src={logo} />
          <span className="text-2xl">Connect</span>
        </Link>
        <div className="basis-2/6 self-start">
          <SearchBar />
        </div>
        <div className="basis-1/2 mx-10 flex-grow">
          <ul className="flex flex-row justify-between">
            <li>Home</li>
            <li>Posts</li>
            <li>Notifications</li>
            <li>User</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
