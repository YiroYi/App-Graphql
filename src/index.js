import { GraphQLServer } from "graphql-yoga";

const server = new GraphQLServer({
  typeDefs: `
    type Query {
      id: ID!
      name: String!
      age: Int
      married: Boolean
      average: Float
    }
  `,
  resolvers: {
    Query: {
      id() {
        return 10;
      },
      name() {
        return "Yiro";
      },
      age() {
        return 34;
      },
      married() {
        return false;
      },
      average() {
        return 9.8;
      },
    },
  },
});

server.start(() => {
  console.log("running first graphql server");
});
