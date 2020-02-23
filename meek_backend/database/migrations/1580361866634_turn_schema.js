"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TurnSchema extends Schema {
  up() {
    this.create("turns", table => {
      table.increments();
      table.string("secure_id").notNullable();
      table
        .integer("round_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("rounds");
      table
        .integer("winner_id")
        .unsigned()
        .references("id")
        .inTable("users");
      table.integer("turn_number");

      table.timestamps();
    });
  }

  down() {
    this.drop("turns");
  }
}

module.exports = TurnSchema;
