/**@type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Match = use("App/Models/Match");

class MatchService {
  //select
  static async selectMatch(matchSecureId) {
    return await Match.query()
      .where("secure_id", matchSecureId)
      .firstOrFail();
  }

  static async selectMatchById(matchId) {
    return await Match.query()
      .where("id", matchId)
      .firstOrFail();
  }

  static async selectAvailableMatches(userId) {
    return await Match.query()
      .select("matches.secure_id", "user_id", "username", "name")
      .innerJoin("users", "user_id", "users.id")
      .where("active", true)
      .andWhere("user_id", "!=", userId)
      .andWhere("started", false)
      .fetch();
  }

  //insert
  static async createMatch(data, userId) {
    await Match.query()
      .where("user_id", userId)
      .update({ active: false });

    return await Match.create({
      ...data,
      user_id: userId,
      date: new Date()
    });
  }

  //update
  static async startMatch(matchId) {
    await Match.query()
      .where("secure_id", matchId)
      .update({ started: true });
  }
}

module.exports = MatchService;
