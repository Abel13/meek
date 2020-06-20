"use strict";

class Match {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: "required|unique:matches",
    };
  }
}

module.exports = Match;
