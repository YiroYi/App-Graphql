import { GraphQLServer } from "graphql-yoga";

const server = new GraphQLServer({
  typeDefs: `
    type Query {
      agent: User!
      agents: [User]
    }

    type User {
      id: ID!
      name: String!
      age: Int
      married: Boolean
      average: Float
    }
  `,
  resolvers: {
    Query: {
      agent() {
        return {
          id: 1,
          name: "Yiro",
          age: 34,
          married: false,
          average: 9.8,
        };
      },
      agents() {
        return [
          {
            id: 1,
            name: "Yiro",
            age: 34,
            married: false,
            average: 9.8,
          },
          {
            id: 2,
            name: "Yujin",
            age: 29,
            married: true,
            average: 9.8,
          },
        ];
      },
    },
  },
});

server.start(() => {
  console.log("running first graphql server");
});
