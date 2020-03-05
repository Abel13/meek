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

    const userCards = await await Database.from("user_round_cards")
      .where("user_id", auth.user.id)
      .andWhere("round_id", round.id);

    const cards = [...new Cards().allCards];

    const myCards = userCards.map(element => {
      return cards[element.card];
    });

    return myCards;
  }
}

module.exports = RoundCardController;
