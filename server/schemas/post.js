// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against

const Post = require("../models/Post");

// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Post {
    _id: String
    content: String!
    tags: [String]
    imgUrl: String
    authorId: String!
    comments: [Comment]
    likes: [Like]
    createdAt: String
    updatedAt: String
  }

  type Comment{
    content: String!
    username: String!
    createdAt: String
    updatedAt: String
  }

  type Like{
    username: String!
    createdAt: String
    updatedAt: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  
  # Read Operation
  type Query {
    getPosts: [Post]
    getPostById(id:String): Post
  }

  input newPost {
    content: String
    tags: [String]
    imgUrl: String
  }


  # Write Operation
  type Mutation {
    # Argument yang pengen dikirim
    addPost(post:newPost): Post
    addComment(idPost:String,content:String): Comment
    addLike(username:String, _id:String): Like
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    getPosts: async (_, args, contextValue) => {
      contextValue.auth();
      const posts = await Post.getAll();
      return posts;
    },
    getPostById: async (_, args, contextValue) => {
      contextValue.auth();
      const { id } = args;
      const foundUser = await Post.getById(id);
      return foundUser;
    },
  },
  Mutation: {
    addPost: async (_, args, contextValue) => {
      const { _id } = contextValue.auth();
      const newPost = { ...args.post, authorId: _id };
      await Post.create(newPost);
      return newPost;
    },
    addComment: async (_, args, contextValue) => {
      const { username } = contextValue.auth();
      const { content, idPost } = args;
      const newComment = { username, content };
      newComment.createdAt = newComment.updatedAt = new Date();
      await Post.updatePostById({ ...newComment, idPost });
      return newComment;
    },
  },
};

module.exports = { typeDefs, resolvers };
