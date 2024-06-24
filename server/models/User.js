const { database } = require("../config/mongodb");
const { hashPassword } = require("../helpers/bcrypt");

class User {
  static async create(newUser) {
    const { password } = newUser;
    const Users = database.collection("Users");
    await Users.insertOne({ ...newUser, password: hashPassword(password) });
  }
  static async getById(id) {
    const Users = database.collection("Users");
    const user = await Users.find({ id }).toArray();
    return user;
  }
  static async getByName(username) {
    const Users = database.collection("Users");
    const user = await Users.find({ username }).toArray();
    return user;
  }
}

module.exports = User;
