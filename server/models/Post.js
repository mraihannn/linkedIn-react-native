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
  static async getById(_id) {
    const Posts = database.collection("Posts");
    const user = await Posts.findOne({ _id: new ObjectId(String(_id)) });
    return user;
  }
  static async getByName(username) {
    const Posts = database.collection("Posts");
    const user = await Posts.findOne({ username });
    return user;
  }
  static async findByEmail(email) {
    const Posts = database.collection("Posts");
    const user = await Posts.findOne({ email });
    return user;
  }
}

module.exports = Post;
