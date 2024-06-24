// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against

const User = require("../models/User");

// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type User {
    _id: String
    name: String
    username: String!
    email: String!
    password: String!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  
  # Read Operation
  type Query {
    getUserById(id:String): User
    searchUser(name:String): User
  }

  # Write Operation
  type Mutation {
    # Argument yang pengen dikirim
    register(username:String, email:String, password:String): User
    login(username:String, password:String): User
  }
`;

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    getUserById: (_, args) => {
      const { id } = args;
      const foundUser = User.getById(id);
      return foundUser;
    },
    searchUser: (_, args) => {
      const { name } = args;
      const foundedBook = books.find((el) => el.title == title);
      return foundedBook;
    },
  },
  Mutation: {
    register: async (_, args) => {
      const newUser = { ...args };
      await User.create(newUser);
      return newUser;
    },
    login: async (_, args) => {
      const newUser = { ...args };
      await User.create(newUser);
      return newUser;
    },
  },
};

module.exports = { typeDefs, resolvers };
