"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TurnSchema extends Schema {
  up() {
    this.create("turns", table => {
      table.increments();

      table
        .int("round_id")
        .unsigned()
        .references("id")
        .inTable("rounds")
        .onUpdate("CASCADE")
        .onDelete("NO ACTION");
      table
        .int("winner_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("NO ACTION");
      table.int("turn_number");

      table.timestamps();
    });
  }

  down() {
    this.drop("turns");
  }
}

module.exports = TurnSchema;
