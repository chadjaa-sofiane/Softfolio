require("dotenv").config();
import { ApolloServer, PubSub } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import typeDefs from "./graphql/typeDefs";
import cors from "cors";
import { join } from "path";
import resolvers from "./graphql/resolvers";
const app = express();

mongoose
  .connect(
    `mongodb+srv://${process.env.user_name}:${process.env.password}@cluster0.d12nl.mongodb.net/${process.env.db_name}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("Connexion à MongoDB réussie 🕢!"))
  .catch(() => console.log("Connexion à MongoDB échouée 🌛!"));

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

app.use(express.static(join(__dirname, "public")));
app.use(cors("*"));
server.applyMiddleware({ app });

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`surver running at ${port} ✔`));
