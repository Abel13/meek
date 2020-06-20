"use strict";

const UserService = use("App/Services/UserService");

class SessionController {
  async store({ request, auth }) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);

    const user = await UserService.selectUserByEmail(email);
    const { secure_id, username } = user;

    return { token, user: { secure_id, username, email } };
  }
}

module.exports = SessionController;
