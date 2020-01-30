"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class RoundSchema extends Schema {
  up() {
    this.create("rounds", table => {
      table.increments();

      table
        .integer("match_id")
        .unsigned()
        .references("id")
        .inTable("matches");
      table.integer("round_number").notNullable();
      table.integer("total_turns").notNullable();
      table.integer("shackle").notNullable(); //1 to 13

      table.timestamps();
    });
  }

  down() {
    this.drop("rounds");
  }
}

module.exports = RoundSchema;
