import { useState } from "react";
import { useRouter } from "next/navigation";
import BUTTON from "@/ui-components/BUTTON";

const Signup = () => {
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    repeat_password: "",
  });
  const router = useRouter();
  const [error, setError] = useState({
    isError: false,
    message: "",
  });

  const handleSubmit = async (e) => {
    if (user.password != user.repeat_password) {
      setError({
        isError: true,
        message: "Passwords do not match",
      });
      return;
    }
    e.preventDefault();
    const res = await fetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify(user),
    });
    if (res.status === 200) {
      // data should contain the token
      const data = await res.json();
      console.log(data.token);

      // redirect to verify Email page via token
      router.push("/verifyEmail/" + data.token);
    } else {
      console.log(res);
      // show error message
      setError({
        isError: true,
        message: res.message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto basis-1">
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="floating_email"
          id="floating_email"
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
          type="text"
          name="floating_username"
          id="floating_username"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          value={user.username}
          onChange={(e) => {
            e.preventDefault();
            setUser({ ...user, username: e.target.value });
          }}
        />
        <label
          htmlFor="floating_username"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Username
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="floating_password"
          id="floating_password"
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
          type="text"
          name="floating_repeat_password"
          id="floating_repeat_password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          value={user.repeat_password}
          onChange={(e) => {
            e.preventDefault();
            setUser({ ...user, repeat_password: e.target.value });
          }}
        />
        <label
          htmlFor="floating_repeat_password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Confirm Password
        </label>
      </div>
      {error.isError ? (
        <div>
          <p className="text-red-500">{error.message}</p>
        </div>
      ) : (
        <></>
      )}
      <div className="flex justify-center">
        <BUTTON type="button" text="Submit" />
      </div>
    </form>
  );
};

export default Signup;
