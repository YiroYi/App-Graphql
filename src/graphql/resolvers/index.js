import axios from "axios";
const db = "http://localhost:3004";

const Query = {
  agent: async (parent, args, context, info) => {
    const response = await axios.get(`${db}/users/${args.id}`);
    return response.data;
  },
  agents: async (parents, args, context, info) => {
    const name = args.name != null ? `name=${args.name}` : "";
    const age = args.age != null ? `age=${args.age}` : "";

    const response = await axios.get(`${db}/users?${name}&${age}`);
    return response.data;
  },
  posts: async (parent, args, context, info) => {
    const response = await axios.get(`${db}/posts`);
    return response.data;
  },
  post: async (parent, args, context, info) => {
    const response = await axios.get(`${db}/posts/${args.id}`);
    return response.data;
  },
  pictures: async (parent, args, context, info) => {
    const response = await axios.get(`${db}/pictures`);
    return response.data;
  },
};

const Mutation = {
  createAgent: async (parent, args, context, info) => {
    const response = await axios.post(`${db}/users`, {
      name: args.data.name,
      age: args.data.age,
      married: args.data.married,
      average: 0,
      status: args.data.status,
    });

    return response.data;
  },
  createPost: async (parent, args, context, info) => {
    const response = await axios.post(`${db}/posts`, {
      title: args.title,
      content: args.content,
      author: 1,
      picture: 1,
      status: args.status,
    });

    return response.data;
  },
  deletePost: async (parent, args, context, info) => {
    const response = await axios.delete(`${db}/posts/${args.id}`);

    if (Object.keys(response.data).length === 0) {
      return true;
    }
    return false;
  },
  deleteAgent: async (parent, args, context, info) => {
    const response = await axios.delete(`${db}/users/${args.id}`);

    if (Object.keys(response.data).length === 0) {
      return true;
    }

    return false;
  },
  updateAgent: async (parent, args, context, info) => {
    const data = {};

    if (args.data.name !== undefined) {
      data.name = args.data.name;
    }
    if (args.data.age !== undefined) {
      data.age = args.data.age;
    }
    if (args.data.married !== undefined) {
      data.married = args.data.married;
    }
    if (args.data.average !== undefined) {
      data.average = args.data.average;
    }
    if (args.data.status !== undefined) {
      data.status = args.data.status;
    }
    const response = await axios.patch(`${db}/users/${args.id}`, data);

    return response.data;
  },
};

const Post = {
  author: async (parent, args, context, info) => {
    const response = await axios.get(`${db}/users/${parent.author}`);
    return response.data;
  },
  picture: async (parent, args, context, info) => {
    const response = await axios.get(`${db}/pictures/${parent.picture}`);
    return response.data;
  },
};

const User = {
  posts: async (parent, args, context, info) => {
    const response = await axios.get(`${db}/posts?author=${parent.id}`);
    return response.data;
  },
  pictures: async (parent, args, context, info) => {
    const response = await axios.get(`${db}/pictures?author=${parent.id}`);
    return response.data;
  },
};

const Picture = {
  author: async (parent, args, context, info) => {
    const response = await axios.get(`${db}/users/${parent.author}`);
    return response.data;
  },
  post: async (parent, args, context, info) => {
    const response = await axios.get(`${db}/posts/${parent.post}`);
    return response.data;
  },
};

export { Query, Post, User, Picture, Mutation };
