"use client";
import Header from "@/Components/header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import UserCard from "@/Components/UserCard";
import defaultProfilePic from "@/public/images/profileImageDefault.png";
import Post from "@/Components/post";
import { useLazyQuery, useQuery, gql } from "@apollo/client";
import CreatePost from "@/Components/createPost";

/*
required format for user object
    User = {
        id
        name
        email
        profilePic
    }
*/
const GETUSER = gql`
  query ExampleQuery($email: String!) {
    getUser(email: $email) {
      email
      firstName
      lastName
      id
    }
  }
`;

const GETPOSTS = gql`
  query GetPosts {
    getPosts {
      content
      creator
      id
    }
  }
`;

const Home = () => {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  const [getData, { loading, error, data }] = useLazyQuery(GETUSER, {
    variables: { email: "manavdandiwal1111@gmail.com" }, // Provide values for the parameters here
  });

  const [getPosts, { l, e, postData }] = useLazyQuery(GETPOSTS);

  useEffect(() => {
    getData();
  }, [getData, getPosts]);

  useEffect(() => {
    if (data && data.getUser) {
      setUser(data.getUser[0]);
      if (!user.profilePic) {
        setUser((user) => ({ ...user, profilePic: defaultProfilePic }));
        // user.profilePic = defaultProfilePic;
      }
    }
  }, [data]);

  // useEffect(() => {
  //   if (postData) {
  //     console.log(postData);
  //   }
  // }, [postData]);
  // setUser(data);

  const handleRefresh = async () => {
    const res = await getPosts();
    console.log(res);
    console.log(e);
    console.log(l);
    console.log(res.data.getPosts);
    setPosts(res.data.getPosts);
  };

  if (loading || l) return <p>Loading...</p>;
  if (error || e) return <p>Error :(</p>;

  // setUser(data.getUser[0]);

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
            <span onClick={handleRefresh}>REFRESH</span>
            <CreatePost user={user} />
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
