"use strict";

const Route = use("Route");

//Users
Route.post("users", "UserController.store");

//Sessions
Route.post("sessions", "SessionController.store");

//Cards
Route.get("card", "CardController.show");

//Shuffle
Route.get("shuffle", "ShuffleController.show");
