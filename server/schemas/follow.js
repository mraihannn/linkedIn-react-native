// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against

const Follow = require("../models/Follow");

// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Follow {
    _id: String
    followingId: String
    followerId: String
    createdAt: String
    updatedAt: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  
  type Mutation {
    # Argument yang pengen dikirim
    addFollow(followingId: String): Follow
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Mutation: {
    addFollow: async (_, args, contextValue) => {
      const { _id: followerId } = contextValue.auth();
      const { followingId } = args;
      if (!followingId) throw new Error("Following Id is required");
      const newFollow = { followingId, followerId };
      newFollow.createdAt = newFollow.updatedAt = new Date();
      await Follow.create(followingId, followerId);
      return newFollow;
    },
  },
};

module.exports = { typeDefs, resolvers };
