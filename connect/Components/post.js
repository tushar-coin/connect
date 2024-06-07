import Image from "next/image";
import defaultProfilePic from "@/public/images/rajan.png";
import { useState } from "react";

const Post = (props) => {
  const [likedByMe, setLikedByMe] = useState(false);
  const [likeCounter, setLikeCounter] = useState(10);

  const handleLikeClick = () => {
    if (likedByMe) {
      setLikeCounter((prevCount) => prevCount - 1);
    } else {
      setLikeCounter((prevCount) => prevCount + 1);
    }
    setLikedByMe((prevLiked) => !prevLiked);
  };

  const postData = {
    user: "Tushar Bairi",
    content:
      "Recently i got joined to CVENT tech gaint. It is a great platform for learning and growing. New people, New Journey, everything is making me overwhelming.",
    likedByMe: likedByMe,
    likeCounter: likeCounter,
    commentCount: 5, // Assuming a hardcoded value for comment count
    profilePic: "", // Replace with actual URL
    // timestamp: "2024-04-01T09:00:00Z", // Replace with actual timestamp
  };

  // const timeDifference = moment.duration(
  //   moment().diff(moment(postData.timestamp))
  // );
  // let timeAgo = "";
  // if (timeDifference.asHours() < 1) {
  //   timeAgo = `${Math.floor(timeDifference.asMinutes())} minutes ago`;
  // } else {
  //   timeAgo = `${Math.floor(timeDifference.asHours())} hours ago`;
  // }
  return (
    <div className="border rounded-md p-4 mb-4">
      {/* Profile Picture */}
      <Image
        src={postData.profilePic || defaultProfilePic}
        alt="Profile Picture"
        className="w-10 h-10 rounded-full mr-2"
      />

      {/* Post Content */}
      <div className="flex flex-col">
        {/* User and Timestamp */}
        <div className="flex items-center mb-2">
          <span className="font-bold mr-2">{postData.user}</span>
          {/* <span className="text-gray-500 text-sm">{timeAgo}</span> */}
        </div>
        {/* Content */}
        <div className="mb-2">{postData.content}</div>

        {/* Like Button and Counter */}
        <div className="flex items-center mb-2">
          <button className={`mr-2 "text-gray-500}`} onClick={handleLikeClick}>
            {likedByMe ? "Unlike" : "Like"}
          </button>
          <span>{postData.likeCounter}</span>
        </div>

        {/* Comment Button and Count */}
        <div className="flex items-center">
          <button className="mr-2 text-gray-500">Comment</button>
          <span>{postData.commentCount} Comments</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
