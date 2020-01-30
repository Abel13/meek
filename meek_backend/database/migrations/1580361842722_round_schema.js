"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class RoundSchema extends Schema {
  up() {
    this.create("rounds", table => {
      table.increments();

      table
        .int("match_id")
        .unsigned()
        .references("id")
        .inTable("matches")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.notNullable().int("round_number");
      table.notNullable().int("total_turns");
      table.notNullable().int("shackle"); //1 to 13

      table.timestamps();
    });
  }

  down() {
    this.drop("rounds");
  }
}

module.exports = RoundSchema;
