const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb");

class Follow {
  static async create(followingId, followerId) {
    const Follows = database.collection("Follows");
    await Follows.insertOne({
      followingId,
      followerId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

module.exports = Follow;
