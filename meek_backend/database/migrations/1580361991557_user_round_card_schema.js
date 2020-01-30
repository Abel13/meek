"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserRoundCardSchema extends Schema {
  up() {
    this.create("user_round_cards", table => {
      table.increments();

      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("NO ACTION");
      table
        .int("round_id")
        .unsigned()
        .references("id")
        .inTable("rounds")
        .onUpdate("CASCADE")
        .onDelete("NO ACTION");
      table.int("card");

      table.timestamps();
    });
  }

  down() {
    this.drop("user_round_cards");
  }
}

module.exports = UserRoundCardSchema;
