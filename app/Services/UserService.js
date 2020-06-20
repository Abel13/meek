/**@type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use("App/Models/User");

class UserService {
  static async selectUserById(userId) {
    return await User.query().where("id", userId).firstOrFail();
  }

  static async selectUserByEmail(email) {
    return await User.query().where("email", email).firstOrFail();
  }
}

module.exports = UserService;
