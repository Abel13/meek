/**@type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const UserMatch = use("App/Models/UserMatch");
const DatabaseService = use("App/Services/DatabaseService");
const UserRoundService = use("App/Services/UserRoundService");

class UserMatchService {
  static async createUserMatch(matchId, userId) {
    return await UserMatch.create({
      match_id: matchId,
      life_bar: 5,
      playing: true,
      user_id: userId
    });
  }

  static async selectUserMatchById(matchId, userId) {
    return await UserMatch.query()
      .where("user_id", userId)
      .andWhere("match_id", matchId)
      .first();
  }

  static async selectUsersFromMatch(matchId) {
    return await UserMatch.query()
      .select("users.secure_id", "username", "life_bar", "playing")
      .where("match_id", matchId)
      .innerJoin("users", "user_id", "users.id")
      .fetch();
  }

  static async getLife(userId, matchId) {
    try {
      const userMatch = await UserMatch.query()
        .where("user_id", userId)
        .andWhere("match_id", matchId)
        .firstOrFail();
      return userMatch.life_bar;
    } catch (error) {
      console.log("ERRO GET LIFE", error);
      return null;
    }
  }

  static async getUser(roundId, userId) {
    try {
      return await UserRoundService.getUserRound(roundId, userId);
    } catch (error) {
      console.log("ERRO PEGAR USUARIO:", error);
      return null;
    }
  }

  static async saveLife(userId, matchId, life) {
    try {
      await UserMatch.query()
        .where("user_id", userId)
        .andWhere("match_id", matchId)
        .update({ life_bar: life });
    } catch (error) {
      console.log("ERRO AO SALVAR VIDA:", error);
    }
  }

  static async playerLose(userId, matchId) {
    try {
      await UserMatch.query()
        .where("user_id", userId)
        .andWhere("match_id", matchId)
        .update({ playing: false });
    } catch (error) {
      console.log("ERRO PLAYER LOSE", error);
    }
  }

  static async calculateLife(round) {
    const matchPlayers = await DatabaseService.selectMatchPlayers(
      round.match_id
    );

    matchPlayers.forEach(element => {
      this.getUser(round.id, element.user_id).then(userRound => {
        const points = Math.abs(userRound.bet - userRound.round_score);
        this.getLife(element.user_id, round.match_id).then(life => {
          const newLife = life - points;
          this.saveLife(element.user_id, round.match_id, newLife);

          if (newLife === 0) {
            this.playerLose(element.user_id, round.match_id);
          }
        });
      });
    });
  }
}

module.exports = UserMatchService;
