"use strict";

const User = use("App/Models/User");

class SessionController {
  async store({ request, auth }) {
    const { email, password } = request.all();

    const user = await User.query()
      .where("email", email)
      .firstOrFail();

    const { secure_id, username } = user;

    const token = await auth.attempt(email, password);

    return { token, user: { secure_id, username, email } };
  }
}

module.exports = SessionController;
