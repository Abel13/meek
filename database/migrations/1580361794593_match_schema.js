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
      table
        .string("name")
        .unique()
        .notNullable();
      table.dateTime("date").notNullable();
      table
        .boolean("started")
        .notNullable()
        .defaultTo(false);
      table
        .boolean("active")
        .notNullable()
        .defaultTo(true);

      table.timestamps();
    });
  }

  down() {
    this.drop("matches");
  }
}

module.exports = MatchSchema;
