/**@type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Match = use("App/Models/Match");

class MatchService {
  static async selectMatch(matchId) {
    return await Match.query().where("secure_id", matchId).firstOrFail();
  }
}

module.exports = MatchService;
