"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class RoundSchema extends Schema {
  up() {
    this.create("rounds", table => {
      table.increments();
      table.string("secure_id").notNullable();
      table
        .integer("match_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("matches");
      table.integer("round_number").notNullable();
      table.integer("total_turns").notNullable();
      table.integer("shackle"); // 1 a 53

      table.timestamps();
    });
  }

  down() {
    this.drop("rounds");
  }
}

module.exports = RoundSchema;
