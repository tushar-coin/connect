import { useState } from "react";
import { useRouter } from "next/navigation";
import classNames from "@/Helper/classnames";

const Signup = () => {
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });
  const router = useRouter()
  const [error, setError] = useState({
    isError: false,
    message: "",
  });

  const handleSubmit = async (e) => {
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
    <div>
      <form onSubmit={handleSubmit}>
        <div className="py-1 px-1 flex justify-between">
          <label className="m-1 px-1">Email</label>
          <input
            className="m-1 px-2 border border-solid border-black rounded-md"
            placeholder="Email"
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            required
          />
        </div>
        <div className="py-1 px-1 flex justify-between">
          <label className="m-1 px-1">Username</label>
          <input
            className="m-1 px-2 border border-solid border-black rounded-md"
            placeholder="Username"
            value={user.username}
            onChange={(e) => {
              setUser({ ...user, username: e.target.value });
            }}
            required
          />
        </div>
        <div className="py-1 px-1 flex justify-between">
          <label className="m-1 px-1">Password</label>
          <input
            className="m-1 px-2 border border-solid border-black rounded-md"
            placeholder="Password"
            value={user.password}
            type="password"
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
            required
          />
        </div>
        {error.isError ? (
          <div>
            <p className="text-red-500">{error.message}</p>
          </div>
        ) : (
          <></>
        )}
        <div className="flex justify-center">
          <button
            className={classNames(
              "rounded-md",
              "ring-blue-400 focus:z-10 focus:outline-none focus:ring-2"
            )}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
