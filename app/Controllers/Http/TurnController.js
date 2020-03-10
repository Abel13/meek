"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Turn = use("App/Models/Turn");
const Round = use("App/Models/Round");
const Database = use("Database");

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
  async index({ request, response, view }) {
    const actualPlayer = 1;

    return { actualPlayer };
  }

  /**
   * Render a form to be used for creating a new turn.
   * GET turns/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  async store({ request, response }) {
    const data = request.only(["round_id"]);

    //Get Round
    const round = await Round.query()
      .where("secure_id", data.round_id)
      .firstOrFail();

    //Get how many turns has been played
    const turns = await Turn.query()
      .where("round_id", round.id)
      .count("round_id as count")
      .first();
    const turn_number = turns.count + 1;

    if (turn_number > round.total_turns) {
      return response
        .status(400)
        .json({ error: "Invalid turn, go to next round!" });
    }

    //creates the new turn
    const turn = await Turn.create({
      round_id: round.id,
      turn_number
    });

    const matchPlayers = await Database.from("user_matches")
      .where("match_id", round.match_id)
      .andWhere("playing", true);

    //Get the last turn winner
    const lastTurn = await Turn.query()
      .where("turn_number", turns.count)
      .where("round_id", round.id)
      .first();

    let sequence = [];
    if (lastTurn) {
      //Get sequence to play
      const nextPlayers = [];
      const firstPlayers = [];
      let winnerFound = false;
      matchPlayers.forEach(element => {
        if (element.user_id !== lastTurn.winner_id && !winnerFound) {
          nextPlayers.push(element);
        } else {
          if (element.user_id === lastTurn.winner_id) winnerFound = true;
          firstPlayers.push(element);
        }
      });
      sequence = firstPlayers.concat(nextPlayers);
    } else {
      sequence = matchPlayers;
    }

    //Create User Turn
    const userTurns = [];
    for (let index = 0; index < sequence.length; index++) {
      const userTurn = {
        user_id: sequence[index].user_id,
        turn_id: turn.id,
        turn_position: index + 1
      };
      userTurns.push(userTurn);
    }
    await Database.from("user_turns").insert(userTurns);

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
    const round = await Round.query()
      .where("secure_id", params.id)
      .firstOrFail();

    const turn = await Turn.query()
      .where("round_id", round.id)
      .last();

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
  async edit({ params, request, response, view }) {}

  /**
   * Update turn details.
   * PUT or PATCH turns/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a turn with id.
   * DELETE turns/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = TurnController;
