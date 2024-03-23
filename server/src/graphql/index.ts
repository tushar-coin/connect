import { ApolloServer } from "@apollo/server";
import {User} from "./user/index"
import {Post} from "./post"
async function createApolloGraphqlServer(){
    const server=new ApolloServer({
        typeDefs:`
        ${User.typeDefs}
        ${Post.typeDefs}
         type Query{
            ${User.queries}
            ${Post.queries}
         } 
         type Mutation{
            ${User.mutations}
            ${Post.mutations}
         }
        `,
        resolvers:{
            Query:{
                ...User.resolvers.queries,
                ...Post.resolvers.queries
            },
            Mutation:{
                ...User.resolvers.mutations,
                ...Post.resolvers.mutations
            }
        }
    });
    await server.start();

    return server;
}
export default createApolloGraphqlServer;