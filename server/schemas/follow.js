// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
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
    addFollow(_id: String, followingId:String, followerId:String): Follow
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  // Query: {
  //   books: () => books,
  //   bookByTitle: (_, args) => {
  //     const { title } = args;
  //     const foundedBook = books.find((el) => el.title == title);
  //     return foundedBook;
  //   },
  // },
  // Mutation: {
  //   addBook: (_, args) => {
  //     const newBook = { ...args };
  //     books.push(newBook);
  //     return newBook;
  //   },
  // },
};

module.exports = { typeDefs, resolvers };
