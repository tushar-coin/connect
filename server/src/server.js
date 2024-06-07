const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
// const axios = require("axios");
var bcrypt = require("bcryptjs");

async function startServer() {
  try {
    const app = express();

    const server = new ApolloServer({
      typeDefs: `
        
        type Todo{
           id: ID!,
           title: String !
        }

        type Query {
           getTodos : [Todo]
        }
      `,
      resolvers: {
        Query: {
          getTodos: async () => {
            return (
              await axios.get("https://jsonplaceholder.typicode.com/todos")
            ).data;
          },
        },
      },
    });

    app.use(bodyParser.json());
    app.use(cors());
    await server.start();

    app.use("/graphql", expressMiddleware(server));

    app.post("/auth/signup", (req, res) => {
      /*
      req.body.user = {
        username: "test",
        email: "<EMAIL>",
        password: "<PASSWORD>",
      }
       */
      // check if this username or email is repeated
      // todo: if user exists return error

      console.log(req.body);
      const user = req.body.user;
      const { username, email, password } = user;
      const salt = bcrypt.getSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;
          console.log(hash);
        });
      });

      // save user

      res.json({ message: "GOT DATA" });
    });
    app.listen(8000, () => {
      console.log("started server");
    });
  } catch (e) {
    console.log(e);
  }
}
startServer();
