/**@type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Database = use("Database");

class DatabaseService {
  static async countTurns(roundId) {
    return await Database.from("turns")
      .where("round_id", roundId)
      .count("round_id as count")
      .first();
  }

  static async selectPositionList(turnId) {
    return await Database.from("user_turns")
      .where("turn_id", turnId)
      .orderBy("turn_position");
  }

  static async selectNullBets(roundId) {
    return await Database.from("user_rounds")
      .where("round_id", roundId)
      .andWhere("bet", null);
  }

  static async selectBetsPlaced(roundId) {
    return await Database.from("user_rounds")
      .select("bet", "users.secure_id as user_id")
      .innerJoin("users", "user_id", "users.id")
      .where("round_id", roundId);
  }

  static async selectMatchPlayers(matchId) {
    console.log("MATCH", matchId);
    const players = await Database.from("user_matches")
      .where("match_id", matchId)
      .andWhere("playing", true);
    console.log("PLAYERS:", players);

    return players;
  }

  static async selectPlayedCardByTurnId(turnId) {
    return await Database.from("user_turns")
      .select("users.secure_id as user_id", "turn_position", "card")
      .innerJoin("users", "user_id", "users.id")
      .where("turn_id", turnId);
  }

  static async selectPlayerCardsByRoundId(userId, roundId) {
    return await Database.from("user_round_cards")
      .select("card")
      .where("user_id", userId)
      .andWhere("round_id", roundId);
  }

  static async selectPlayedCardsByRoundId(roundId, userId) {
    return await Database.from("user_turns")
      .select("card")
      .innerJoin("turns", "turn_id", "turns.id")
      .where("round_id", roundId)
      .andWhere("user_id", userId);
  }

  static async insert(table, data) {
    const timedData = data.map(element => {
      return { ...element, created_at: new Date(), updated_at: new Date() };
    });
    await Database.from(table).insert(timedData);
  }
}

module.exports = DatabaseService;
