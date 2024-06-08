export const mutations=`
  createPost(userId:String!,email:String,content:String):String
  deletePost(userId:String,postId:String):String
  hitLiked(userId:String,postId:String):ID
  hitScam(userId:String,postId:String):ID
`