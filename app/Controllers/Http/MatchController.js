"use strict";

const Match = use("App/Models/Match");
const UserMatch = use("App/Models/UserMatch");
const User = use("App/Models/User");

class MatchController {
  async index({ request, response, view }) {
    const matches = await Match.query()
      .select("matches.secure_id", "username", "name")
      .innerJoin("users", "user_id", "users.id")
      .where("active", true)
      .fetch();

    return matches;
  }

  async create({ request, response, view }) {}

  async store({ request, response, auth }) {
    const data = request.only(["name"]);

    const match = await Match.create({
      ...data,
      user_id: auth.user.id,
      date: new Date()
    });
    await UserMatch.create({
      match_id: match.id,
      life_bar: 5,
      playing: true,
      user_id: auth.user.id
    });

    return { match: { secure_id: match.secure_id } };
  }

  async storeUserMatch({ request, response, auth }) {
    const data = request.only(["match_id"]);

    const match = await Match.query()
      .where("secure_id", data.match_id)
      .firstOrFail();

    const match_id = match.id;

    const userMatch = await UserMatch.create({
      match_id,
      life_bar: 5,
      playing: true,
      user_id: auth.user.id
    });

    return { match: { secure_id: match.secure_id } };
  }

  async show({ params, request, response, view }) {}

  async showUserMatch({ params, request, response, view }) {
    const match = await Match.query()
      .where("secure_id", params.match_id)
      .firstOrFail();

    const usersMatch = await User.query()
      .select("users.secure_id", "username", "life_bar", "playing")
      .where("match_id", match.id)
      .innerJoin("user_matches", "user_id", "users.id")
      .fetch();

    return usersMatch;
  }

  async edit({ params, request, response, view }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = MatchController;
