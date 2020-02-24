"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserRoundSchema extends Schema {
  up() {
    this.create("user_rounds", table => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users");
      table
        .integer("round_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("rounds");
      table.integer("bet").notNullable();
      table.integer("round_score").unsigned();

      table.timestamps();
    });
  }

  down() {
    this.drop("user_rounds");
  }
}

module.exports = UserRoundSchema;
