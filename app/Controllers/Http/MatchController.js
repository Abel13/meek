"use strict";

const Match = use("App/Models/Match");
const MatchService = use("App/Services/MatchService");

const UserMatch = use("App/Models/UserMatch");
const User = use("App/Models/User");
const Round = use("App/Models/Round");
const Turn = use("App/Models/Turn");
const Cards = use("App/engine/cards");
const Database = use("Database");

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
      date: new Date(),
    });
    const user = await User.query().where("id", auth.user.id).firstOrFail();

    await UserMatch.create({
      match_id: match.id,
      life_bar: 5,
      playing: true,
      user_id: user.id,
    });

    return { match: { secure_id: match.secure_id, user_id: user.secure_id } };
  }

  async storeUserMatch({ request, response, auth }) {
    const data = request.only(["match_id"]);

    const match = await MatchService.selectMatch(data.match_id);

    const owner = await User.query().where("id", match.user_id).firstOrFail();
    const user = await User.query().where("id", auth.user.id).first();

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
        user_id: user.id,
      });
    }

    return { match: { secure_id: match.secure_id, user_id: owner.secure_id } };
  }

  async show({ params, request, response, view }) {}

  async showUserMatch({ params, request, response, view }) {
    const match = await MatchService.selectMatch(params.match_id);

    const usersMatch = await User.query()
      .select("users.secure_id", "username", "life_bar", "playing")
      .where("match_id", match.id)
      .innerJoin("user_matches", "user_id", "users.id")
      .fetch();

    return { players: usersMatch, started: match.started };
  }

  async edit({ params, request, response, view }) {}

  async update({ params, request, response }) {
    const secure_id = params.id;

    //start match
    await Match.query().where("secure_id", secure_id).update({ started: true });

    //get match
    const match = await MatchService.selectMatch(secure_id);

    // get match players
    const matchPlayers = await Database.from("user_matches")
      .where("match_id", match.id)
      .andWhere("playing", true);

    //select a card to shackle
    const min = Math.ceil(0);
    const max = Math.floor(52);
    const selectedShackle = Math.floor(Math.random() * (max - min) + min);

    //shuffle cards and get all cards(as mirror)
    let cards = [...new Cards().shuffledCards];
    const allCards = new Cards().allCards;

    //remove the shackle from deck
    const selectedCard = await cards.splice(selectedShackle, 1)[0];
    const shackle = selectedCard.id;

    //select the card number that will be the shackle
    const shackleNumber = selectedCard.number === 13 ? 1 : selectedCard.number;

    //update cards to define the four shacles 14, 15, 16, 17 will be the numbers
    cards = cards.map((element) => {
      if (element.number === shackleNumber) {
        return { ...element, isShackle: true, number: 13 + element.cardSuit };
      }
      return element;
    });

    //create round
    const round = await Round.create({
      match_id: match.id,
      round_number: 1,
      total_turns: 1,
      shackle,
    });

    //adding users to round
    const usersRound = [];
    matchPlayers.forEach((element) => {
      for (let index = 0; index < 1; index++) {
        const ur = { user_id: element.user_id, round_id: round.id };
        usersRound.push(ur);
      }
    });
    await Database.from("user_rounds").insert(usersRound);

    //dealing the cards
    const playerCards = [];
    matchPlayers.forEach((element) => {
      for (let index = 0; index < 1; index++) {
        const card = cards.pop();
        const ruc = {
          user_id: element.user_id,
          round_id: round.id,
          card: card.id,
        };
        playerCards.push(ruc);
      }
    });
    await Database.from("user_round_cards").insert(playerCards);

    //creates the new turn
    const turn = await Turn.create({
      round_id: round.id,
      turn_number: 1,
    });

    //Create User Turn and get the turn winner
    const userTurns = [];
    let bigestCard = {
      number: 0,
    };
    let winner_id = null;
    for (let index = 0; index < matchPlayers.length; index++) {
      const { card } = playerCards.filter((element) => {
        if (element.user_id === matchPlayers[index].user_id) {
          return element;
        }
      })[0];

      const playedCard = allCards.find((c) => c.id === card);
      if (playedCard.number > bigestCard.number) {
        bigestCard = playedCard;
        winner_id = matchPlayers[index].user_id;
      }
      const userTurn = {
        user_id: matchPlayers[index].user_id,
        turn_id: turn.id,
        turn_position: index + 1,
        card: card.id,
      };
      userTurns.push(userTurn);
    }
    await Database.from("user_turns").insert(userTurns);

    //update the winner
    await Turn.query().where("id", turn.id).update({ winner_id });

    return {
      match: { secure_id, started: true },
      // shackleNumber,
      // playerCards,
      // bigestCard,
      // winner_id
    };
  }

  async destroy({ params, request, response }) {}
}

module.exports = MatchController;
