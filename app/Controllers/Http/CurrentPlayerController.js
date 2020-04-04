"use strict";

const Match = use("App/Models/Match");
const MatchService = use("App/Services/MatchService");

const UserMatch = use("App/Models/UserMatch");
const UserRound = use("App/Models/UserRound");
const UserTurn = use("App/Models/UserTurn");
const User = use("App/Models/User");
const Round = use("App/Models/Round");
const Turn = use("App/Models/Turn");
const Cards = use("App/engine/cards");
const Database = use("Database");

class CurrentPlayerController {
  async show({ params, request, response, view }) {
    //DO NOT INSERT OR UPDATE DATA!!
    const blockedBet = null;
    //get match
    const match = await MatchService.selectMatch(params.id);

    //get last round
    const round = await Round.query().where("match_id", match.id).last();

    //get last turn
    const turn = await Turn.query().where("round_id", round.id).last();

    //get turn positions
    const positions = await Database.from("user_turns")
      .where("turn_id", turn.id)
      .orderBy("turn_position");
    //get bets
    const bets = await Database.from("user_rounds")
      .where("round_id", round.id)
      .andWhere("bet", null);

    const betsPlaced = await Database.from("user_rounds").where(
      "round_id",
      round.id
    );

    const isLastPlayer = bets.length === 1;
    const endOfBet = bets.length === 0;
    const stepBet = bets.length > 0;
    const stepPlay = !stepBet;
    const isLastTurn = turn.turn_number === round.round_number;

    let playerToBet = null;
    positions.forEach((element) => {
      if (playerToBet === null) {
        for (var i = 0; i < bets.length; i++) {
          if (bets[i].user_id === element.user_id) {
            playerToBet = element.user_id;
            break;
          }
        }
      } else {
        return;
      }
    });

    //get players
    const player = await User.query()
      .where("id", stepBet ? playerToBet : 1)
      .firstOrFail();

    const actualPlayer = { secure_id: player.secure_id, isLastPlayer };

    return {
      match_id: match.secure_id,
      round: {
        round_id: round.secure_id,
        number: round.round_number,
        total_turns: round.total_turns,
      },
      turn: {
        turn_id: turn.secure_id,
        turn_number: turn.turn_number,
        isLastTurn,
      },
      betsPlaced,
      actualPlayer,
      blockedBet,
      stepBet,
      stepPlay,
      endOfBet,
    };
  }
}

module.exports = CurrentPlayerController;
