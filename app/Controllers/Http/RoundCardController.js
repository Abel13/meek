"use strict";
const RoundService = use("App/Services/RoundService");
const DatabaseService = use("App/Services/DatabaseService");

class RoundCardController {
  async show({ params, request, response, view, auth }) {
    const round = await RoundService.selectRound(params.id);

    const userCards = await DatabaseService.selectPlayerCardsByRoundId(
      auth.user.id,
      round.id
    );

    const turnsCards = await DatabaseService.selectPlayedCardsByRoundId(
      round.id,
      auth.user.id
    );

    // removing played cards in all turns from this round
    let myCards = [];
    userCards.forEach((myCard) => {
      let played = false;
      turnsCards.forEach((playedCard) => {
        if (playedCard.card === myCard.card) {
          played = true;
          return;
        }
      });
      if (!played) {
        myCards.push(myCard);
      }
    });

    return myCards;
  }
}

module.exports = RoundCardController;
