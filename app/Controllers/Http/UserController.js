"use strict";

const User = use("App/Models/User");

class UserController {
  async store({ request }) {
    const data = request.only(["username", "email", "password"]);

    const user = await User.create(data);

    return { user: { secure_id: user.secure_id } };
  }
}

module.exports = UserController;
