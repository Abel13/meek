"use strict";

const Cards = use("App/engine/cards");

class CardController {
  async show() {
    return Cards;
  }
}

module.exports = CardController;
