"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const RoundService = use("App/Services/RoundService");
const MatchService = use("App/Services/MatchService");
const UserRoundService = use("App/Services/UserRoundService");
const DatabaseService = use("App/Services/DatabaseService");
const UserMatchService = use("App/Services/UserMatchService");
const TurnService = use("App/Services/TurnService");

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
    const round = await RoundService.newRound(data.match_id);
    return {
      secure_id: round.secure_id,
      round_number: round.round_number,
      total_turns: round.total_turns,
      shackle: round.shackle
    };
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
  async show({ params, request, response, view }) {
    const match = await MatchService.selectMatch(params.id);

    const round = await RoundService.selectLastRoundByMatchId(match.id);

    return {
      round: {
        round_number: round.round_number,
        total_turns: round.total_turns,
        shackle: round.shackle,
        secure_id: round.secure_id
      }
    };
  }

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
  async update({ params, request, response, auth }) {
    const { bet } = request.only(["bet"]);

    console.log("ROUND>", params.id)
    const round = await RoundService.selectRound(params.id);
    const bets = await DatabaseService.selectNullBets(round.id);
    const match = await MatchService.selectMatchById(round.match_id);

    await UserRoundService.bet(round.id, auth.user.id, bet);

    //if first round and last bet then start new Round
    if (round.round_number === 1 && bets.length === 1) {
      console.log("ULTIMA APOSTA")
      const turn = await TurnService.selectTurnWinner(1, round.id);
      await UserRoundService.addScore(round.id, turn.winner_id);

      await UserMatchService.calculateLife(round);
      console.log("CALCULOU VIDAS")

      const data = await RoundService.newRound(match.secure_id);
      console.log("NOVO ROUND:", data.round)

      //creates first turn
      const newTurn = await TurnService.createTurn(data.round.id, 1);
      console.log("NOVO TURNO:", newTurn.id)

      await TurnService.createUsersTurn(data.round, newTurn);
    }

    return { round: round.secure_id, user: auth.user.secure_id, bet };
  }

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
