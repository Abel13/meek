"use strict";

const Route = use("Route");

//Users
Route.post("users", "UserController.store").validator("User");

//Sessions
Route.post("sessions", "SessionController.store");

//Cards

Route.group(() => {
  Route.get("/", ({ request, response, auth }) => {
    // request
    return response.json({ ok: "OK", user: auth.user.secure_id });
  });

  Route.get("card", "CardController.show");
  //Shuffle
  Route.get("shuffle", "ShuffleController.show");

  //Match
  Route.resource("matches", "MatchController")
    .validator(new Map([[["matches.store"], ["Match"]]]))
    .apiOnly();
  Route.post("usermatch", "MatchController.storeUserMatch");
  Route.get("usersmatch/:match_id", "MatchController.showUserMatch");

  //Round
  Route.resource("rounds", "RoundController").apiOnly();
  Route.resource("roundcards", "RoundCardController").apiOnly();

  //Turn
  Route.resource("turns", "TurnController").apiOnly();
  Route.resource("usercard", "PlayedCardsController").apiOnly();
  Route.resource("current", "CurrentPlayerController").apiOnly();
}).middleware(["auth"]);
