"use strict";

const MatchService = use("App/Services/MatchService");
const UserService = use("App/Services/UserService");
const RoundService = use("App/Services/RoundService");
const TurnService = use("App/Services/TurnService");
const DatabaseService = use("App/Services/DatabaseService");
const UserMatchService = use("App/Services/UserMatchService");

class CurrentPlayerController {
  async show({ params, request, response, view }) {
    //DO NOT INSERT OR UPDATE DATA!!
    //get match
    const match = await MatchService.selectMatch(params.id);

    //get last round
    const round = await RoundService.selectLastRoundByMatchId(match.id);

    console.log("ROUND:", round.id);

    //get last turn
    const turn = await TurnService.selectLastTurnByRoundId(round.id);

    console.log("TURN:", turn.id);

    if (!turn) return response
    .status(400)
    .json({ error: "Turn not found!" });

    //get turn positions
    const positions = await DatabaseService.selectPositionList(turn.id);

    console.log("POSITIONS:", positions);
    if (positions.length == 0) return response
      .status(400)
      .json({ error: "Fail to order players!" });

    //get bets
    const bets = await DatabaseService.selectNullBets(round.id);
    const betsPlaced = await DatabaseService.selectBetsPlaced(round.id);

    const isLastPlayer = bets.length === 1;
    const endOfBet = bets.length === 0;
    const stepBet = bets.length > 0;
    const stepPlay = !stepBet;
    const isLastTurn = turn.turn_number === round.round_number;

    const blockedBet = isLastPlayer
      ? round.round_number -
        betsPlaced
          .map(e => (e.bet ? e.bet : 0))
          .reduce((p, c) => {
            return p + c;
          })
      : null;

    let playerToBet = null;
    positions.forEach(element => {
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

    //get player
    const player = await UserService.selectUserById(stepBet ? playerToBet : 1);

    const actualPlayer = { secure_id: player.secure_id, isLastPlayer };

    const usersMatch = await UserMatchService.selectUsersFromMatch(match.id);

    return {
      match_id: match.secure_id,
      usersMatch,
      round: {
        secure_id: round.secure_id,
        total_turns: round.total_turns,
        round_number: round.round_number,
        shackle: round.shackle,
      },
      turn: {
        secure_id: turn.secure_id,
        turn_number: turn.turn_number,
        isLastTurn
      },
      betsPlaced,
      actualPlayer,
      blockedBet,
      stepBet,
      stepPlay,
      endOfBet
    };
  }
}

module.exports = CurrentPlayerController;
