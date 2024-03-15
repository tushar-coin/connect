const express=require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const app=express();
const Port=4000;
const typeDefs = gql`
  type Query {
    hello: String
  }
`;
const resolvers = {
    Query: {
      hello: () => 'Hello world!',
    },
  };
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.get('/',(req,res)=>{
    res.send("hello");
})
app.listen(4000,()=>{
    console.log(`server running on ${Port}`)
})

