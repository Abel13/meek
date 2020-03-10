"use strict";
const Turn = use("App/Models/Turn");
const Database = use("Database");
const Cards = use("App/engine/cards");

class PlayedCardsController {
  async show({ params, request, response, view, auth }) {
    const turn = await Turn.query()
      .where("secure_id", params.id)
      .firstOrFail();

    const usersTurn = await Database.from("user_turns")
      .select("users.secure_id as user_id", "turn_position", "card")
      .innerJoin("users", "user_id", "users.id")
      .where("turn_id", turn.id);

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
