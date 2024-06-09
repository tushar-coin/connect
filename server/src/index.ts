import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import createApolloGraphqlServer from "./graphql";

async function run() {
  const app = express();
  app.use(cors())
  app.use(express.json());
  app.use(bodyParser.json());
  app.use("/graphql", expressMiddleware(await createApolloGraphqlServer()));
  app.listen(4000, () => {
    console.log("running");
  });
}
run();
