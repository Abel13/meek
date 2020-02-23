"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserTurnSchema extends Schema {
  up() {
    this.create("user_turns", table => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users");
      table
        .integer("turn_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("turns");
      table.integer("turn_position").notNullable();
      table.integer("card");

      table.timestamps();
    });
  }

  down() {
    this.drop("user_turns");
  }
}

module.exports = UserTurnSchema;
