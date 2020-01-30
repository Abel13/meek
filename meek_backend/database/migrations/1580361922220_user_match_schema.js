"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserMatchSchema extends Schema {
  up() {
    this.create("user_matches", table => {
      table.increments();

      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users");
      table
        .integer("match_id")
        .unsigned()
        .references("id")
        .inTable("matches");
      table.integer("life_bar").notNullable();
      table.boolean("playing").notNullable();

      table.timestamps();
    });
  }

  down() {
    this.drop("user_matches");
  }
}

module.exports = UserMatchSchema;
