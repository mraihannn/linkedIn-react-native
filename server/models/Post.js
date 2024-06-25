const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb");

class Post {
  static async create(newPost) {
    const { authorId, content, tags, imgUrl } = newPost;
    const Posts = database.collection("Posts");
    await Posts.insertOne({
      ...newPost,
      authorId: new ObjectId(String(authorId)),
      comments: [],
      likes: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  static async getAll() {
    const Posts = database.collection("Posts");
    const posts = await Posts.find().toArray();
    return posts;
  }
  static async getById(_id) {
    const Posts = database.collection("Posts");
    const post = await Posts.findOne({ _id: new ObjectId(String(_id)) });
    return post;
  }
  static async updatePostComment(payload) {
    const { idPost, username, content } = payload;
    const Posts = database.collection("Posts");
    const post = await Posts.updateOne(
      { _id: new ObjectId(String(idPost)) },
      {
        $push: {
          comments: {
            content,
            username,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      }
    );
    return post;
  }
  static async updatePostLike(idPost, username) {
    const Posts = database.collection("Posts");
    const post = await Posts.updateOne(
      { _id: new ObjectId(String(idPost)) },
      {
        $push: {
          likes: {
            username,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      }
    );
    return post;
  }
}

module.exports = Post;
