"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const TurnService = use("App/Services/TurnService");
const RoundService = use("App/Services/RoundService");
const DatabaseService = use("App/Services/DatabaseService");
const UserRoundService = use("App/Services/UserRoundService");

/**
 * Resourceful controller for interacting with turns
 */
class TurnController {
  /**
   * Show a list of all turns.
   * GET turns
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) { }

  /**
   * Render a form to be used for creating a new turn.
   * GET turns/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) { }

  async store({ request, response }) {
    const data = request.only(["round_id"]);

    //Get Round
    const round = await RoundService.selectRound(data.round_id);
    console.log("ROUND", round.id)

    //Get how many turns has been played
    const turns = await TurnService.countTurns(round.id);
    const turn_number = turns.count + 1;

    if (turn_number > round.total_turns) {
      return response
        .status(400)
        .json({ error: "Invalid turn, go to next round!" });
    }

    //creates the new turn
    const turn = await TurnService.createTurn(round.id, turn_number);

    await TurnService.createUsersTurn(round, turn);

    return turn;
  }

  /**
   * Display a single turn.
   * GET turns/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const round = await RoundService.selectRound(params.id);

    const turn = await TurnService.selectLastTurnByRoundId(round.id);

    return {
      turn: {
        turn_number: turn.turn_number,
        secure_id: turn.secure_id
      }
    };
  }

  /**
   * Render a form to update an existing turn.
   * GET turns/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) { }

  /**
   * Update turn details.
   * PUT or PATCH turns/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) { }

  /**
   * Delete a turn with id.
   * DELETE turns/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) { }
}

module.exports = TurnController;
