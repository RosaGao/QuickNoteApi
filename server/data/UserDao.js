const User = require("../model/User");
const ApiError = require("../model/ApiError");
const { hashPassword } = require("../util/hasing");
const { hash } = require("bcrypt");

class UserDao {

  // create user with unique name, valid password and role
  async create({ username, password, role }) {
    if (!username) {
      throw new ApiError(400, "Every user must have a username!");
    }
    if (!password) {
      throw new ApiError(400, "Every user must have a password!");
    }
    if (role !== "ADMIN" && role !== "CLIENT") {
      throw new ApiError(400, "Every user must have a valid role!");
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({ username, password: hashedPassword, role });
    return user;
  }

  // update or reset password / change role
  async update(id, { password, role }) {
    const user = await User.findByIdAndUpdate(
      id, 
      { password, role },
      { new: true, runValidators: true }
    );

    if (user === null) {
      throw new ApiError(404, "No user with the given ID!");
    }

    return user;
  }

  async delete(id) {
    const user = await User.findByIdAndDelete(id);
    if (user === null) {
      throw new ApiError(404, "No user with the given ID!");
    }
    return user;
  }

  // return [] if no user associated with given id
  async read(id) {
    const user = await User.findById(id);
    return user ? user : [];
  }

  // return null if no user is found
  async readOne(username) {
    const user = await User.findOne({ username }); // find returns an array, findOne returns an object
    return user;
  }

  // return [] if no user or no user matches the given role
  async readAll(role = "") {
    if (role !== "") {
      const users = await User.find({ role });
      return users;
    }
    const users = await User.find({});
    return users;
  }

}

module.exports = UserDao;