// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against

const redis = require("../config/redis");
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
    DetailAuthor: DetailAuthor
    createdAt: String
    updatedAt: String
  }

  type DetailAuthor {
    _id: String
    username: String
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
    addLike(idPost:String): Like
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    getPosts: async (_, args, contextValue) => {
      contextValue.auth();
      const postCache = await redis.get("posts:all");
      if (postCache) {
        return JSON.parse(postCache);
      }
      const posts = await Post.getAll();
      await redis.set("posts:all", JSON.stringify(posts));
      return posts;
    },
    getPostById: async (_, args, contextValue) => {
      contextValue.auth();
      const { id } = args;
      const foundUser = await Post.getById(id);
      console.log(foundUser);
      return foundUser;
    },
  },
  Mutation: {
    addPost: async (_, args, contextValue) => {
      const { _id } = contextValue.auth();
      const { content } = args.post;
      if (!content) throw new Error("Content is required");
      const newPost = { ...args.post, authorId: _id };
      await Post.create(newPost);
      await redis.del("posts:all"); // invalidate cache
      return newPost;
    },
    addComment: async (_, args, contextValue) => {
      const { username } = contextValue.auth();
      const { content, idPost } = args;
      if (!content) throw new Error("Content is required");
      if (!idPost) throw new Error("Id Post is required");
      const newComment = { username, content };
      newComment.createdAt = newComment.updatedAt = new Date();
      await Post.updatePostComment({ ...newComment, idPost });
      return newComment;
    },
    addLike: async (_, args, contextValue) => {
      const { username } = contextValue.auth();
      const { idPost } = args;
      if (!idPost) throw new Error("Id Post is required");
      const newLikes = { username };
      newLikes.createdAt = newLikes.updatedAt = new Date();
      await Post.updatePostLike(idPost, username);
      return newLikes;
    },
  },
};

module.exports = { typeDefs, resolvers };
