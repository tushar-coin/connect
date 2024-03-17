const express=require('express');

const {ApolloServer}=require('@apollo/server');

const {expressMiddleware}=require('@apollo/server/express4');

const bodyParser=require('body-parser');

const cors=require('cors');

const axios =require('axios')

async function startServer (){
  try{
    const app=express();

    const server=new ApolloServer({
      typeDefs:`
        
        type Todo{
           id: ID!,
           title: String !
        }

        type Query {
           getTodos : [Todo]
        }
      `,
      resolvers:{
        Query:{
          getTodos: async ()=> 
          {
          return (await axios.get('https://jsonplaceholder.typicode.com/todos')).data
          },
        },
      }
    });

    app.use(bodyParser.json());

    app.use(cors());

    await server.start();

    app.use("/graphql",expressMiddleware(server));
    app.listen(8000,()=>{
    console.log("started server")});
  }
  catch(e){
    console.log(e);

  }
}
startServer();