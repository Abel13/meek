"use strict";

const CardService = use("App/Services/CardService");

class CardController {
  async show() {
    return CardService.allCards();
  }
}

module.exports = CardController;
