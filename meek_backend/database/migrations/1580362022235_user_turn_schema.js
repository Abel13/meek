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
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("NO ACTION");
      table
        .integer("turn_id")
        .unsigned()
        .references("id")
        .inTable("turns")
        .onUpdate("CASCADE")
        .onDelete("NO ACTION");
      table.notNullable().int("turn_position");
      table.notNullable().int("card"); //1 to 52

      table.timestamps();
    });
  }

  down() {
    this.drop("user_turns");
  }
}

module.exports = UserTurnSchema;
