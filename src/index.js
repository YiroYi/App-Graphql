import { GraphQLServer } from "graphql-yoga";
import axios from "axios";

const db = 'http://localhost:3004'

const server = new GraphQLServer({
  typeDefs: `
    type Query {
      agent(id:ID!): User!
      agents(name:String, age:Int): [User!]!
      cars: [String]
      msg(values: [String!]): String
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
      agent: async (parent, args, context, info) => {
        const response = await axios.get(`${db}/users/${args.id}`);
        return response.data;
      },
      agents: async (parents, args, context, info) => {
        const name = args.name != null ? `name=${args.name}` : '';
        const age = args.age != null ? `age=${args.age}` : '';


        const response = await axios.get(`${db}/users?${name}&${age}`);
        return response.data;
      },
      cars: () => {
        return ['Honda', 'Mazda', null]
      },
      msg: (parent, args, context, info) => {
        if(args.values.length === 0){
          return 'No values'
        }
        return `hello ${args.values[0]} ${args.values[1]}`
      }
    },
  },
});

server.start(() => {
  console.log("running first graphql server");
});
