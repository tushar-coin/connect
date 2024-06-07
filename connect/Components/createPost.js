import { useState } from "react";
import BUTTON from "./BUTTON";
import { useMutation, gql } from "@apollo/client";

// props will contain userData
/*
user = {
    firstName,
    lastName,
    email,
    profilePic,
    id
}
*/
const CREATEPOST = gql`
  mutation Mutation($userId: String!, $email: String, $content: String) {
    createPost(userId: $userId, email: $email, content: $content)
  }
`;

const CreatePost = ({ user }) => {
  const [createPost, { loading, error }] = useMutation(CREATEPOST);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createPost({
        variables: {
          userId: user.id,
          email: user.email,
          content,
        },
      });
      alert("POST CREATED");
      setContent("");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  const [content, setContent] = useState("");

  if (loading) {
    alert("loading");
  }

  if (error) {
    alert(error);
  }

  return (
    <div className="border rounded-md p-4 mb-4">
      {/* <h1>WRITE POST</h1> */}
      <div>
        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            className="flex-1 bg-inherit w-[100%] overflow-y-scroll resize-y"
            onChange={(e) => {
              e.preventDefault();
              setContent(e.target.value);
            }}
            placeholder="Write a Post"
          />
          <BUTTON text="Create" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
