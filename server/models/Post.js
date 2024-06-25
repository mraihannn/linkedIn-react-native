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
    const agg = [
      // {
      //   $match: {
      //     _id: new ObjectId("667a74fa6221a8d8b7bbb3f9"),
      //   },
      // },
      {
        $lookup: {
          from: "Users",
          localField: "authorId",
          foreignField: "_id",
          as: "DetailAuthor",
        },
      },
      {
        $unwind: {
          path: "$DetailAuthor",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          "DetailAuthor.password": 0,
        },
      },
    ];

    const Posts = database.collection("Posts");
    const cursor = Posts.aggregate(agg);
    const result = await cursor.sort({ createdAt: -1 }).toArray();
    return result;
    // const posts = await Posts.find().sort({ createdAt: -1 }).toArray();
  }
  static async getById(_id) {
    const agg = [
      {
        $match: {
          _id: new ObjectId(String(_id)),
        },
      },
      {
        $lookup: {
          from: "Users",
          localField: "authorId",
          foreignField: "_id",
          as: "DetailAuthor",
        },
      },
      {
        $unwind: {
          path: "$DetailAuthor",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          "DetailAuthor.password": 0,
          "DetailAuthor.email": 0,
        },
      },
    ];

    const Posts = database.collection("Posts");
    const cursor = Posts.aggregate(agg);
    const result = await cursor.toArray();
    return result[0];
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
