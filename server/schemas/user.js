// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
    price: Int
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  
  # Read Operation
  type Query {
    books: [Book]
    bookByTitle(title:String): Book
  }

  # Write Operation
  type Mutation {
    # Argument yang pengen dikirim
    addBook(title:String, author:String, price:Int): Book
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
    books: () => books,
    bookByTitle: (_, args) => {
      const { title } = args;
      const foundedBook = books.find((el) => el.title == title);
      return foundedBook;
    },
  },
  Mutation: {
    addBook: (_, args) => {
      const newBook = { ...args };
      books.push(newBook);

      return newBook;
    },
  },
};

module.exports = { typeDefs, resolvers };
