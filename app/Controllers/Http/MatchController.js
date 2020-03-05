"use strict";

const Match = use("App/Models/Match");
const UserMatch = use("App/Models/UserMatch");
const User = use("App/Models/User");
const Round = use("App/Models/Round");
const Cards = use("App/engine/cards");

class MatchController {
  async index({ request, response, view }) {
    const matches = await Match.query()
      .select("matches.secure_id", "user_id", "username", "name")
      .innerJoin("users", "user_id", "users.id")
      .where("active", true)
      .fetch();

    return matches;
  }

  async create({ request, response, view }) {}

  async store({ request, response, auth }) {
    const data = request.only(["name"]);

    const match = await Match.create({
      ...data,
      user_id: auth.user.id,
      date: new Date()
    });
    const user = await User.query()
      .where("id", auth.user.id)
      .firstOrFail();

    await UserMatch.create({
      match_id: match.id,
      life_bar: 5,
      playing: true,
      user_id: user.id
    });

    return { match: { secure_id: match.secure_id, user_id: user.secure_id } };
  }

  async storeUserMatch({ request, response, auth }) {
    const data = request.only(["match_id"]);

    const match = await Match.query()
      .where("secure_id", data.match_id)
      .firstOrFail();
    const owner = await User.query()
      .where("id", match.user_id)
      .firstOrFail();
    const user = await User.query()
      .where("id", auth.user.id)
      .first();

    const userMatch = await UserMatch.query()
      .where("user_id", user.id)
      .andWhere("match_id", match.id)
      .first();

    if (!userMatch) {
      const match_id = match.id;

      await UserMatch.create({
        match_id,
        life_bar: 5,
        playing: true,
        user_id: user.id
      });
    }

    return { match: { secure_id: match.secure_id, user_id: owner.secure_id } };
  }

  async show({ params, request, response, view }) {}

  async showUserMatch({ params, request, response, view }) {
    const match = await Match.query()
      .where("secure_id", params.match_id)
      .firstOrFail();

    const usersMatch = await User.query()
      .select("users.secure_id", "username", "life_bar", "playing")
      .where("match_id", match.id)
      .innerJoin("user_matches", "user_id", "users.id")
      .fetch();

    return usersMatch;
  }

  async edit({ params, request, response, view }) {}

  async update({ params, request, response }) {
    const secure_id = params.id;

    const match = await Match.query()
      .where("secure_id", secure_id)
      .update({ started: true });

    //get match players
    const matchPlayers = await Database.from("user_matches")
      .where("match_id", match.id)
      .andWhere("playing", true);

    //select a card to shackle
    const min = Math.ceil(0);
    const max = Math.floor(52);
    const selectedShackle = Math.floor(Math.random() * (max - min) + min);

    //shuffle cards
    const cards = [...new Cards().shuffledCards];

    //remove the shackle from deck
    const selectedCard = await cards.splice(selectedShackle, 1);
    const shackle = selectedCard[0].number === 13 ? 1 : selectedCard[0].number;

    //create round
    await Round.create({
      match_id: match.id,
      round_number: 1,
      total_turns: 1,
      shackle
    });

    //dealing the cards
    const playerCards = [];
    matchPlayers.forEach(element => {
      for (let index = 0; index < total_turns; index++) {
        const card = cards.pop();
        const ruc = {
          user_id: element.user_id,
          round_id: round.id,
          card: card.id
        };
        playerCards.push(ruc);
      }
    });
    await Database.from("user_round_cards").insert(playerCards);

    return { match: { secure_id, started: true } };
  }

  async destroy({ params, request, response }) {}
}

module.exports = MatchController;
