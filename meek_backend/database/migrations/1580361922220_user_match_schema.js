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
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("NO ACTION");
      table
        .int("match_id")
        .unsigned()
        .references("id")
        .inTable("matches")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.notNullable().int("life_bar");
      table.notNullable().boolean("playing");

      table.timestamps();
    });
  }

  down() {
    this.drop("user_matches");
  }
}

module.exports = UserMatchSchema;
