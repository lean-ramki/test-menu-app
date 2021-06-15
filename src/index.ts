/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import { itemsRouter } from "./items/items.router";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";

import { ApolloServer } from "apollo-server-express";
// import typeDefs from "./schema";


dotenv.config();

/**
 * App Variables
 */

//graphql server

//types query/mutation/subscription
const typeDefs = `
    type Query {
        totalPosts: Int!
    }
`;

//resolvers
const resolvers = {
  Query: {
    totalPosts: () => 42,
  },
};


const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});



if (!process.env.PORT) {
  console.error('env.PORT not specified. exiting.');
   process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */

 apolloServer.applyMiddleware({ app });

 app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain')
  res.send('Hello World!')
})

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/menu/items", itemsRouter);
app.use(errorHandler);
app.use(notFoundHandler);


/**
 * Server Activation
 */

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
