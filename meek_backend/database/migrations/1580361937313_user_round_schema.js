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
        .integer("round_id")
        .unsigned()
        .references("id")
        .inTable("rounds");
      table.integer("bet").notNullable();
      table.integer("round_score").notNullable();

      table.timestamps();
    });
  }

  down() {
    this.drop("user_rounds");
  }
}

module.exports = UserRoundSchema;
