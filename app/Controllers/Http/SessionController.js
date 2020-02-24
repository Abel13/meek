"use strict";

class SessionController {
  async store({ request, auth }) {
    // const { email, password } = request.all();

    // const token = await auth.attempt(email, password);

    return { token: "ewqeqe2qeqwe2q" };
  }
}

module.exports = SessionController;
