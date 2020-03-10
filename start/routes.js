"use strict";

const Route = use("Route");

//Users
Route.post("users", "UserController.store").validator("User");

//Sessions
Route.post("sessions", "SessionController.store");

//Cards

Route.group(() => {
  Route.get("card", "CardController.show");
  //Shuffle
  Route.get("shuffle", "ShuffleController.show");

  //Match
  Route.resource("matches", "MatchController").apiOnly();
  Route.post("usermatch", "MatchController.storeUserMatch");
  Route.get("usersmatch/:match_id", "MatchController.showUserMatch");

  //Round
  Route.resource("rounds", "RoundController").apiOnly();
  Route.resource("roundcards", "RoundCardController").apiOnly();
  Route.post("bet", "RoundController.storeUserRound");

  //Turn
  Route.resource("turns", "TurnController").apiOnly();
  Route.resource("usercard", "PlayedCardsController").apiOnly();
}).middleware(["auth"]);
