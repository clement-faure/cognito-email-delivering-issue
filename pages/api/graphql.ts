import { createServer } from "@graphql-yoga/node";
import gql from "graphql-tag";

import resolvers from "~/api/lib/resolvers";
import typeDefs from "~/api/lib/schema";

const server = createServer({
  schema: {
    typeDefs: gql(typeDefs),
    resolvers,
  },
  endpoint: "/api/graphql",
});

export default server;
