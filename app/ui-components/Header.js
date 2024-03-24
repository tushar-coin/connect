"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../public/images/logo.png";
import SearchBar from "./searchBar";
import UserDropdown from "./user-dropdown";

const Header = (props) => {
  const { user } = props;
  return (
    <nav className="bg-white dark:bg-gray-800 w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="basis-[15%]">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image src={logo} alt="Flowbite Logo" width={50} height={80} />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Connect
            </span>
          </a>
        </div>

        <div className="basis-[29%]">
          <SearchBar />
        </div>

        <div className="basis-[38%]">
          <ul className="flex flex-row justify-between items-center">
            <li>
              <Link href="/">
                <span className="text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300">
                  Home
                </span>
              </Link>
            </li>
            <li>
              <Link href="/">
                <span className="text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300">
                  Network
                </span>
              </Link>
            </li>
            <li>
              <Link href="/">
                <span className="text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300">
                  Messages
                </span>
              </Link>
            </li>
            <li>
              <Link href="/">
                <span className="text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300">
                  Notification
                </span>
              </Link>
            </li>
            <li>
              <span className="text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300">
                <UserDropdown user={user} router={props.router} />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
