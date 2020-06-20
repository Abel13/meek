"use strict";

const MatchService = use("App/Services/MatchService");
const UserService = use("App/Services/UserService");
const UserMatchService = use("App/Services/UserMatchService");
const RoundService = use("App/Services/RoundService");
const TurnService = use("App/Services/TurnService");
const DatabaseService = use("App/Services/DatabaseService");
const CardService = use("App/Services/CardService");

class MatchController {
  async index({ request, response, view, auth }) {
    return await MatchService.selectAvailableMatches(auth.user.id);
  }

  async create({ request, response, view }) {}

  async store({ request, response, auth }) {
    const data = request.only(["name"]);

    const match = await MatchService.createMatch(data, auth.user.id);
    const user = await UserService.selectUserById(auth.user.id);

    await UserMatchService.createUserMatch(match.id, user.id);

    return { match: { secure_id: match.secure_id, user_id: user.secure_id } };
  }

  async storeUserMatch({ request, response, auth }) {
    const data = request.only(["match_id"]);

    const match = await MatchService.selectMatch(data.match_id);

    const owner = await UserService.selectUserById(match.user_id);
    const user = await UserService.selectUserById(auth.user.id);

    const userMatch = await UserMatchService.selectUserMatchById(
      match.id,
      user.id
    );

    if (!userMatch) {
      await UserMatchService.createUserMatch(match.id, user.id);
    }

    return { match: { secure_id: match.secure_id, user_id: owner.secure_id } };
  }

  async show({ params, request, response, view }) {}

  async showUserMatch({ params, request, response, view }) {
    const match = await MatchService.selectMatch(params.match_id);

    const usersMatch = await UserMatchService.selectUsersFromMatch(match.id);

    return { players: usersMatch, started: match.started };
  }

  async edit({ params, request, response, view }) {}

  async update({ params, request, response }) {
    const secure_id = params.id;

    //start match
    await MatchService.startMatch(secure_id);

    //get match
    const match = await MatchService.selectMatch(secure_id);

    // get match players
    const matchPlayers = await DatabaseService.selectMatchPlayers(match.id);

    //select a card to shackle by index
    const min = Math.ceil(0);
    const max = Math.floor(51);
    const selectedShackle = Math.floor(Math.random() * (max - min + 1)) + min;

    //shuffle shuffledCards and get all shuffledCards(as mirror)
    let shuffledCards = [...(await CardService.shuffledCards())];
    const allCards = await CardService.allCards();

    //remove the shackle from deck
    const selectedCard = await shuffledCards.splice(selectedShackle, 1)[0];
    const shackle = selectedCard.id;

    //select the card number that will be the shackle
    const shackleNumber = selectedCard.number === 13 ? 1 : selectedCard.number;

    //update shuffledCards to define the four shacles 14, 15, 16, 17 will be the numbers
    shuffledCards = shuffledCards.map(element => {
      if (element.number === shackleNumber) {
        return { ...element, isShackle: true, number: 13 + element.cardSuit };
      }
      return element;
    });

    //create first round
    const data = await RoundService.newRound(match.secure_id);

    console.log("[MATCH CONTROLLER] ROUND SECURE ID:", data.round.secure_id);

    //creates first turn
    const turn = await TurnService.createTurn(data.round.id, 1);

    //Create User Turn and get the turn winner
    const userTurns = [];
    let bigestCard = {
      number: 0
    };
    let winnerId = null;
    for (let index = 0; index < matchPlayers.length; index++) {
      const { card } = data.playerCards.filter(element => {
        if (element.user_id === matchPlayers[index].user_id) {
          return element;
        }
      })[0];

      const playedCard = allCards.find(c => c.id === card);
      if (playedCard.number > bigestCard.number) {
        bigestCard = playedCard;
        winnerId = matchPlayers[index].user_id;
      }

      const userTurn = {
        user_id: matchPlayers[index].user_id,
        turn_id: turn.id,
        turn_position: index + 1,
        card
      };
      userTurns.push(userTurn);
    }
    await DatabaseService.insert("user_turns", userTurns);

    //update the winner
    await TurnService.addWinner(turn.id, winnerId);

    return {
      match: { secure_id, started: true }
      // shackleNumber,
      // playerCards,
      // bigestCard,
      // winnerId,
    };
  }

  async destroy({ params, request, response }) {}
}

module.exports = MatchController;
