export const queries=`
 getPost(postId:String):Post
 getPosts(email:String,userId:String):[Post]
 getWhoLiked(postId:String):[Post]
 getWhoMarkedScam(postId:String):[User]
`