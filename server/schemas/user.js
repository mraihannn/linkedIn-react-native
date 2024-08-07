// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against

const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
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
    following: [Following]
    followingDetail: [FollowingDetail]
    follower: [Following]
    followerDetail: [FollowingDetail]
  }

  type Following {
    _id: String
    followingId: String
    followerId: String
    createdAt: String
    updatedAt: String
  }
  type FollowingDetail {
    _id: String
    name: String
    username: String
    email: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  
  # Read Operation
  type Query {
    getUserById(id:String): User
    searchUser(username:String): [User]
  }

  input newUser {
    name:String
    username:String
    email:String
    password:String
  }

  type AccessToken {
    accessToken: String
    userId: String
    username: String
  }

  # Write Operation
  type Mutation {
    # Argument yang pengen dikirim
    register(user:newUser): User
    login(email:String, password:String): AccessToken
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    getUserById: async (_, args, contextValue) => {
      contextValue.auth();
      const { id } = args;
      if (!id) throw new Error("Id User is required");
      const foundUser = await User.getById(id);
      return foundUser;
    },
    searchUser: async (_, args) => {
      const { username } = args;
      const foundUser = await User.getByName(username);
      return foundUser;
    },
  },
  Mutation: {
    register: async (_, args) => {
      const { name, username, email, password } = args.user;
      if (!username) {
        throw new Error("Username is required");
      }
      const checkUsername = await User.getByName(username);
      if (checkUsername.length) throw new Error("Username already exist");

      if (!email) {
        throw new Error("Email is required");
      }

      const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
      if (!emailRegex.test(email)) {
        throw new Error("Invalid email format");
      }

      const checkEmail = await User.findByEmail(email);
      if (checkEmail) throw new Error("Email already exist");

      if (!password) {
        throw new Error("Password is required");
      }
      if (password.length < 5)
        throw new Error("Minimum password is 5 character");

      const newUser = { ...args.user };
      await User.create(newUser);
      return newUser;
    },

    login: async (_, args) => {
      const { email, password } = args;
      if (!email) throw new Error("Email is required");
      if (!password) throw new Error("Password is required");
      const user = await User.findByEmail(email);
      if (!user) throw new Error("User Not Found");
      if (!comparePassword(password, user.password))
        throw new Error("Invalid email/password");

      const token = signToken({ _id: user._id, username: user.username });
      return {
        accessToken: token,
        userId: user._id,
        username: user.username,
      };
    },
  },
};

module.exports = { typeDefs, resolvers };
