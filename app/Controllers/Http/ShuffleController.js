"use strict";

const Cards = use("App/engine/cards");

class ShuffleController {
  async show() {
    return Cards.sort(() => Math.random() - 0.5);
  }
}

module.exports = ShuffleController;
