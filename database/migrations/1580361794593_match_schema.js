"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class MatchSchema extends Schema {
  up() {
    this.create("matches", table => {
      table.increments();
      table.string("secure_id").notNullable();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users");
      table.string("name").notNullable();
      table.dateTime("date").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("matches");
  }
}

module.exports = MatchSchema;
