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
    const Users = database.collection("Users");
    const user = await Users.findOne({ _id: new ObjectId(String(_id)) });
    return user;
  }
  static async getByName(username) {
    const Users = database.collection("Users");
    const user = await Users.findOne({ username });
    return user;
  }
  static async findByEmail(email) {
    const Users = database.collection("Users");
    const user = await Users.findOne({ email });
    return user;
  }
}

module.exports = User;
