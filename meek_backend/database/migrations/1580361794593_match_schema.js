"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class MatchSchema extends Schema {
  up() {
    this.create("matches", table => {
      table.increments();

      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("NO ACTION");
      table.notNullable().string("name");
      table.notNullable().dateTime("date");
      table.timestamps();
    });
  }

  down() {
    this.drop("matches");
  }
}

module.exports = MatchSchema;
