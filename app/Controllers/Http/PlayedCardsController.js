"use strict";
const TurnService = use("App/Services/TurnService");
const DatabaseService = use("App/Services/DatabaseService");

class PlayedCardsController {
  async show({ params, request, response, view, auth }) {
    const turn = await TurnService.selectTurn(params.id);

    const usersTurn = await DatabaseService.selectPlayedCardByTurnId(turn.id);

    const myPlayedCard = usersTurn.filter(
      e => e.user_id === auth.user.secure_id
    )[0];

    const playedCards = usersTurn.filter(
      e => e.user_id !== auth.user.secure_id
    );

    return { myPlayedCard, playedCards };
  }
}

module.exports = PlayedCardsController;
