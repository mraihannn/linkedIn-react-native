const { database } = require("../config/mongodb");

class User {
  static async create(newUser) {
    const Users = database.collection("Users");
    await Users.insertOne(newUser);
  }
  static async getById(id) {
    const Users = database.collection("Users");
    const user = await Users.find({ id }).toArray();
    return user;
  }
}

module.exports = User;
