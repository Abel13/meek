/**@type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const UserRound = use("App/Models/UserRound");

class UserRoundService {
  static async bet(roundId, userId, bet) {
    console.log("BET:", roundId, userId, bet)
    return await UserRound.query()
      .where("round_id", roundId)
      .andWhere("user_id", userId)
      .update({ bet });
  }

  static async addScore(roundId, winnerId) {
    const player = await UserRound.query()
      .where("round_id", roundId)
      .andWhere("user_id", winnerId)
      .firstOrFail();

    const round_score = player.round_score + 1;

    return await UserRound.query()
      .where("round_id", roundId)
      .andWhere("user_id", winnerId)
      .update({ round_score });
  }

  static async getUserRound(roundId, playerId) {
    return await UserRound.query()
      .where("round_id", roundId)
      .andWhere("user_id", playerId)
      .firstOrFail();
  }
}

module.exports = UserRoundService;
