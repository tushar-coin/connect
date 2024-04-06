"use client";
import Header from "@/ui-components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import UserCard from "@/ui-components/UserCard";
import defaultProfilePic from "@/public/images/profileImageDefault.png";
import Post from "@/ui-components/post";

/*
required format for user object
    User = {
        id
        name
        email
        profilePic
    }
*/

const Home = () => {
  const router = useRouter();
  const [user, setUser] = useState({});
  useEffect(() => {
    axios
      .get("/api/user")
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        router.push("/auth/login");
      });

    //////
    //////
    ////// GET POSTS TO DISPLAY
    //////
    //////
  }, []);

  if (!user.profilePic) {
    user.profilePic = defaultProfilePic;
  }

  return (
    <div className="flex flex-col h-screen overflow-y-hidden">
      <div id="header" className="sticky top-0 z-10">
        <Header user={user} router={router} />
      </div>
      <div id="body" className="h-screen mx-36">
        <div className="flex flex-row justify-between h-screen sticky ">
          <div className="bg-blue-500 h-[60vh] basis-[20%] mx-8 my-20 rounded-lg">
            <UserCard user={user} />
          </div>

          <div className="basis-[55%] h-[85%] bg-slate-700 mx-auto my-5 p-5 rounded-lg overflow-y-auto">
            <Post />
            <Post />
            <Post />
            <Post />
          </div>

          <div className="bg-blue-500 basis-[25%] h-[60vh] mx-8 my-20 rounded-lg">
            3
          </div>
        </div>
      </div>
      <div id="footer"></div>
    </div>
  );
};

export default Home;
