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
      table.notNullable().int("bet");
      table.notNullable().int("round_score");

      table.timestamps();
    });
  }

  down() {
    this.drop("user_rounds");
  }
}

module.exports = UserRoundSchema;
