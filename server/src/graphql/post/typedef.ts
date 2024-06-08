export const typeDefs=`
type Post{
    id:ID!
    content:String!
    email:String
    likesCounter:[String]
    spamCounter:[String]
    creator:String
}
`