const TurnService = require('./TurnService');

/**@type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Round = use("App/Models/Round");
const MatchService = use("App/Services/MatchService");
const DatabaseService = use("App/Services/DatabaseService");
const CardService = use("App/Services/CardService");

class RoundService {
  static async countRounds(matchId) {
    return await Round.query()
      .where("match_id", matchId)
      .getCount("match_id");
  }

  static async selectRound(roundId) {
    return await Round.query()
      .where("secure_id", roundId)
      .firstOrFail();
  }

  static async selectLastRoundByMatchId(matchId) {
    return await Round.query()
      .where("match_id", matchId)
      .last();
  }

  static async createRound(matchId, round_number, total_turns, shackle) {
    return await Round.create({
      match_id: matchId,
      round_number: round_number,
      total_turns: total_turns,
      shackle
    });
  }

  static async newRound(matchSecureId) {
    console.log("CRIANDO ROUND DA MATCH: ", matchSecureId);
    const match = await MatchService.selectMatch(matchSecureId);
    console.log("BUSCOU MATCH: ", matchSecureId);
    const matchPlayers = await DatabaseService.selectMatchPlayers(match.id);

    //get actual round
    const round_count = await this.countRounds(match.id);
    const round_number = round_count + 1;

    const numberOfPlayers = matchPlayers.length;

    console.log("JOGADORES:", matchPlayers.length, numberOfPlayers);

    //select the number of turns
    const rest = round_count % 10;
    const total_turns =
      numberOfPlayers === 2
        ? 3 //INDIOZINHO
        : rest >= 0 && rest <= 5 //REST: 0, 1, 2, 3, 4, 5
        ? rest + 1 // 1, 2, 3, 4, 5, 6
        : 11 - rest; // 11 - 6: 5, 11 - 7: 4, 11 - 8: 3, 11 - 9: 2,

    console.log("TURNS:", total_turns, numberOfPlayers);
    //select a card to shackle
    const min = Math.ceil(0);
    const max = Math.floor(52);
    const selectedShackle = Math.floor(Math.random() * (max - min) + min);

    console.log("MANILHA:", selectedShackle);

    //shuffle cards
    const cards = [...(await CardService.shuffledCards())];

    console.log("CARTAS CAPTURADAS");

    //remove the shackle from deck
    const selectedCard = await cards.splice(selectedShackle, 1);
    const shackle = selectedCard[0].number === 13 ? 1 : selectedCard[0].number;

    console.log("CARTA MANILHA: ", selectedCard[0].symbol);

    //create round
    const round = await this.createRound(
      match.id,
      round_number,
      total_turns,
      shackle
    );

    console.log("ROUND SECURE ID: ", round.secure_id);


    //adding users to round
    const usersRound = [];
    matchPlayers.forEach(element => {
      for (let index = 0; index < 1; index++) {
        const ur = {
          user_id: element.user_id,
          round_id: round.id
        };
        usersRound.push(ur);
      }
    });
    console.log("[MATCH CONTROLLER] SALVANDO USER_ROUND:", usersRound);
    await DatabaseService.insert("user_rounds", usersRound);

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
    await DatabaseService.insert("user_round_cards", playerCards);

    console.log("SALVOU CARTAS DOS JOGADORES");

    //Do not return this to an endpoint!!!
    return {round, usersRound, playerCards};
  }
}

module.exports = RoundService;
