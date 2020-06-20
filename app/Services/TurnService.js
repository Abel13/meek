/**@type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const DatabaseService = use("App/Services/DatabaseService");

const Turn = use("App/Models/Turn");

class TurnService {
  static async countTurns(roundId) {
    return await DatabaseService.countTurns(roundId)
  }

  static async selectLastTurnByRoundId(roundId) {
    return await Turn.query()
      .where("round_id", roundId)
      .last();
  }

  static async selectTurn(turnId) {
    return await Turn.query()
      .where("secure_id", turnId)
      .firstOrFail();
  }

  static async selectTurnWinner(turnsCount, roundId) {
    return await Turn.query()
      .where("turn_number", turnsCount)
      .where("round_id", roundId)
      .first();
  }

  static async createTurn(roundId, turn_number) {
    return await Turn.create({
      round_id: roundId,
      turn_number: turn_number
    });
  }

  static async createUsersTurn(round, turn){
    console.log("LGOOGOGOG", round, turn)
    const turns = await this.countTurns(round.id);
    const matchPlayers = await DatabaseService.selectMatchPlayers(
      round.match_id
    );

    //Get the last turn winner
    const lastTurn = await TurnService.selectTurnWinner(turns.count, round.id);

    let sequence = [];
    if (lastTurn) {
      //Get sequence to play
      const nextPlayers = [];
      const firstPlayers = [];
      let winnerFound = false;
      matchPlayers.forEach(element => {
        if (element.user_id !== lastTurn.winner_id && !winnerFound) {
          nextPlayers.push(element);
        } else {
          if (element.user_id === lastTurn.winner_id) winnerFound = true;
          firstPlayers.push(element);
        }
      });
      sequence = firstPlayers.concat(nextPlayers);
    } else {
      sequence = matchPlayers;
    }

    //Create User Turn
    const userTurns = [];
    for (let index = 0; index < sequence.length; index++) {
      const userTurn = {
        user_id: sequence[index].user_id,
        turn_id: turn.id,
        turn_position: index + 1
      };
      userTurns.push(userTurn);
    }
    await DatabaseService.insert("user_turns", userTurns);
  }

  static async addWinner(turnId, winnerId) {
    await Turn.query()
      .where("id", turnId)
      .update({ winner_id: winnerId });
  }

  static async newTurn() {}
}

module.exports = TurnService;
