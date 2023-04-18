import { ApolloClient, InMemoryCache } from "@apollo/client";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const httpLink = new HttpLink({
  uri: "https://polite-dodo-24.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret":
      "kYuVlLoakVX1QTi8bdQt1KZOmMeDx4BVXLP91ivjQcZ9x08DIYM87rq2QAdTJRLc",
  },
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "wss://polite-dodo-24.hasura.app/v1/graphql",
    connectionParams: {
      headers: {
        "x-hasura-admin-secret":
          "kYuVlLoakVX1QTi8bdQt1KZOmMeDx4BVXLP91ivjQcZ9x08DIYM87rq2QAdTJRLc",
      },
    },
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
