import { config } from "dotenv";
import { createServer } from "node:http";
import { resolve } from "node:path";
import { createYoga } from "graphql-yoga";
import { createContext } from "./context.js";
import { schema } from "./schema/index.js";

config({ path: resolve(import.meta.dirname, "../../../.env") });

const port = Number(process.env.PORT ?? 4000);

const yoga = createYoga({
  schema,
  context: createContext,
  graphiql: true,
});

const server = createServer(yoga);

server.listen(port, () => {
  console.log(`GraphQL API ready at http://localhost:${port}/graphql`);
});
