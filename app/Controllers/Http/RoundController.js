"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Round = use("App/Models/Round");
const Match = use("App/Models/Match");
const Cards = use("App/engine/cards");
const UsersMatch = use("App/models/UserMatch");
const UserRound = use("App/models/UserRound");
const Database = use("Database");

/**
 * Resourceful controller for interacting with rounds
 */
class RoundController {
  /**
   * Show a list of all rounds.
   * GET rounds
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {}

  /**
   * Render a form to be used for creating a new round.
   * GET rounds/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  async store({ request, response }) {
    const data = request.only(["match_id"]);
    const match = await Match.query()
      .where("secure_id", data.match_id)
      .firstOrFail();

    //get actual round
    const round_count = await Round.query()
      .where("match_id", match.id)
      .count("match_id as round");
    const round_number = round_count[0].round + 1;

    //get match players
    const matchPlayers = await Database.from("user_matches")
      .where("match_id", match.id)
      .andWhere("playing", true);

    const numberOfPlayers = matchPlayers.length;

    //select the number of turns
    const rest = round_number % 10;
    const total_turns =
      numberOfPlayers === 2 ? 3 : rest >= 0 && rest <= 5 ? rest + 1 : 11 - rest;

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
    const round = await Round.create({
      match_id: match.id,
      round_number,
      total_turns,
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

    return round;
  }

  async storeUserRound({ request, response, auth }) {
    const data = request.only(["round_id", "bet"]);

    const round = await Round.query()
      .where("secure_id", data.round_id)
      .firstOrFail();

    const userRound = await UserRound.create({
      user_id: auth.user.id,
      round_id: round.id,
      bet: data.bet
    });

    return userRound;
  }

  /**
   * Display a single round.
   * GET rounds/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing round.
   * GET rounds/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update round details.
   * PUT or PATCH rounds/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a round with id.
   * DELETE rounds/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = RoundController;
