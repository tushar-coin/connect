const Post = (props) => {
  const postData = {
    user: "SOME USER",
    content: "This is my post",
    likedByMe: false,
    likeCounter: 10,
  };
  return (
    <div>
      <div>
        <span>{postData.user}</span>
      </div>
      <div>
        <span>{postData.content}</span>
      </div>
      <div>
        <div>
          <span>Like button</span>
          <span>{postData.likeCounter}</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
