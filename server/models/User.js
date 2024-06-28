const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb");
const { hashPassword } = require("../helpers/bcrypt");

class User {
  static async create(newUser) {
    const { password } = newUser;
    const Users = database.collection("Users");
    await Users.insertOne({ ...newUser, password: hashPassword(password) });
  }
  static async getById(_id) {
    const agg = [
      {
        $match: { _id: new ObjectId(String(_id)) },
      },
      {
        $lookup: {
          from: "Follows",
          localField: "_id",
          foreignField: "followerId",
          as: "following",
        },
      },
      {
        $lookup: {
          from: "Users",
          localField: "following.followingId",
          foreignField: "_id",
          as: "followingDetail",
        },
      },
      {
        $lookup: {
          from: "Follows",
          localField: "_id",
          foreignField: "followingId",
          as: "follower",
        },
      },
      {
        $lookup: {
          from: "Users",
          localField: "follower.followerId",
          foreignField: "_id",
          as: "followerDetail",
        },
      },
      {
        $project: {
          password: 0,
          // "followingDetail.password": 0,
        },
      },
      // {
      //   $unwind: {
      //     path: "$DetailAuthor",
      //     preserveNullAndEmptyArrays: true,
      //   },
      // },
    ];
    const Users = database.collection("Users");
    const cursor = Users.aggregate(agg);
    const result = await cursor.toArray();
    return result[0];
    // console.log(result);
    // const user = await Users.findOne({ _id: new ObjectId(String(_id)) });
  }
  static async getByName(username) {
    const agg = [
      {
        $match: { username },
      },
      {
        $lookup: {
          from: "Follows",
          localField: "_id",
          foreignField: "followerId",
          as: "following",
        },
      },
      {
        $lookup: {
          from: "Users",
          localField: "following.followingId",
          foreignField: "_id",
          as: "followingDetail",
        },
      },
      {
        $lookup: {
          from: "Follows",
          localField: "_id",
          foreignField: "followingId",
          as: "follower",
        },
      },
      {
        $lookup: {
          from: "Users",
          localField: "follower.followerId",
          foreignField: "_id",
          as: "followerDetail",
        },
      },
      // {
      //   $unwind: {
      //     path: "$DetailAuthor",
      //     preserveNullAndEmptyArrays: true,
      //   },
      // },
    ];
    const Users = database.collection("Users");
    const cursor = Users.aggregate(agg);
    const result = await cursor.toArray();
    return result[0];
  }
  static async findByEmail(email) {
    const Users = database.collection("Users");
    const user = await Users.findOne({ email });
    return user;
  }
}

module.exports = User;
