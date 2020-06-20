"use strict";

const CardService = use("App/Services/CardService");

class ShuffleController {
  async show() {
    return CardService.shuffledCards();
  }
}

module.exports = ShuffleController;
