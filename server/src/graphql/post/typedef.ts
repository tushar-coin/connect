export const typeDefs=`
type Post{
    id:ID!
    content:String!
    likesCounter:[String]
    spamCounter:[String]
    creator:String
}
`