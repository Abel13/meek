"use strict";
const Round = use("App/Models/Round");
const UserRoundCard = use("App/Models/UserRoundCard");
const Database = use("Database");
const Cards = use("App/engine/cards");

class RoundCardController {
  async show({ params, request, response, view, auth }) {
    const round = await Round.query()
      .where("secure_id", params.id)
      .firstOrFail();

    const userCards = await Database.from("user_round_cards")
      .select("card")
      .where("user_id", auth.user.id)
      .andWhere("round_id", round.id);

    const turnsCards = await Database.from("user_turns")
      .select("card")
      .innerJoin("turns", "turn_id", "turns.id")
      .where("round_id", round.id)
      .andWhere("user_id", auth.user.id);

    // removing played cards in all turns from this round
    let myCards = [];
    userCards.forEach(myCard => {
      let played = false;
      turnsCards.forEach(playedCard => {
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
